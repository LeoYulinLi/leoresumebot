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

const controller = new Botkit({
  adapter: new WebAdapter()
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
        "What would you like to know about me?",
        "You can ask me stuff like what programming languages I know",
        "Or ask me any follow up questions like what was the project about, what did I do, what was some challenges on specific projects"
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
      case "experience.programming_languages": {
        return [
          sampleOne([
            "I use a variety of languages",
            "I use multiple languages",
            "Depends on the use case, I pick different languages"
          ]),
          sampleOne([
            "I use TypeScript/JavaScript, Kotlin/Java, Ruby, SQL, along with frameworks like React and Rails",
            "I mostly use TypeScript/JavaScript, Kotlin/Java, Ruby, SQL, etc, with frameworks like React and Rails"
          ]),
          sampleOne([
            "Are you looking for someone that is familiar with a specific language or framework?",
            "Are there any particular language that you would like to know more?"
          ]),
          sampleOne([
            "I can show you some of my projects done in that language or framework",
            "Let me know and I can show you some of my project done using that technology"
          ])
        ]
      }
      case "experience.ambiguous_languages": return [
        sampleOne([
          "You mean spoken language or programming language?",
          "Are you talking about programming language or spoken language?"
        ])
      ]
      case "experience.human_languages": return [
        sampleOne([
          "I speak Chinese, Cantonese, and some Japanese",
        ]),
        sampleOne([
          "Oh and English :P",
          "and maybe English? I am not sure what I am speaking :P"
        ])
      ]
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

