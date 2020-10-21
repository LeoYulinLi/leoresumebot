import { stripIndent } from "common-tags";
import { images, skillTrivia } from "../data";
import { Entity, Project, Resume } from "./types";
import { sampleOne } from "../utils";

export function skillResponder(knowledgebase: Resume) {

  const skillProjectMapping = knowledgebase.skills.map(it => it.name).map(skill =>
    [skill, knowledgebase.projects.filter(project =>
      project.keywords.some(keyword => keyword === skill)
    )] as [string, Project[]]
  ).reduce((acc, [key, value]) => {
    return { ...acc, [key]: value }
  }, {} as Record<string, Project[]>)

  let oneProject: Project | undefined

  return function skillHandler(entities: Entity[]): [string[], Project | undefined] {

    oneProject = undefined

    const skillsWithProjects = entities
      .filter(skill => skillProjectMapping[skill.option] && skillProjectMapping[skill.option].length > 0)

    const skillsWithoutProjects = entities
      .filter(skill => !skillProjectMapping[skill.option] || skillProjectMapping[skill.option].length === 0)

    function skillWithProjectStrings(entity: Entity, projects: Project[]): string[] {
      const phrase = sampleOne([
        `In terms of ${ entity.sourceText }, these are some of the projects that I have done:`,
        `These are some ${ entity.sourceText } projects I have done recently:`,
        `For ${ entity.sourceText }, these are some projects I worked on:`,
        `These are some ${ entity.sourceText } projects I worked on recently:`
      ])
      const projectPhrases = projects.map(project => {
        if (project.url) {
          if (images[project.name]) {
            return stripIndent`
              ## [${ project.name }](${ project.url })
              ![${project.name} Screenshot](${images[project.name]})
              
              ${ project.description }
            `
          } else {
            return stripIndent`
              ## [${ project.name }](${ project.url })
              ${ project.description }
            `
          }
        } else {
          return stripIndent`
            ## ${ project.name }
            ${ project.description }
          `
        }
      })
      if (projects.length === 1) {
        oneProject = projects[0]
      }
      return [phrase, ...projectPhrases]
    }

    function skillWithoutProjectStrings(entity: Entity): string[] {

      // @ts-ignore
      const trivia = skillTrivia[entity.option]

      if (!trivia) {
        return [`I don't have much experience with ${ entity.sourceText }.`]
      }

      const phrase = sampleOne([
        `I don't have work experience or full project experience with ${ entity.sourceText }, but`,
        `In terms of ${ entity.sourceText }, I don't really have any full scale project experience, but`,
        `I don't really have any large scale ${ entity.sourceText } project, but`,
        `I haven't really done any large scale ${ entity.sourceText } project, but`
      ])

      return [`${ phrase } ${ trivia }`]

    }

    let result: string[] = []

    skillsWithProjects.forEach(it => {
      result = [...result, ...skillWithProjectStrings(it, skillProjectMapping[it.option])]
    })

    skillsWithoutProjects.forEach(it => {
      result = [...result, ...skillWithoutProjectStrings(it)]
    })

    return [result, oneProject]

  }
}
