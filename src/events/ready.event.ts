import {bot} from '../structures/client'

export default class eventClass {

    async run() {

        if (!bot.customStatus)
            bot.user?.setPresence({
                status: 'online',
                activities: [
                    {
                        name: '/help',
                        type: 'WATCHING'
                    }
                ]
            })

        console.log(`>>> ${bot.user?.tag} is ready!`)

    }

}