import { Botkit, BotkitConversation } from "botkit";


export const welcomeDialog = (controller: Botkit) => {
  const dialog = new BotkitConversation("dialog.welcome", controller)
  dialog.say("Hello!")
  dialog.say("This is a second message")
  dialog.ask("What do you need?", async (response, convo, bot) => {
    console.log(response)
  }, "name")
  return dialog
}
