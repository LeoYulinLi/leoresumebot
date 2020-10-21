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
      case "experience.skills": {
        const [answers, project] = skillHandler(response.entities)
        if (project) {
          nextContext = [...nextContext, { entity: "project", option: project.name, sourceText: project.name }]
        }
        return answers
      }
      case "experience.general": return randomResponse(response.intent)
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
    await sleep((Math.random() + 0.5) * 5 * response.length)
    await bot.reply(message, response)
    console.log(response)
  }
})

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

