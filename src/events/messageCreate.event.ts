import {bot} from '../structures/client'
import {Message} from 'discord.js'
import Embed from '../structures/embed'
import ApiPostUtil from '../utils/apiPost.util'

const sqlite = require('sqlite-sync')

export default class {

    async run(message: Message) {

        if (message.content.startsWith(`<@${bot.user?.id}>`) ||
            message.content.startsWith(`<@!${bot.user?.id}>`))
            message.reply({
                embeds: [
                    new Embed({
                        title: 'Wzmianka',
                        content: `Hej! Jestem botem działających na komendach zaczynających się od(\`/\`)(slash commands). W razie niedziałających komend usuń bota z serwera a następnie [dodaj](https://discord.com/api/oauth2/authorize?client_id=${bot.user?.id}&permissions=8&scope=bot%20applications.commands) go ponownie!\n\n[SUPPORT](${process.env.SUPPORT_INVITE})`
                    })
                ]
            })

        if (!message.guild || !message.channel || sqlite.run(`SELECT *
                                                              FROM globalchats
                                                              WHERE channelId = '${message.channel.id}'`).length === 0 || message.author.bot || message.webhookId)
            return

        const files = message.attachments.map(attachment => attachment.url)
        await new ApiPostUtil().send({
            userId: message.author.id,
            tag: message.author.tag,
            avatar_url: message.author.avatarURL() || 'https://i.pinimg.com/736x/5c/fa/f1/5cfaf1ef6a6cbbb1634c287a2cfccaf1.jpg',
            guildId: message.guild.id,
            content: message.content,
            files
        })

    }

}