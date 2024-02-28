export interface ITodo {
  todo: string
  id: string
  parentId?: string
  children?: ITodo[]
  likes: { id: number }[]
}

export interface IUser {
  id?: number
  email: string
  token: string
  refreshToken: string
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

export interface IAllUserData {
  email: string
  id: number
  todos: ITodo[]
}

export interface IStat {
  user_email: string
  user_id: number
  likecount: string
  todocount: string
}
