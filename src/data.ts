export const responses = {
  "experience.general": [
    [
      [
        "I am a software developer with about three years of experience in developing Java/Kotlin desktop application.",
        "I am a software developer with about three years of experience in developing desktop applications using Java/Kotlin."
      ],
    ],
    [
      [
        "I recently graduated from UC Merced with a degree in Computer Science and Engineering",
        "I am a recent grad from UC Merced with a degree in Computer Science and Engineering"
      ],
      [
        ", and later joined the App Academy bootcamp",
        ". A few months ago I joined App Academy"
      ],
      [
        " to perfect my skills such as React and Ruby on Rails.",
        " to learn more about industry skills such as React and Ruby on Rails."
      ]
    ],
    [
      [
        "So in terms of experience I am pretty comfortable with ",
        "Now I am pretty familiar with "
      ],
      [
        "React, Rails, Node, TypeScript, Kotlin, Java, etc."
      ]
    ],
    [
      [
        "Are there any skills that you are particularly looking for?",
        "What are some skills that you would like me to talk more about?"
      ]
    ]
  ]
}

export const skillTrivia = {
  "python": [
    "I have worked on a few college assignment, such as path finding visualizer, PM2.5 handlers regression/prediction, etc."
  ],
  "spring": [
    "I have experience using other framework such as Ruby on Rails, and I have multiple years of experience with Java and Kotlin."
  ],
  "android": [
    "I do have experience helping my friend in developing a experimental IME for a research using my Java and Googling skills"
  ],
  "web-frameworks": [
    "I have experience using other framework such as Ruby on Rails"
  ],
  "php": [
    "I have worked with it about 5 years ago when I was hosting my website using software such as WordPress"
  ],
  "angularjs": [
    "I do have some experience with Angular, and I am familiar with React"
  ],
  "vue": [
    "I am familiar with React"
  ],
  "c++": ["c++"],
  "c": [
    "I have done a few college projects in C. Some of them are quite interesting including making a web server with syscalls, or playing with SIMD, etc."
  ],
  "architecture": [
    "I have done some project on similar topics during college. "
  ],
  "ux": [
    "I do have a general sense on what bad ux's are thus avoiding them"
  ],
  "linux": [
    "I have been using Linux for my own servers for over 7 years, and my desktop is also running on Linux"
  ],
  "graphql": [
    "I used it on simple projects and have basic understand on how it works"
  ],
}

export const projectLongDescriptions: { [key: string]: string[] } = {
  "Simbrain": [
    "Simbrain is a neural network simulator and visualizer created by Jeffery Yoshimi, my artificial neural network professor.",
    "The main goal for this application is to be as intuitive as possible for people understand and design their own neural networks",
    "Neural networks are like your CPUs. They are powerful, but without some I/O, it is pretty hard to use",
    "So Simbrain provides extra functionalities such as a 2D game like world for you to couple your neural networks to agents in the world",
    "or you could input data from a csv file, which could contain wide range of data, such as flatten images of hand written digits",
    "and then have the network output the recognized number",
    "I like this project a lot, that's why I have been working on it for 3 years now"
  ],
  "MBET": [
    "MBET stands for MintBean Expense Tracker, and it is an expense tracker :P",
    "Yea, so main features includes: categorization, separating expense by account, tally, and more"
  ],
  "tmrw": [
    "tmrw is a kanban board project Bryan, Ryan, and I built during the MintBean Hackathon.",
    "During the design phase, the main goal was to make it as easy to use as possible, and create it as if something that we would personally like to use",
    "So with these ideas in mind, we decided to implemented features such as drag and drop, saving and loading (since this was a front end only project, there is no server to store your data), and an amazing onboarding tour",
    "The tour was kinda a last minute decision, but it helped a lot in terms of user experience"
  ],
  "Simbrain Web": [
    "Simbrain Web is more of a project to full fill my personal curiosity on if it is possible to create the Simbrain application on the web",
    "One big reason is Simbrain is now a 700MiB+ application, it takes some time for people to download, and you would also have to down load JRE to run the program",
    "So one potential solution is to move to the web, at least partially, for people to get a sense of it before considering downloading the full application"
  ],
  "Restaurant Roulette": [
    "Restaurant Roulette is a project done during App Academy.",
    "It was a group MERN project, and Alex, Ryan, Wendy worked with me on this",
    "The main feature is to allow a user, or multiple users, to generate a restaurant of some categories",
    "solving the problem of \"where should I eat today\"",
  ],
  "NullPointerException": [
    "Since I decided to include versioning, querying a thread was more involved",
    "but thanks to SQL view and Rails scenic, I was able to condense the querying process a lot"
  ],
  "e-DVIR": [
    "e-DVIR was my capstone project at UC Merced",
    "The main purpose was to create a more efficient way of filing Driver Vehicle Inspection Report as well as archiving them"
  ],
  "MouseTrap": [
    "Mouse Traps is a progressive level arcade game were mice and other vermin walk around a maze with the objective of reproducing to the point of world conquest",
    "Your job as the player is too kill as many pests, with as few traps, as possible in order to prevent the fall of mankind :P"
  ]
}

