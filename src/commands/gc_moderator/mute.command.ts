import CommandType from '../../types/command.type'

export default {

    name: 'mute',
    description: 'Wycisza użytkownika',
    onlyGuild: true,

    run: async ({}) => {

        return {
            send: {}
        }

    }

} as CommandType