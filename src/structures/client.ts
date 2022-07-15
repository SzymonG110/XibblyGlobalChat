import {Client, ClientOptions, Collection, CommandInteraction, Intents} from 'discord.js'
import {config} from 'dotenv'
import CommandType from '../types/command.type'
import settingsFile from '../config/settings'

import InteractionHandler from '../handlers/interaction.handler'
import SlashCommandsHandler from '../handlers/commands.handler'
import EventsHandler from '../handlers/events.handler'

config()

export class Bot extends Client {
    public slashCommands: Collection<string, CommandType> = new Collection()
    public settings = settingsFile
    public customStatus: boolean = false

    constructor(options: ClientOptions) {
        super(options)

        new SlashCommandsHandler(this)
        new EventsHandler(this)

        this.on('interactionCreate', (i) => {
            if (!i.isCommand()) return
            new InteractionHandler(i as CommandInteraction)
        })

        this.login(process.env.CLIENT_TOKEN)
    }
}

export const bot = new Bot({
    intents: new Intents(32767),
    allowedMentions: {
        repliedUser: false,
        users: [],
        roles: []
    }
})