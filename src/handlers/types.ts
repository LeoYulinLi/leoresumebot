
export type Entity = {
  entity: string,
  option: string,
  sourceText: string
}

export type NlpResponse = {
  answer: string,
  intent: string,
  entities: Entity[]
}

export type Project = {
  name: string,
  description: string,
  highlights: string[],
  url?: string,
  keywords: string[]
}

export type Resume = {
  skills: {
    name: string
  }[]
  work: {
    name: string,
    description: string
  }[],
  projects: Project[]
}
