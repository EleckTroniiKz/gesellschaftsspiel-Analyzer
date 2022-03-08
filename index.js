const {Boardgame, Player, Gamesnight} = require("./applicationMode");
const {DataHandler} = require('./dataHandler');
const {Control} = require("./control");
const {MODES, MANAGEMENT_MODES, MANAGEMENT_PLAYERS_MODES, EDIT_PLAYERS, MANAGEMENT_GAMES_MODES, DELETE_GAME, MENUES} = require("./enums/enum.js")

let hasImportedData = false;
let session;
let control = new Control();
control.postWelcome();
//Check if there is already Data saved
mainLoop();

async function gamesManagementLoop(mode_index){
	
	switch(mode_index){
			case MANAGEMENT_GAMES_MODES.RETURN:
				mainLoop(MODES.MANAGEMENT)
				break;
		case MANAGEMENT_GAMES_MODES.ADD:
			//add GAME
			//Input a Name for the game. Then choose if it should be added to a existing player or create a new player
			if(hasImportedData){
				let userList = session.getUserList();
				let filteredNameList = []
				let filteredIDList = []
				for(let i = 0; i < userList.length; i++){
					filteredNameList.push(userList[i].name);
					filteredIDList.push(userList[i].uID);
				}
				filteredNameList.push("RETURN")
				let choosenPlayer = await control.choosePlayer(filteredNameList);
				if(filteredNameList[choosenPlayer] !== "RETURN"){
					let gameToAdd = await control.addGameInput();
					if(await control.confirm(`Do you really want to add ${gameToAdd} to the User ${filteredNameList[choosenPlayer]}?`)){
						session.addGame(filteredIDList[choosenPlayer], gameToAdd);
					}
					else{
						await control.decision(["Ok"], "No Data found.", "Please import Data first!")
					}
					//Wollen sie spiel x zu user y hinzufügen --> ja und nein
					//session.addGame(userID, newGame).
					//Dann ausgeben, dass SPiel x zu User y hinzugefügt wurde.
					//vllt die spiele liste vom user ausgeben. --> 
				}
			}
			else{
				let errorMsg = await control.decision(["Ok"], "No Data found.", "Please import Data first!")
			}
			mainLoop(MODES.MANAGEMENT);
			break;
		case MANAGEMENT_GAMES_MODES.EDIT:
			//edit game
			//first show list of games (ID + name). Then choose which one should be edited 
			//After selection, choose a player with that game and change the name either for one person or globally
			break;
		case MANAGEMENT_GAMES_MODES.DELETE:
			let gameList = session.getGlobalGameList()
			gameList.push("RETURN")
			let gameToDelete = await control.chooseGame(gameList)
			let chosenAct = await control.decision(['GLOBAL', 'PLAYER', 'RETURN'], 'Delete Game', 'Do you want to delete the chosen game from a user or globally?')
			if(gameToDelete !== "RETURN"){
				if(chosenAct === "GLOBAL"){
					session.deleteGameGlobally(gameToDelete);
				}
				else if(chosenAct === "PLAYER"){
					let userList = session.getUserList();
					let filteredNameList = []
					let filteredIDList = []
					for(let i = 0; i < userList.length; i++){
						filteredNameList.push(userList[i].name);
						filteredIDList.push(userList[i].uID);
					}
					filteredNameList.push("RETURN")
					let chosenIndex = await control.choosePlayer(filteredNameList)
					if(filteredNameList[chosenIndex] === "RETURN"){
						mainLoop(MODES.MANAGEMENT);
					}
					else {
						if(await control.decision(["Yes", "No"], "Confirm Delete", `Are you sure you want to delete ${gameToDelete} from ${filteredNameList[chosenIndex]}`)){
							session.deleteGameFromUser(filteredIDList[chosenIndex], gameToDelete);
						}
						else{
							mainLoop(MODES.MANAGEMENT);
						}
					}
				}
			}
			mainLoop(MODES.MANAGEMENT);
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
				control.addPlayerInput()
			//muss noch liste der spiele und des spielernames returnen
				//add Player
				//Input for Player Name, and the Games from the Player
				break;
			case MANAGEMENT_PLAYERS_MODES.EDIT:
				//edit Player
				//Show list of players and give out the IDs + Names to select.
				//After selection, choose what will be edited: Name, Games
				break;
			case MANAGEMENT_PLAYERS_MODES.DELETE:
			//userList = session.getUserList
			let userList = ["Harry", "Hermine", "Ron", "RETURN"]
			const player = await control.choosePlayer(userList)
			if(player !== "RETURN"){
				const decision = await control.confirm("Do you really want to delete the Player " + player + " ?\n")
				if(decision){
					//lösch det zeug
				}
				else{
					//sag dass es nicht gelöscht wurde
				}
			}
			mainLoop(MODES.MANAGEMENT)
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
  let player = new Player("Niclas", ["Wizard", "UNO"], 1);
  let player2 = new Player("Patrick", ["Siedler von Catan", "Risiko", "Wizard"], 2);
  console.log(player.getName());
  console.log(player.getBoardgames());
  console.log(player.getRating());
  console.log(player2.getRating());
  //console.log(player.getID());
  let gamesnight = new Gamesnight([player, player2]);
  console.log(gamesnight.getPlayers());
  console.log(gamesnight.getBoardgames());
  console.log(player.getBoardgames());
  console.log(player.getRating());
  console.log(player2.getRating());
  console.log(gamesnight.getRating());
  //player.setRating();
  player.setRating(gamesnight, "Wizard");
  console.log(player.getRating());
  console.log(player2.getRating());
  console.log(gamesnight.getRating());
  player.setRating(gamesnight, "UNO");
  console.log(player.getRating());
  console.log(player2.getRating());
  console.log(gamesnight.getRating());
  player.setRating(gamesnight, "Risiko");
  console.log(player.getRating());
  console.log(player2.getRating());
  console.log(gamesnight.getRating());
  player2.setRating(gamesnight, "Wizard");
  console.log(player.getRating());
  console.log(player2.getRating());
  console.log(gamesnight.getRating());
  
}

async function mainLoop(mainIndex = null) {
	if(!mainIndex){
		mainIndex = await control.postMainMenu()
	}
  
	switch(mainIndex) {
		case MODES.EXIT:
      		process.exit();
		case MODES.IMPORT: //Import Mode
			const fileText = await control.postFileSelector();
			if(fileText !== "EXIT"){
				session = new DataHandler(fileText)
				session.setUpLocalStorages()
				session.checkFilename()
				console.log(session.getUserList())
				console.log("Daten wurden gespeichert")
				hasImportedData = true;
			}
			mainLoop()
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