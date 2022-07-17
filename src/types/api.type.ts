export interface AddApi {
    guildId: string
    channelId: string
    inviteUrl: string
    webhookUrl: string
}

export interface SendMessageApi {
    userId: string
    tag: string
    avatar_url: string
    guildId: string
    channelId: string
    content: string
    files: string[]
}

export interface UserApi {
    userId: string
    moderator: boolean
    gcid: string
    support: string
    poweredBy: string
}

export interface MuteApi {
    userId: string
    moderatorId: string
    reason: string
    expiriedAt?: string
}