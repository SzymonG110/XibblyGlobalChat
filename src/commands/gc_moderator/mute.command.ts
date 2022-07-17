import CommandType from '../../types/command.type'
import ApiPostUtil from '../../utils/apiPost.util'

export default {

    name: 'mute',
    description: 'Wycisza użytkownika',
    onlyGuild: true,
    globalchtMod: true,
    options: [
        {
            name: 'userid',
            description: 'ID użytkownika z Xibbly GlobalChat',
            required: true,
            type: 'STRING'
        },
        {
            name: 'reason',
            description: 'Powód wyciszenia',
            required: true,
            type: 'STRING'
        },
        {
            name: 'time',
            description: 'Czas wyciszenia np. 1d / 2h / 3m / 4s',
            required: false,
            type: 'STRING'
        }
    ],

    run: async ({interaction}) => {

        const userid = interaction.options.getString('userid')
        const reason = interaction.options.getString('reason')
        const time = interaction.options.getString('time', false) || undefined

        try {
            const mute = await new ApiPostUtil().mute({
                userId: userid as string,
                moderatorId: interaction.user.id,
                reason: reason as string,
                expiriedAt: time
            })

            if (mute.status === 200)
                return {
                    send: {
                        title: 'Wyciszenie',
                        content: `Użytkownik został wyciszony(\`${reason}\`; \`${time || 'permamentny'}\`).`
                    }
                }

            return {
                ephermal: true,
                send: {
                    title: 'Błąd',
                    content: mute.data.error
                }
            }
        } catch (e) {
            return {
                ephermal: true,
                send: {
                    title: 'Błąd',
                    content: 'Wystąpił błąd'
                }
            }
        }
    }

} as CommandType