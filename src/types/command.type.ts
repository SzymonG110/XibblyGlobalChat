import {ChatInputApplicationCommandData, CommandInteraction, PermissionString} from 'discord.js'
import EmbedInput from './embed.type'

export interface SlashCommandArgs {
    interaction: CommandInteraction
}

export interface SlashCommandOutput {
    ephermal?: boolean,
    send: EmbedInput | string
}

export default interface CommandType extends ChatInputApplicationCommandData {
    dev?: boolean,
    permissions?: PermissionString[],
    category?: string,
    run: (data: SlashCommandArgs) => Promise<SlashCommandOutput | false | void>
}