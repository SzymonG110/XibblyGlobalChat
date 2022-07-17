import CommandType from '../../types/command.type'
import {bot} from '../../structures/client'
import axios from 'axios'
import {TextChannel} from 'discord.js'
import ApiPostUtil from "../../utils/apiPost.util";

export default {

    name: 'add',
    description: 'Dodaje serwer z czatem globalnym na listę weryfikacji',
    onlyGuild: true,
    permissions: ['ADMINISTRATOR'],
    options: [
        {
            name: 'webhook',
            description: 'Link do webhooka',
            type: 'STRING',
            required: true
        }
    ],

    run: async ({interaction}) => {

        const webhookUrl = interaction.options.getString('webhook')

        try {
            const webhookData = await axios.get(webhookUrl as string)

            if (webhookData.status !== 200)
                return {
                    title: 'Błąd',
                    content: 'Nie udało się pobrać danych z webhooka. Upewniej się, że link do webhooka jest poprawny.'
                }

            const channel = bot.channels.cache.get(webhookData.data.channel_id) as TextChannel
            const channelInvite = await channel.createInvite({
                reason: 'GlobalChat powered by Xibbly',
                maxAge: 0
            })

            const postResponse = await new ApiPostUtil().add({
                guildId: interaction.guildId as string,
                channelId: webhookData.data.channel_id,
                webhookUrl: webhookUrl as string,
                inviteUrl: channelInvite.url
            })

            if (postResponse.status === 200)
                return {
                    send: {
                        title: 'Dodano serwer',
                        content: 'Serwer oczekuje na weryfikacje.'
                    }
                }

            return {
                ephermal: true,
                title: 'Błąd',
                send: {
                    content: postResponse.data.error
                }
            }

        } catch (e) {
            return {
                ephermal: true,
                send: {
                    title: 'Błąd',
                    content: 'Nie udało się pobrać danych z webhooka. Upewniej się, że link do webhooka jest poprawny. Bądź serwer oczekuje na weryfikację.'
                }
            }
        }

    }

} as CommandType