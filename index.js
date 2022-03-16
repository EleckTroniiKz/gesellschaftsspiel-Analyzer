const {Boardgame, Player, Gamesnight} = require("./applicationMode");
const {DataHandler} = require('./dataHandler');
const {Control} = require("./control");
const {Export} = require("./fileExport");
const {MODES, MANAGEMENT_MODES, MANAGEMENT_PLAYERS_MODES, EDIT_PLAYERS, MANAGEMENT_GAMES_MODES, DELETE_GAME, MENUES} = require("./enums/enum.js")


let session;
/*
let hasImportedData = false;
let control = new Control();
control.postWelcome();
*/
//Check if there is already Data saved
let exp = new Export();
let csvData = "";
csvData += exp.setPlayerRatingCSV();
csvData += exp.setGameAvgCSV();
exp.createCSV(csvData,"Mein Export");
/*
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
	switch(mode_index){
		case 1:
			if(hasImportedData){
				let userList = session.getUserObjectList();
				let gamesnight = new Gamesnight(userList);
				let gameList = []
				for(let i = 0; i < userList.length; i++){
					let currentUsersGames = userList[i].getBoardgames();
					for(let j = 0; j < currentUsersGames.length; j++){
						let gameName = currentUsersGames[j];
						if(!gameList.includes(gameName)){
							gameList.push(gameName);
						}
					}
				}
				let gameObjects = []
				for(let i = 0; i < gameList.length; i++){
					gameObjects.push(new Boardgame(gameList[i]))
				}
		
				for(let i=0; i < userList.length; i++){
					let player = userList[i];
					let playerName = player.getName();
					for(let g = 0; g < gameList.length; g++){
						let gameName = gameList[g]
						let rating = await control.setRating(playerName, gameName);
						switch(rating){
							case 0:
								rating = 5;
								break;
							case 1:
								rating = 4;
								break;
							case 2:
								rating = 3;
								break;
							case 3:
								rating = 2;
								break;
							case 4:
								rating = 1;
								break;
							case 5:
								rating = 0;
								break;
							default:
								rating = 0;
								break;
						}
						player.setRating(gamesnight, gameName, rating);
						
					}
				} 
				for(let i=0; i < userList.length; i++){
					console.log(userList[i].getRating());
				}
				
				//Ab hier wurden alle Games gerated nehme ich an.
				// ich weiß leider nicht ganz was dann passieren soll xD
			}
			else{
				let errorMsg = await control.decision(["Ok"], "No Data found.", "Please import Data first!");
			}
			break;
		case 0:
			break;
		default:
			break;
	}
	mainLoop();
	//TO DO
  
  
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