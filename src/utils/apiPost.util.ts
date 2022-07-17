import {AddApi, GlobalchatUserApi, SendMessageApi} from '../types/api.type'
import axios, {AxiosResponse} from 'axios'
import {bot} from '../structures/client'

export default class ApiPostUtil {

    public async add(data: AddApi): Promise<AxiosResponse<any, any>> {
        return await axios.post(`${bot.settings.baseApiUrl}/add`, {
            token: process.env.USER_TOKEN,
            ...data
        })
    }

    public async send(data: SendMessageApi): Promise<boolean> {
        const response = await axios.post(`${bot.settings.baseApiUrl}/send`, {
            token: process.env.USER_TOKEN,
            ...data
        })
        return response.status === 200
    }

    public async getUser(userId: string): Promise<GlobalchatUserApi> {
        const response = await axios.post(`${bot.settings.baseApiUrl}/user`, {
            token: process.env.USER_TOKEN,
            userId
        })
        return response.data
    }

    public async verify(guildId: string, moderatorId: string): Promise<AxiosResponse<any, any>> {
        return await axios.post(`${bot.settings.baseApiUrl}/verify`, {
            token: process.env.MODERATION_GC_TOKEN,
            guildId,
            moderatorId
        })
    }

}
