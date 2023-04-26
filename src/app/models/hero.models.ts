export interface HeroResponse {
  response: string
  "results-for": string
  results: IHero[]
}

export interface IHero {
  id: string
  name: string
  powerstats: IPowerstats
  biography: IBiography
  appearance: IAppearance
  work: IWork
  connections: IConnections
  image: Image
}

export interface IPowerstats {
  intelligence: string
  strength: string
  speed: string
  durability: string
  power: string
  combat: string
}

export interface IBiography {
  "full-name": string
  "alter-egos": string
  aliases: string[]
  "place-of-birth": string
  "first-appearance": string
  publisher: string
  alignment: string
}

export interface IAppearance {
  gender: string
  race: string
  height: string[]
  weight: string[]
  "eye-color": string
  "hair-color": string
}

export interface IWork {
  occupation: string
  base: string
}

export interface IConnections {
  "group-affiliation": string
  relatives: string
}

export interface Image {
  url: string
}
