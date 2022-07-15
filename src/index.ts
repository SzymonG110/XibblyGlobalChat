const currentVersion = parseInt(process.version.split('.')[0])

if (currentVersion < 16) throw new Error(`Wersja node.js jest mniejsza niż 1.16!`)

import './structures/client'