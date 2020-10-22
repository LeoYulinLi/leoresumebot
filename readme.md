# Resume Bot
Just a bot to chat with you on my experiences :P

## Demo
http://resumebot.r32.me/

## What can I say to it
The bot process your input using NLP, so give it a try, it might understand you even if the wording is difference from
what I would expect!

The bot also knows the context of the conversation. So, when you are talking about, let's say a project, you can ask
follow-up questions like "what is it about", "what did you do", "what were some challenges", etc.

Here are some sample if you are not sure what you want to say to the bot:
- Tell me about yourself
- Do you know JavaScript?
- What language do you know
- What is Simbrain
    - What did you do in that project
    - What were some challenges
    
And more!

## Behind the scene
### Where are the data
They are scattered out in `corpus-en.json`, `resume.json`, `src/data.ts`, `src/handlers`, `src/server.ts`
- `corpus-en.json` contains mainly the NLP related data, but it also has some of the simple answers
- `resume.json` contains data that are usually on a resume
- `src/data.ts` contains extra data that are not on the resume
- `src/handlers` contains the logic as of how responses are generated
- `src/server.ts` has some default phrases and the mapping from question to answer

### Input Processing
Inputs are processed by nlp, trained using the `src/train.ts` with nlp.js.
The training data are provided by the `corpus-en.json`.

```json
    {
      "intent": "experience.general",
      "utterances": [
        "What experience do you have",
        "What are some of your experiences",
        "Tell me about yourself",
        "What's your background",
        "What are some projects you worked on"
      ]
    }
```

This is an example on the training data related to asking general questions.
`intent` is a unique identifier for this group of `utterances`, and `utterances` are some example which people usually
say. The NLP library will take these utterances (amount other intent groups), to find a pattern that best describe this
intent. The resulting pattern can match any sentences that are close enough in meaning to the training set, thus
provides a more natural feel to the conversation.

### Context

Beside having a flexible input processor, the bot also needs to understand the context of the input.
This is where the NER (Named Entity Recognition) comes in. 

```json
    "skill": {
      "options": {
        "js": ["javascript", "js"],
        "ts": ["typescript", "type script", "ts"],
        "react": ["react", "reactjs", "react.js", "react js"],
        ...
      }
    }
```
In the `corpus-en.json`, I enumerated some common skills, projects, languages, etc. in the `entities`.
That provides the NLP processor to pick up these keyword in the user input, and later, I used those keywords to set the
context in the conversation handler.

### Handlers
The base handler is inside the `server.ts`.

```typescript
    switch (response.intent) {
      case "general.greeting":  return [
        sampleOne(["Hello!", "Hi!"]),
        "I am Leo's virtual avatar",
        "What would you like to know about me?",
        "You can ask me stuff like what programming languages I know",
        "Or ask me any follow up questions like what was the project about, what did I do, what was some challenges on specific projects"
      ]
      ...
    }
```

Based on the intent provided by the NLP processor, I picked some specific response to that intent.
There are 2 main source of answers: one is from the `corpus-en.json` if I don't need to answer to be flexible, or I
wrote my own response function to return the answer. Using custom function allows me to return multiple lines of answers
as well as randomizing the response to give it more variety.

## Screenshots

Digital Ocean is down... Will add some later...
