import {readdirSync} from 'fs'
import {Bot} from '../structures/client'

export default class EventsHandler {

    constructor(bot: Bot) {

        const events: string[] = readdirSync(`${__dirname}/../events`).filter(f => f.endsWith('.js'))

        console.log('>>> Loading events!')

        events.forEach((eventFile: string) => {

            const file = require(`${__dirname}/../events/${eventFile}`)
            const eventClass = new file.default()
            const eventName: string = eventFile.split(/\./g)[0]
            bot.on(eventName, (...args) => eventClass.run(...args))
            console.log(`>> Loaded: ${eventName}!`)

        })

    }

}