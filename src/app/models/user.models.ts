export interface IUser {
  name: string,
  email: string,
  password?: string,
}


export interface IUserDB extends IUser {
  money: number,
  heroes: [],
  battleStory: []
}