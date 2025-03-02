

export type IUser = {
    id: number,
    email: string,
    username: string,
    password: string,
    fullname: string,
    profilePic?: string,
    about?: string,
    isActivated: number,
    activationLink?: string
}

export type IUserData = Omit<IUser, "password" | "isActivated" | "activationLink">

export type ILoginCredentials = Pick<IUser, "email" | "password">

export type IRegisterCredentials = Pick<IUser, "email" | "password" | "username" | "fullname">

export type ITokens = {
    refreshToken: string,
    accessToken: string
}

