import {CommandInteraction, Permissions} from 'discord.js'
import {bot} from '../structures/client'
import PermissionsUtil from '../utils/permissions.util'
import Embed from '../structures/embed'
import CommandType, {SlashCommandOutput} from '../types/command.type'
import ApiPostUtil from '../utils/apiPost.util'

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

            if (await this.checkPermissions(command))
                return this.command.reply({
                    ephemeral: true,
                    embeds: [
                        new Embed({
                            title: 'Brak uprawnień do komendy',
                            color: 'RED',
                            content: 'Nie posiadasz uprawnień do użycia tej komendy!'
                        })
                    ]
                })

            this.response(await command.run({interaction: this.command}))
        } catch (e) {
            console.error(e)

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

    private response(response: SlashCommandOutput | false | void): void {
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
    }

    private async checkPermissions(command: CommandType): Promise<boolean> {
        return (command.permissions && !new PermissionsUtil(command.permissions, this.command.member?.permissions as Permissions) || command.globalchtMod && !(await new ApiPostUtil().getUser(this.command.user.id)).moderator || command.dev && !bot.settings.ownerID.includes(this.command.user.id)) || false
    }

}