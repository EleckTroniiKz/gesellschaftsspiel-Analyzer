const {Boardgame, Player} = require("./applicationMode");
const {DataHandler} = require('./dataHandler');
const {Control} = require("./control");
let control = new Control();

//let session = new DataHandler('dos.csv')
control.postWelcome();

function showPage(x){
	//
}

async function loop() {
  let x = await control.postMainMenu();
  console.log("INDEX: " + x)
	switch(x) {
		case 0:
			console.log("EXIT");
			break;
		case 1:
			console.log("Import Mode");
			break;
		case 2:
			console.log("Application Mode");
			break;
		case 3:
			console.log("Export Mode");
			break;
		default:
			console.log("Something wrong");
			break;
	}
	/**
	* wenn x == 0 consle.log(exit), x==1 console.log(import mode), ...
*/

  // TODO: Rest des Programms
}

loop();

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
console.log(game.getRating());
let player = new Player("Niclas", ["test"]);
console.log(player.getName());
console.log(player.getBoardgames());
player.addBoardgame("3");
console.log(player.getBoardgames());*/