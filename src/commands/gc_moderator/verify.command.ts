import CommandType from '../../types/command.type'
import axios from 'axios'
import {bot} from '../../structures/client'

export default {

    name: 'verify',
    description: 'Dodaje serwer z czatem globalnym na listę weryfikacji',
    onlyGuild: true,
    globalchtMod: true,
    options: [
        {
            name: 'guildid',
            description: 'ID serwera do weryfikacji',
            type: 'STRING',
            required: true
        }
    ],

    run: async ({interaction}) => {
        const guild = bot.guilds.cache.get(interaction.options.getString('guildid') as string)

        if (!guild)
            return {
                ephermal: true,
                send: {
                    title: 'Błąd',
                    content: 'Nie znaleziono serwera o podanym ID'
                }
            }

        try {
            // @todo to ApiPostUtil
            const postResponse = await axios.post(`${bot.settings.baseApiUrl}/verify`, {
                token: process.env.MODERATION_GC_TOKEN,
                guildId: guild.id,
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
                    title: 'Błąd',
                    content: postResponse.data.error
                }
            }
        } catch (e) {
            return {
                title: 'Błąd',
                send: {
                    title: 'Błąd',
                    content: 'Wystąpił błąd'
                }
            }
        }
    }

} as CommandType