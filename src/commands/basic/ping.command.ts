import CommandType from '../../types/command.type'
import {bot} from '../../structures/client'

export default {

    name: 'ping',
    description: 'Ping bota',

    run: async () => {

        return {
            send: {
                title: 'Ping',
                content: `Moj ping wynosi \`${bot.ws.ping}\`ms.`
            }
        }

    }

} as CommandType