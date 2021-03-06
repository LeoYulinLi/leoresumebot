# Resume Bot
Just a bot to chat with you on my experiences :P

## Demo
http://resumebot.r32.me/

## Features
- Inputs are processed by NLP (Natural Language Processing) engine
- The bot knows the context
- You can ask the bot follow-up questions
- Ask about details of my projects that are not listed on the resume (e.g. challenges)

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

## Screenshots

<img style="max-width: 100%;" height="598" src="https://leoresumebot.sfo2.digitaloceanspaces.com/resumebot01.png">
<img style="max-width: 100%;" height="602" src="https://leoresumebot.sfo2.digitaloceanspaces.com/resumebot02.png">
<img style="max-width: 100%;" height="599" src="https://leoresumebot.sfo2.digitaloceanspaces.com/resumebot03.png">


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
The training data are provided by the `corpus-en.json`. After tranning, the NLP engine can return an `intent` for an
input.

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

#### Why NLP?
For example, you can say something like "tell me about your expeirience", and the engine will correctly produce the
`experience.general` intent, even though the phrase is not the training set (and also the experience has a typo in it)

This is what the engine sees when you input the phrase "tell me about your expeirience":
```javascript
{
  locale: 'en',
  utterance: 'tell me about your expeirience',
  languageGuessed: false,
  localeIso2: 'en',
  language: 'English',
  nluAnswer: {
    classifications: [ [Object], [Object], [Object], [Object], [Object], [Object] ],
    entities: undefined,
    explanation: undefined
  },
  classifications: [
    { intent: 'experience.general', score: 0.5762581172090295 },
    { intent: 'email', score: 0.18168304652235082 },
    { intent: 'phone', score: 0.12306806515021253 },
    { intent: 'followup.more', score: 0.0515882293872288 },
    { intent: 'followup.projects', score: 0.03460826624771439 },
    { intent: 'experience.work', score: 0.032794275483463815 }
  ],
  intent: 'experience.general',
  score: 0.5762581172090295,
  domain: 'default',
  sourceEntities: [],
  entities: [],
  answers: [],
  answer: undefined,
  actions: [],
  sentiment: {
    score: 0.75,
    numWords: 5,
    numHits: 2,
    average: 0.15,
    type: 'senticon',
    locale: 'en',
    vote: 'positive'
  }
}
```
As you can see, even though the engine wasn't so sure about the phrase (`score: 0.5762581172090295`), it was still able
to produce some result. 

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

This is what the engine sess when you input the phrase "do you know kotlin":
```javascript
{
  locale: 'en',
  utterance: 'do you know kotlin',
  languageGuessed: false,
  localeIso2: 'en',
  language: 'English',
  explanation: [ { token: '', stem: '##exact', weight: 1 } ],
  classifications: [
    { intent: 'experience.skills', score: 1 },
    { intent: 'experience.general', score: 0 },
    { intent: 'intent.recruit', score: 0 },
    // omitted a long list of intents that have a score of 0
  ],
  intent: 'experience.skills',
  score: 1,
  domain: 'default',
  optionalUtterance: 'do you know @skill',
  sourceEntities: [],
  entities: [
    {
      start: 12,
      end: 17,
      len: 6,
      levenshtein: 0,
      accuracy: 1,
      entity: 'skill',
      type: 'enum',
      option: 'kotlin',
      sourceText: 'kotlin',
      utteranceText: 'kotlin'
    }
  ],
  answers: [],
  answer: undefined,
  actions: [],
  sentiment: {
    score: 0.25,
    numWords: 4,
    numHits: 1,
    average: 0.0625,
    type: 'senticon',
    locale: 'en',
    vote: 'positive'
  }
}
```
The engines is able to extract the entity, and provides it in the `entities` list.

There are also some hard coded context depends on the situation. Let's say in this conversation:
> user: do you know kotlin
> 
> bot: In terms of kotlin, these are some of the projects that I have done:
>
> bot: ##[Simbrain] [Image] Simbrain is an open source neural network simulator and visualizer

Since there is only one project that matches the description, if a user would like to know more about the project,
they should be able to directly ask the bot to tell them more (e.g. "tell me more about _this_ project).
Since there is only one project, Simbrain, the context `this` can only refer to the Simbrain project,
In this case the bot has a feature where when there is only one project in the resulting list, it automatically adds
that project to the context. So the user can have a conversation like this:

> user: do you know kotlin
> 
> bot: In terms of kotlin, these are some of the projects that I have done:
>
> bot: ##[Simbrain] [Image] Simbrain is an open source neural network simulator and visualizer
>
> user: what is that about
>
> bot: Simbrain is a neural network simulator and visualizer created by Jeffery Yoshimi, my artificial neural network professor.
>
> ...
 

### Handlers (Output)
This is where everything comes together. After the NLP engine produces the neccessary intent and context,
handlers can create an answer based on this information and persist any necessary context for future conversations.

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

#### Exampel function: (project function)
`src/handlers/experiences.ts`
```typescript
    function withEntity(entity: Entity): string[] {
      const project = resume.projects.filter(it => it.name === entity.option)[0]
      
      function what(): string[] {
        return [
          sampleOne([
            "Here are something I worked on during this project:",
            "This is a summary on what I did during this project:"
          ]),
          ...project.highlights
        ]
      }

    }
```
by providing an project entity, the `what` function can pull out the highlight from the resume and append it after some
phrases.
