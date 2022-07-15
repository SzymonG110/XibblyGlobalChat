import CommandType from '../../types/command.type'
import {ChannelTypes} from 'discord.js/typings/enums'
import {TextChannel} from 'discord.js'
import {bot} from '../../structures/client'
import axios from 'axios'

export default {

    name: 'add',
    description: 'Dodaje serwer z czatem globalnym na listę weryfikacji',
    onlyGuild: true,
    permissions: ['ADMINISTRATOR'],
    options: [
        {
            name: 'channel',
            description: 'Kanał na którym ma być odpowiedzailny za czat',
            type: 'CHANNEL',
            required: true,
            channel_types: [ChannelTypes.GUILD_TEXT]
        }
    ],

    run: async ({interaction}) => {

        const channel = interaction.options.getChannel('channel') as TextChannel

        const channelInvite = await channel.createInvite({
            reason: 'GlobalChat powered by Xibbly',
            maxAge: 0
        })

        const createWebhook = await channel.createWebhook('GlobalChat', {
            reason: 'GlobalChat powered by Xibbly'
        })

        const postResponse = await axios.post(`${bot.settings.baseApiUrl}/add`, {
            token: process.env.USER_TOKEN,
            guildId: interaction.guild?.id,
            inviteUrl: channelInvite.url,
            webhookUrl: createWebhook.url
        })

        if (postResponse.status === 200)
            return {
                ephermal: false,
                send: {
                    title: 'Dodano serwer',
                    content: 'Serwer oczekuje na weryfikacje.'
                }
            }

        return {
            title: 'Błąd',
            send: {
                content: postResponse.data.error
            }
        }

    }

} as CommandType