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
                            title: 'Błąd',
                            color: 'RED',
                            content: `Błąd którego nie znam! Sprobuj ponownie.`
                        })
                    ]
                })
        }

        if (!command) {
            this.command.reply({
                ephemeral: true,
                content: 'Użyto nieznanego polecenia.'
            })
            return console.error(`Unknown command: ${this.command.commandName}`)
        }

        !this.command.guild?.name && (await this.command.guild?.fetch())

        if (command.permissions && !new PermissionsHandler(command.permissions, this.command.member?.permissions))
            return this.command.reply({
                ephemeral: true,
                embeds: [
                    new Embed({
                        title: 'Brak uprawnień do komendy',
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
                        title: 'Brak uprawnień, komenda developerska',
                        color: 'RED',
                        content: `Nie posiadasz uprawnień do użycia tej komendy!`
                    })
                ]
            }); // if there is no ';' it's an error

        const response = await command.run({interaction: this.command})
        try {

            if (!response)
                return

            switch (typeof response.send) {

                case 'string':
                    this.command.reply({
                        ephemeral: response.ephermal,
                        content: response.send
                    })
                    break

                default:
                    this.command.reply({
                        ephemeral: response.ephermal,
                        embeds: [new Embed(response.send)]
                    })
                    break

            }

        } catch (e) {
            this.command.reply({
                ephemeral: true,
                embeds: [
                    new Embed({
                        title: 'Błąd komendy',
                        color: 'RED',
                        content: `${e}`
                    })
                ]
            })
        }

    }

}