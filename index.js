const {Boardgame} = require("./applicationMode");
const {fileImport} = require('./fileImport');

let session = new fileImport('dos.csv')
//session.checkFilename()
//session.deleteGame(2141, 'Magic')
//session.deleteUser(757)
//session.addGame(9598, 'Call of Duty')
//console.log(session.getUserList())
//session.addUser('Patrick', ['CSGO', 'Minecraft', 'Black Stories'])
//console.log(session.getUserList())

/*let game = new Boardgame("Wizard");
console.log(game.getName());
game.setRating();
console.log(game.getRating());*/