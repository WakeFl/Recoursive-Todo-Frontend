export interface ITodo {
  todo: string
  id: string
  parent?: string
  subtodos?: ITodo[]
}

export interface IUser {
  id?: number
  email: string
  token: string
}

export interface IUserData {
  email: string
  password: string
}

export interface IResponseUser {
  email: string
  id: number
  createdAt: string
  updatedAt: string
}

export interface IResponseUserData {
  token: string
  updatedUser: IResponseUser
}
