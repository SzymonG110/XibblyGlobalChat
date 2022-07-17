import CommandType from '../../types/command.type'

export default {

    name: 'mute',
    description: 'Wycisza użytkownika',
    onlyGuild: true,
    globalchtMod: true,
    options: [
        {
            name: 'userid',
            description: 'ID użytkownika z Xibbly GlobalChat',
            required: true,
            type: 'NUMBER'
        },
        {
            name: 'reason',
            description: 'Powód wyciszenia',
            required: true,
            type: 'STRING'
        },
        {
            name: 'time',
            description: 'Czas wyciszenia np. 1d / 2h / 3m / 4s',
            required: false,
            type: 'STRING'
        }
    ],

    run: async ({interaction}) => {

        const userid = interaction.options.getNumber('userid')
        const reason = interaction.options.getString('reason')
        const time = interaction.options.getString('time', false) ? interaction.options.getString('time', false) : false



        return {
            send: {}
        }
    }

} as CommandType