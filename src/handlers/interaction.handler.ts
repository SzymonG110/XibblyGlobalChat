import {CommandInteraction, Permissions} from 'discord.js'
import {bot} from '../structures/client'
import PermissionsUtil from '../utils/permissions.util'
import Embed from '../structures/embed'

export default class InteractionHandler {

    constructor(private command: CommandInteraction) {
        this.init()
    }

    async init(): Promise<void> {

        const command = bot.slashCommands.get(this.command.commandName)

        if (!command || command.globalchtMod && (!process.env.MODERATION_GC_TOKEN || !(process.env.MODERATION_GC_TOKEN != '')))
            return

        try {
            if (command.onlyGuild && !this.command.guild)
                return this.command.reply({
                    ephemeral: true,
                    embeds: [
                        new Embed({
                            title: 'Błąd',
                            color: 'RED',
                            content: 'To polecenie jest dostępne tylko na serwerze.'
                        })
                    ]
                })

            if (!this.command.guild?.members.cache.get(this.command.user.id))
                return this.command.reply({
                    ephemeral: true,
                    embeds: [
                        new Embed({
                            title: 'Błąd',
                            color: 'RED',
                            content: 'Błąd którego nie znam! Sprobuj ponownie.'
                        })
                    ]
                })

            if (command.permissions && !new PermissionsUtil(command.permissions, this.command.member?.permissions as Permissions))
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
                })

            const response = await command.run({interaction: this.command})

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