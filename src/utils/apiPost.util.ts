import {SendMessageApi} from '../types/api.type'
import axios from 'axios'
import {bot} from '../structures/client'

export default class ApiPostUtil {

    async send(data: SendMessageApi): Promise<boolean> {
        const response = await axios.post(`${bot.settings.baseApiUrl}/send`, {
            token: process.env.USER_TOKEN,
            ...data
        })
        return response.status === 200
    }

}
