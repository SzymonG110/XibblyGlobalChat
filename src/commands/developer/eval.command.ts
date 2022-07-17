import CommandType from '../../types/command.type'

export default {
    name: 'eval',
    description: 'Wykonuje kod JavaScript',
    dev: true,
    options: [
        {
            name: 'ephermal',
            type: 'BOOLEAN',
            description: 'Ma być pokazana innym?',
            required: true
        },
        {
            name: 'code',
            type: 'STRING',
            description: 'Kod JavaScript',
            required: true
        }
    ],

    run: async ({interaction}) => {
        const isEphermal = interaction.options.get('ephermal', true).value

        try {
            const evaled = await eval(await interaction.options.get('code', true).value as string)

            return {
                ephermal: isEphermal,
                send: {
                    title: 'Eval',
                    content: `\`\`\`js\n${evaled ? evaled.toString().lenght > 4000 ? evaled.toString().slice(0, 4000) + '[..]' : evaled.toString() : 'null'}\`\`\``
                }
            }
        } catch (e) {
            return {
                ephermal: isEphermal,
                send: {
                    title: 'Eval',
                    content: `\`\`\`${e}\`\`\``
                }
            }
        }
    }
} as CommandType