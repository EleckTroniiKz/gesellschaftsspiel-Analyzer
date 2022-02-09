const {fileImport} = require('./fileImport');

let session = new fileImport('users1.csv')
//session.deleteGame(2141, 'Magic')
//session.deleteUser(757)
//session.addGame(9598, 'Call of Duty')
console.log(session.getUserList())
session.addUser('Patrick', ['CSGO', 'Minecraft', 'Black Stories'])
console.log(session.getUserList())