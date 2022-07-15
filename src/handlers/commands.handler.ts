import {Bot} from '../structures/client'
import {existsSync, readdirSync} from 'fs'
import CommandType from '../types/command.type'
import {ApplicationCommand} from 'discord.js'

export default class SlashCommandsHandler {

    constructor(private client: Bot) {
        this.client.on('ready', () => this.loadSlashCommands())
    }


    async updateCommand(command: ApplicationCommand, slash: CommandType): Promise<void> {
        if (command.name !== slash.name) return

        if (command.description !== slash.description || command.options !== slash.options) {
            command.edit({
                description: slash.description,
                options: slash.options,
                name: slash.name
            })
            console.log(`> Command updated ${slash.name}`)
        }

    }

    async clearCommands(data: any): Promise<void> {
        data?.forEach((c: ApplicationCommand) => {
            if (!this.client.slashCommands.find(s => s.name === c.name)) {
                this.client.application?.commands.delete(c)
                console.log(`> Removed old commands named: ${c.name}`)
            }
        })
    }

    async loadSlashCommands() {

        console.log('>>> Loading commands!')

        try {

            if (!this.client.application?.owner) await this.client.application?.fetch()

            const registeredCommands = await this.client.application?.commands.fetch()

            readdirSync(`${__dirname}/../commands`).forEach(d => {

                const dir = `${__dirname}/../commands/${d}`

                if (!dir || !existsSync(dir)) return

                readdirSync(dir)
                    .filter(f => f.endsWith('.js'))
                    .filter(f => !f.startsWith('--'))
                    .forEach(f => {

                        const slashCommnad: CommandType = require(`${dir}/${f}`).default

                        const cmd = registeredCommands?.find((s) => s.name === slashCommnad.name) || undefined

                        if (!cmd) this.client.application?.commands.create(slashCommnad)
                        else this.updateCommand(cmd, slashCommnad)

                        slashCommnad.category = d.charAt(0).toUpperCase() + d.substring(1)
                        this.client.slashCommands.set(slashCommnad.name, slashCommnad)
                        console.log(`>> Loaded ${f} as ${slashCommnad.name}`)

                    })

            })

            setTimeout(() => this.clearCommands(registeredCommands), 5 * 1000)

        } catch (e) {
            throw e;
        }

    }

}