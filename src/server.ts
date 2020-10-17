import { Botkit, BotkitMessage, BotWorker } from "botkit";
import { WebAdapter } from "botbuilder-adapter-web";
import { welcomeDialog } from "./dialogs";

const controller = new Botkit({
  adapter: new WebAdapter({
    options: {
      port: 5000
    }
  })
});

controller.middleware.ingest.use((bot: BotWorker, message: BotkitMessage, next: Function) => {
  message.intent = "hi"
  next()
})

controller.addDialog(welcomeDialog(controller))

controller.on("channel_join", async (bot, message) => {
  await bot.beginDialog("dialog.welcome")
  console.log("here")
})

controller.hears(async (message) => message.intent === "hi", "message", async (bot, message) => {
  await bot.beginDialog("dialog.welcome")
  console.log(message.intent)
  console.log(message.text)
})



