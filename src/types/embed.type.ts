import {ColorResolvable} from 'discord.js'

export default interface EmbedInput {
    content?: string
    color?: ColorResolvable | "false"
    footer?: [string, string?]
    author?: [string, string?]
    fields?: [string, string, boolean?][]
}