export const challenges = {
  "Simbrain": [
    "This is a project that I have been working on for about 3 years now...",
    "In terms of challenge...",
    "Well there were a lot...",
    "This project was started 15 years ago, so when you found a bug, it could be just something error introduced recently, or it could be something deep inside some legacy code.",
    "It definitely trained me to be proficient in not only understanding different Java design patterns but also something that I wouldn't really think of like navigating in the IDE.",
    "In terms of a more recent example, I have been working on a framework to support a evolution algorithm.",
    "Before I came up with the current design, I had 4 other attempts in designing this framework.",
    "It was definitely a learning experience, and now I have a pretty strong sense on designing fluent builder patterns or DSLs"
  ],
  "MBET": [
    "One challenge I had during this project was to pick up a new framework in a short time",
    "This was a project that need to be finished during the weekend, and since I saw Material UI had some components that fits this project quite well, I decided to give it a try",
    "It did not go well",
    "I spend way too much time just to read the documentation, and try to fix problem caused by me not being familiar with the framework",
    "I was still able to finish the core functionality with a pretty good UX by prioritizing tasks that I need to complete",
    "but definitely, next time, don't try framework the first time on production...",
    "libraries are fine, I can swap them out if it doesn't work the way you want",
    "but I am stuck with a framework through out the whole project, and if that doesn't work it is a big pain..."
  ],
  "tmrw": [
    "This was a project that went relatively smoothly.",
    "One out of the box thing I did was to use new libraries such as react dnd to handle the drag and drop in the kanban",
    "It took me sometime to understand the library and its limitation",
    "but it was after all pretty nice experience"
  ],
  "Simbrain Web": [
    "This was a project that went relatively smoothly.",
    "I got more practice with typescript in this project especially on the utility types, such as constructor param types, partial, etc."
  ],
  "Restaurant Roulette": [
    "This is the first project that I first tried using socket io",
    "It took me sometime just to get the room feature working (where all users would join a socket with the same room id)",
    "Another problem was with the yelp api rate limiting, and also the policy where they ask us to not cache the data for more than 24 hours",
    "that made listing history restaurant feature pretty clunky",
    "for now that page will take some time to load, since I was throttle the backend",
    "but probably if I have time I would just paginate the list so it never hit more than 5 entries at a time"
  ],
  "NullPointerException": [
    "Since I decided to include versioning, querying a thread was more involved",
    "but thanks to SQL view and Rails scenic, I was able to condense the querying process a lot"
  ],
  "e-DVIR": [
    "This was probably my first full stack project",
    "It was also my first time using Angular, TypeScript/JavaScript, AWS Lambda, DynamoDB, etc...",
    "a lot of first time happening in this project, so it took me and my teammate a lot of time to learn these techs",
    "we were able to help each other out, and finished the project."
  ],
  "MouseTrap": [
    "This was my first group software project",
    "and I have to say, my team management skill was not good",
    "I ended up spending too much time working on a framework I promised my teammate",
    "and didn't really communicate when I worked on it",
    "I was able to change the way I worked and start communicating with my teammate",
    "the whole project move forward much faster",
    "Lesson learned: communication is the key in a group project"
  ]
}

export const images: { [key: string]: string } = {
  "Simbrain": "https://simbrain.net/Screenshots/Simbrain3/RealNeuralNetwork.png",
  "MBET": "https://camo.githubusercontent.com/c5ad55a336b2b1c3fc2178e41d5025c2e2404ebc/68747470733a2f2f6d6265702e73666f322e63646e2e6469676974616c6f6365616e7370616365732e636f6d2f4d4245542d332e706e67",
  "tmrw": "https://camo.githubusercontent.com/4f433c5e91f4b449b6d8a5c7d5292c039c912053/68747470733a2f2f73382e67696679752e636f6d2f696d616765732f53637265656e2d53686f742d323032302d30382d33302d61742d362e30352e33332d504d2e706e67",
  "Simbrain Web": "https://github.com/LeoYulinLi/simbrain_web/raw/master/.github/images/demo.png",
  "NullPointerException": "https://github.com/LeoYulinLi/NullPointerException/raw/master/github/time_tooltips.png"
}
