import {MessageEmbed} from 'discord.js'
import EmbedInput from '../types/embed.type'

export default class Embed extends MessageEmbed {


    constructor(data: EmbedInput) {

        super()

        data.content && this.setDescription(data.content)
        data.fields && data.fields.forEach(f => this.addField(...f))
        data.author && this.setAuthor(...data.author)
        data.footer && this.setFooter(...data.footer)

        data.color != "false" && data.color && this.setColor(data.color)
        data.color != "false" && !data.color && this.setColor("RANDOM")

    }

}