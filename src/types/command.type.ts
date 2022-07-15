import {ChatInputApplicationCommandData, CommandInteraction, PermissionString} from 'discord.js'
import EmbedInput from './embed.type'

export interface SlashCommandArgs {
    interaction: CommandInteraction
}

export interface SlashCommandOutput {
    ephermal?: boolean
    send: EmbedInput | string
}

export default interface CommandType extends ChatInputApplicationCommandData {
    onlyGuild?: boolean
    dev?: boolean
    globalchtMod?: boolean
    permissions?: PermissionString[]
    run: (data: SlashCommandArgs) => Promise<SlashCommandOutput | false | void>
}