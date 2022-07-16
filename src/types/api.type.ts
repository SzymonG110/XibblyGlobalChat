export interface SendMessageApi {
    userId: string
    tag: string
    avatar_url: string
    guildId: string
    content: string
    files: string[]
}

export interface GlobalchatUserApi {
    userId: string
    moderator: boolean
    gcid: string
    support: string
    poweredBy: string
}