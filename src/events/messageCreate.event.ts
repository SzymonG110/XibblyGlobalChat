import {bot} from '../structures/client'
import {Message} from 'discord.js'
import Embed from '../structures/embed'

export default class {

    async run(message: Message) {

        if (message.content.startsWith(`<@${bot.user?.id}>`) ||
            message.content.startsWith(`<@!${bot.user?.id}>`)) {
            message.reply({
                embeds: [
                    new Embed({
                        title: 'Wzmianka',
                        content: `Hej! Jestem botem działających na komendach zaczynających się od(\`/\`)(slash commands). W razie niedziałających komend usuń bota z serwera a następnie [dodaj](https://discord.com/api/oauth2/authorize?client_id=${bot.user?.id}&permissions=8&scope=bot%20applications.commands) go ponownie!\n\n[SUPPORT](${process.env.SUPPORT_INVITE})`
                    })
                ]
            })
        }

    }

}