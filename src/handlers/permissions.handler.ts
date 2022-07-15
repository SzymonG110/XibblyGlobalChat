import {PermissionString} from 'discord.js'

export default class PermissionsHandler {

    constructor(commandPerms: PermissionString[], memberPerms: string | PermissionString | any) {
        return !commandPerms.some(p => !memberPerms.has(p))
    }

}