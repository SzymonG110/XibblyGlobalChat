import CommandType from '../../types/command.type'

export default {

    name: 'mute',
    description: 'Wycisza użytkownika',

    run: async ({}) => {

        return {

            ephermal: false,
            send: {}

        }

    }

} as CommandType