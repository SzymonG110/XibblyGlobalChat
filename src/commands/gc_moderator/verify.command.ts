import CommandType from '../../types/command.type'
import {bot} from '../../structures/client'
import ApiPostUtil from '../../utils/apiPost.util'

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
            const postResponse = await new ApiPostUtil().verify(guild.id, interaction.user.id)

            if (postResponse.status === 200)
                return {
                    send: {
                        title: 'Serwer zweryfikowany',
                        content: 'Serwer dodany do listy czatów gobalnych.'
                    }
                }

            return {
                ephermal: true,
                title: 'Błąd',
                send: {
                    title: 'Błąd',
                    content: postResponse.data.error
                }
            }
        } catch (e) {
            return {
                ephermal: true,
                title: 'Błąd',
                send: {
                    title: 'Błąd',
                    content: 'Wystąpił błąd'
                }
            }
        }
    }

} as CommandType