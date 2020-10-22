import { Botkit, BotkitMessage, BotWorker } from "botkit";
import { WebAdapter } from "botbuilder-adapter-web";
import { welcomeDialog } from "./dialogs";
// @ts-ignore
import { ConversationContext } from "node-nlp";
import { initNlp } from "./train";
import fs from "fs";
import { Entity, NlpResponse, Resume } from "./handlers/types";
import { skillResponder } from "./handlers/skills";
import { randomResponse } from "./handlers/fixed_responses";
import { experienceResponder } from "./handlers/experiences";
import { sampleOne } from "./utils";
import { projectLongDescriptions } from "./data";

import express from "express"
import path from "path";

const app = express()

app.use(express.static('frontend/build'));
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
})

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${ port }`));

const controller = new Botkit({
  adapter: new WebAdapter({
    options: {
      port: 5000
    }
  })
});

const mapResponseToAnswer = function () {

  const knowledgebase = JSON.parse(fs.readFileSync("./resume.json").toString()) as Resume

  const skillHandler = skillResponder(knowledgebase)

  const experienceHandler = experienceResponder(knowledgebase)

  const projectHandler = (entities: Entity[]) => {
    const project = entities.filter(it => it.entity === "project")[0]
    if (project) {
      return projectLongDescriptions[project.option]
    }
  }

  let context: Entity[] = []
  let nextContext: Entity[] = []

  return function (response: NlpResponse): string[] {

    if (response.answer) return [response.answer]

    console.log(response)

    context = nextContext
    if (response.intent.includes("followup")) {
      nextContext = [...context, ...response.entities]
    } else {
      nextContext = [...response.entities]
    }

    if (response.intent.includes("followup")) {
      return experienceHandler(response.intent, response.entities, context)
    }

    switch (response.intent) {
      case "general.greeting":  return [
        sampleOne(["Hello!", "Hi!"]),
        "I am Leo's virtual avatar",
        "What would you like to know about me?"
      ]
      case "experience.skills": {
        const [answers, project] = skillHandler(response.entities)
        if (project) {
          nextContext = [{ entity: "project", option: project.name, sourceText: project.name }, ...nextContext]
        }
        return answers
      }
      case "experience.general": return randomResponse(response.intent)
      case "experience.projects": return projectHandler(response.entities) || ["Sorry, I am not quite sure which project were you talking about..."]
      case "experience.current_work":
      case "experience.work": {
        nextContext = [{ entity: "project", option: "Simbrain", sourceText: "Simbrain" }, ...nextContext]
        return ["I have been working as a application developer on Simbrain for the past 3 years, would you like to know more about the project?"]
      }
      case "wildcard.project": {
        const projectName = sampleOne(["Simbrain", "MBET", "tmrw", "NullPointerException"])
        const entity = { entity: "project", option: projectName, sourceText: projectName }
        nextContext = [entity, ...nextContext]
        return ["I have done many projects, and this is one of them", ...projectLongDescriptions[projectName]]
      }
    }

    console.log(`${response.intent} [${response.entities.map(it => it.option).join(", ")}] {${context.map(it => it.option).join(", ")}}`)

    return [`${response.intent} [${response.entities.map(it => it.option).join(", ")}] {${context.map(it => it.option).join(", ")}}`]

  }

}()

initNlp().then(nlp => {
  // @ts-ignore
  const context = new ConversationContext();
  controller.middleware.ingest.use(async (bot: BotWorker, message: BotkitMessage, next: Function) => {
    message.nlpResponse = await nlp.process("en", message.text || "", context)
    next()
  })
})

controller.addDialog(welcomeDialog(controller))

controller.on("channel_join", async (bot, message) => {
  await bot.beginDialog("dialog.welcome")
  console.log("here")
})

controller.hears(async (message) => true, "message", async (bot, message) => {
  const responses = mapResponseToAnswer(message.nlpResponse)
  console.log("hear")
  for (const response of responses) {
    await sleep(25 + (Math.random() * 0.5 + 0.5) * 10 * response.length)
    await bot.reply(message, response)
    console.log(response)
  }
})

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

