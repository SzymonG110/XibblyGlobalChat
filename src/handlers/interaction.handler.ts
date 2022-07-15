import {CommandInteraction} from 'discord.js'
import {bot} from '../structures/client'
import PermissionsHandler from './permissions.handler'
import Embed from '../structures/embed'

export default class InteractionHandler {

    constructor(private command: CommandInteraction) {
        this.init()
    }

    async init() {

        const command = bot.slashCommands.get(this.command.commandName)

        if (!this.command.guild?.members.cache.get(this.command.user.id)) {

            !bot.users.cache.get(this.command.guild?.ownerId!) && (await bot.users.fetch(this.command.user.id))
            if (!this.command.guild?.members.cache.get(this.command.user.id))
                return this.command.reply({
                    ephemeral: true,
                    embeds: [
                        new Embed({
                            author: ['Błąd'],
                            color: 'RED',
                            content: `Błąd którego nie znam! Sprobuj ponownie.`
                        })
                    ]
                })

        }

        if (!command) {
            this.command.reply({
                ephemeral: true,
                content: 'Unknown interaction command was used.'
            })
            return console.error(`Unknown command: ${this.command.commandName}`)
        }

        !this.command.guild?.name && (await this.command.guild?.fetch())

        if (command.permissions && !new PermissionsHandler(command.permissions, this.command.member?.permissions))
            return this.command.reply({
                ephemeral: true,
                embeds: [
                    new Embed({
                        author: ['Brak uprawnień do komendy'],
                        color: 'RED',
                        content: `Nie posiadasz uprawnień do użycia tej komendy!\n Wymagane: ${command.permissions.map(perm => `\`${perm}\``).join(', ')}`
                    })
                ]
            })

        if (command.dev && !bot.settings.ownerID.includes(this.command.user.id))
            return this.command.reply({
                ephemeral: true,
                embeds: [
                    new Embed({
                        author: ['Brak uprawnień, komenda developerska'],
                        color: 'RED',
                        content: `Nie posiadasz uprawnień do użycia tej komendy!`
                    })
                ]
            }); // if there is no ";" it's an error

        (command as any).run({interaction: this.command})
            .then((res: any) => {
                if (!res || typeof res === 'boolean') return console.log(`Invalid interaction command run method response!: ${res}`)

                if (res.send) {

                    switch (typeof res.send) {

                        case 'string':
                            this.command.reply({
                                ephemeral: res.ephermal,
                                content: res.send
                            })
                            break

                        default:
                            this.command.reply({
                                ephemeral: res.ephermal,
                                embeds: [new Embed(res.send)]
                            })
                            break

                    }

                } else console.info(`Response returns void`)
            })
            .catch((er: any) => {

                console.error(er)

                return this.command.reply({
                    ephemeral: true,
                    embeds: [
                        new Embed({
                            author: ['Błąd komendy'],
                            color: 'RED',
                            content: `${er}`
                        })
                    ]
                })
            })

    }

}