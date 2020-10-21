import { Entity, Resume } from "./types";
import { sampleOne } from "../utils";
import { challenges } from "../data";

export function experienceResponder(resume: Resume) {

  return function (intent: string, entities: Entity[], context: Entity[]): string[] {

    const exceptionString = "Sorry, I don't understand..."

    const projects = entities.filter(it => it.entity === "project")
    const contextProjects = context.filter(it => it.entity === "project")

    const noContext = entities.length === 0 && context.length === 0

    if (noContext) {
      return [sampleOne([
        "Sorry, are you talking about a specific project?",
        "Sorry, I don't quite understand. Are you talking about a specific project?"
      ])]
    }

    const noApplicableContext = projects.length === 0 && contextProjects.length === 0 && !noContext

    if (noApplicableContext) {
      return [sampleOne([
        "Sorry, which project were you talking about?",
        "Sorry, I don't quite understand. Which project were you talking about?"
      ])]
    }

    function withEntity(entity: Entity): string[] {
      const project = resume.projects.filter(it => it.name === entity.option)[0]
      if (!project) return [exceptionString]

      function what(): string[] {
        return [
          sampleOne([
            "Here are something I worked on during this project:",
            "This is a summary on what I did during this project:"
          ]),
          ...project.highlights
        ]
      }

      function challenge(): string[] {
        return challenges[project.name as keyof typeof challenges]
      }

      switch (intent) {
        case "followup.experience.what":
        case "followup.more": return what()
        case "followup.experience.challenge": return challenge()
        default: return [exceptionString]
      }

    }

    if (entities.length > 0) {
      return withEntity(projects[0])
    } else {
      return withEntity(contextProjects[0])
    }

  }

}
