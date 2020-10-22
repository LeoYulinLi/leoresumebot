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

## Screenshots

Digital Ocean is down... Will add some later...
