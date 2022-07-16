import {Permissions, PermissionString} from 'discord.js'

export default class PermissionsHandler {

    constructor(commandPerms: PermissionString[], memberPerms: Permissions) {
        return !commandPerms.some(perm => !memberPerms.has(perm))
    }

}