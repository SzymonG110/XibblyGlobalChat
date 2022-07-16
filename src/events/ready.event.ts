import {bot} from '../structures/client'

const sqlite = require('sqlite-sync')

export default class {

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

        sqlite.connect(`${__dirname}/../../database.db`)
        sqlite.run('CREATE TABLE IF NOT EXISTS globalchats (guildId TEXT, channelId TEXT)')

        console.log(`>>> ${bot.user?.tag} is ready!`)

    }

}