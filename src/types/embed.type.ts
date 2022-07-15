import {ColorResolvable} from 'discord.js'

export default interface EmbedInput {
    title?: string
    content?: string
    fields?: [string, string, boolean?][]
    footer?: [string, string?]
    color?: ColorResolvable | 'false'
}