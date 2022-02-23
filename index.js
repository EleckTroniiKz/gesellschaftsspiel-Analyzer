const {Boardgame, Player} = require("./applicationMode");
const {DataHandler} = require('./dataHandler');
const {Control} = require("./control");
const {MODES, MANAGEMENT_MODES, MANAGEMENT_PLAYERS_MODES, EDIT_PLAYERS, MANAGEMENT_GAMES_MODES, DELETE_GAME, MENUES} = require("./enums/enum.js")

let control = new Control();

//let session = new DataHandler('dos.csv')
control.postWelcome();
mainLoop();

async function gamesManagementLoop(mode_index){
	
	switch(mode_index){
			case MANAGEMENT_GAMES_MODES.RETURN:
				mainLoop(MODES.MANAGEMENT)
				break;
		case MANAGEMENT_GAMES_MODES.ADD:
			//add GAME
			//Input a Name for the game. Then choose if it should be added to a existing player or create a new player
			break;
		case MANAGEMENT_GAMES_MODES.EDIT:
			//edit game
			//first show list of games (ID + name). Then choose which one should be edited 
			//After selection, choose a player with that game and change the name either for one person or globally
			break;
		case MANAGEMENT_GAMES_MODES.DELETE:
			//delete Game
			//Either for a player or globally
			break;
		default:
			console.log("Something wrong with the index!")
			break;
	}
}

async function playerManagementLoop(mode_index){
	console.log(mode_index === MANAGEMENT_PLAYERS_MODES.RETURN)
	switch(mode_index){
			case MANAGEMENT_PLAYERS_MODES.RETURN:
				mainLoop(MODES.MANAGEMENT)
				break;
			case MANAGEMENT_PLAYERS_MODES.ADD:
				//add Player
				//Input for Player Name, and the Games from the Player
				break;
			case MANAGEMENT_PLAYERS_MODES.EDIT:
				//edit Player
				//Show list of players and give out the IDs + Names to select.
				//After selection, choose what will be edited: Name, Games
				break;
			case MANAGEMENT_PLAYERS_MODES.DELETE:
				//delete Player
				//Show list of player and give out the IDs + Names to select.
				//After selection, ask if the user is sure they want to delete that user
				//YES --> delete |No --> RETURN
				break;
			default:
				console.log("Something wrong with the index!55")
				break;
	}
}

async function managementLoop(mode_index){
	let managementIndex;
	switch(mode_index){
		case MANAGEMENT_MODES.RETURN:
			mainLoop();
			break;
		case MANAGEMENT_MODES.MANAGE_PLAYERS:
      managementIndex = await control.postManagePlayersMenu();
			playerManagementLoop(managementIndex);
		  break;
		case MANAGEMENT_MODES.MANAGE_GAMES:
			managementIndex = await control.postManageGamesMenu();
			gamesManagementLoop(managementIndex);
			break;
		case MANAGEMENT_MODES.PLAN_GAMENIGHT:
			//Plan Gamenight
			break;
		default:
			console.log("Something wrong with the index!")
			break;
	}
}

async function applicationLoop(mode_index){
	//TO DO
}

async function mainLoop(mainIndex = null) {
	if(!mainIndex){
		mainIndex = await control.postMainMenu()
	}
  
	switch(mainIndex) {
		case MODES.EXIT:
			console.log("EXIT");
      process.Exit();
			break;
		case MODES.IMPORT: //Import Mode
			break;
		case MODES.APPLICATION: // Application Mode
      let applicationIndex = await control.postApplicationMode();	
			applicationLoop(applicationIndex)
	    break;
		case MODES.MANAGEMENT: //Management Mode
      let managementIndex = await control.postManagementMode();
			console.log(managementIndex)
			managementLoop(managementIndex);
      break;
  	case MODES.EXPORT: //Export Mode
	  	break;
		default:
			console.log("Something wrong with the index!");
			break;
	}
}

/*let game = new Boardgame("Wizard");
console.log(game.getName());
game.setRating();
console.log(game.getRating());
let player = new Player("Niclas", ["test"]);
console.log(player.getName());
console.log(player.getBoardgames());
player.addBoardgame("3");
console.log(player.getBoardgames());*/