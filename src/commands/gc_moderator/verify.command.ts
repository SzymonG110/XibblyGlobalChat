import CommandType from '../../types/command.type'
import axios from 'axios'
import {bot} from '../../structures/client'
import {TextChannel} from 'discord.js'

export default {

    name: 'add',
    description: 'Dodaje serwer z czatem globalnym na listę weryfikacji',
    onlyGuild: true,
    globalchtMod: true,
    options: [
        {
            name: 'guildId',
            description: 'ID serwera do weryfikacji',
            type: 'STRING',
            required: true
        }
    ],

    run: async ({interaction}) => {

        const guildId = bot.channels.cache.get(interaction.options.getString('guildId') as string) as TextChannel

        const postResponse = await axios.post(`${bot.settings.baseApiUrl}/verify`, {
            token: process.env.MODERATION_GC_TOKEN,
            guildId: guildId.id,
            moderatorId: interaction.user.id
        })

        if (postResponse.status === 200)
            return {
                ephermal: false,
                send: {
                    title: 'Serwer zweryfikowany',
                    content: 'Serwer dodany do listy czatów gobalnych.'
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