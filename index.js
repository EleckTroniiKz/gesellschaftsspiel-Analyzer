const {Boardgame, Player} = require("./applicationMode");
const {DataHandler} = require('./dataHandler');
const {Control} = require("./control");
let control = new Control();

let session = new DataHandler('dos.csv')
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
let player = new Player("Niclas", ["test"]);
console.log(player.getName());
console.log(player.getBoardgames());
player.addBoardgame("3");
console.log(player.getBoardgames());