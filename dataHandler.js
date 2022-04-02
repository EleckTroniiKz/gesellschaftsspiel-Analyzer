const fs = require('fs');
const LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./DataStorage/storage');
const {Boardgame, Player, Gamesnight} = require("./applicationMode");

//TODO get GLOBAL GAME LIST UND UPDATE GAMELIST



class DataHandler {
	constructor(fileName){
		this.fileName = fileName;
		this.userIDs = [];
	}

	/**
	 * @param {String} game: the game which will be deleted from every user
	 * @description iterates through every palyer and removes the game from the list and ratings
	 */
	deleteGameGlobally(game){
		let userList = this.getUserObjectList();
		let currentPlayer;
		let currentGames;
		let userListWithoutGame = [];
		for(let i = 0; i < userList.length; i++){
			currentPlayer = userList[i];
			currentGames = currentPlayer.getBoardgames();
			if(currentGames.includes(game)){
				currentGames = currentGames.filter((value) => {if(value!==game){return value;}});
				let map = currentPlayer.getRating();
				map.delete(game);
				currentPlayer.setBoardgameList(currentGames, this.transformHashToString(map));
			}
			userListWithoutGame.push(currentPlayer)
		}
		return;
		this.saveUserObjectList(userListWithoutGame);
	}

	setUpLocalStorages(){
		localStorage.setItem('userIds', JSON.stringify(this.userIDs))
		localStorage.setItem('gameList', JSON.stringify([]))
		localStorage.setItem('gamesnight', JSON.stringify(""));
	}

	updateGlobalGameList(){
		// geht durch die aktuellen Spieler, schaut sich die Ratings and --> falls alle gerated haben, gibts ein average
		// kriegt die objekt liste aller spiele
		let userList = this.getUserObjectList();
		return;
		
		//let globalGameList = JSON.parse(localStorage.getItem('gameList'));
		
		let gameNames = [];
		for(let i = 0; i < userList.length; i++){
			let currentUser = new Player(userList[i].name, userList[i].boardgames, userList[i].id)
			let games = currentUser.getBoardgames().length;
			for(let j = 0; j < games.length; j++){
				let currentGame = games[j];
				//gotta check if game name is in 
				if(!gameNames.includes(currentGame.name)){
					gameNames.push(currentGame.name);
					let game = new Boardgame(currentGame.name);
					if(currentGame.rating !== null){
						//Implement setRating method in boardgame with value setter
						//game.setRating(currentGame.rating);
					}
					globalGameList.push(game);
				}
			}
		}
		globalGameList = this.searchDuplicates(globalGameList)
		localStorage.setItem('gameList', JSON.stringify(globalGameList))
	}

	/**
	 * 
	 * @param {String} game: the game which existence will be checked 
	 * @param {Array<Player>} userList: list of all Players
	 * @returns {boolean}
	 */
	checkIfGameExists(game, userList){
		for(let i = 0; i < userList.length; i++){
			if(userList[i].getBoardgames().includes(game)){
				return true;
			}
		}
		return false;
	}

	/**
	 * @description Deletes user out of global user list
	 * @param number  is the ID of the user which is going to be deleted 	 
	*/
	deleteUser(userID){
		let userList = this.getUserObjectList();
		let filteredList = [];
		let gamesFromDeletedUser = []
		for(let i = 0; i < userList.length; i++){
			if(userList[i].getID() !== userID){
				userList[i].setBoardgameList(userList[i].getBoardgames(), this.transformHashToString(userList[i].getRating()))
				filteredList.push(userList[i]);
			}
			else{
				gamesFromDeletedUser = userList[i].getBoardgames();
			}
		}
		let vanish = [];
		for(let i = 0; i < gamesFromDeletedUser.length; i++){
			//if another user doesn't own the game the deleted user owned, then the game will be deleted out of the global game list and all rankings
			if(!this.checkIfGameExists(gamesFromDeletedUser[i], filteredList)){
				vanish.push(gamesFromDeletedUser[i]);
			}
		}
		if(vanish.length !== 0){
			//deleteGameGLobally and from all ratings
		}
		localStorage.setItem('users', JSON.stringify(filteredList))
	}

	/**
	 * 
	 * @param {Map} hashMap: Hashmap which will be transformed into an Stringarray, so it can be saved and restored in the localStorage
	 * @returns {JSONString}
	 */
	transformHashToString(hashMap){
		return JSON.stringify(Array.from(hashMap.entries()));
	}

	/**
	 * 
	 * @param {JSONString} stringArray: Turns the JSON.stringified Arraystring, to a hashMap 
	 * @returns {Map}
	 */
	transformStringToHash(stringArray){
		return new Map(JSON.parse(stringArray));
	}
	
	/**
	 * @description Deletes a game out of the games list of a specific user
	 * @param {userID} number  is the ID of the user in which the game will be removed out of the users list.
	 * @param {game} string is the name of the game which will be deleted.  
	 */
	deleteGameFromUser(userID, game){
		const userList = this.getUserObjectList();
		for(let i = 0; i < userList.length; i++){
			if(userList[i].getID() === userID && userList[i].getBoardgames().includes(game)){
				let games = userList[i].getBoardgames();
				let gameList = [];
				for(let j = 0; j < games.length; j++){
					if(games[j] !== game){
						gameList.push(games[j]);
					}
				}
				userList[i].setBoardgame(gameList);
				if(!this.checkIfGameExists(game, userList)){
					//Delete game globally and from all ratings
				}
				this.saveUserObjectList(userList);
				break;
			}
		}
		this.updateGlobalGameList()
	}
	
	/**
	 * 
	 * @param {*} gamesNight 
	 */
	saveGamesNightObject(gamesNight){
		gamesNight.setRatingHashmap(this.transformHashToString(gamesNight.getRating()));
		gamesNight.setAmountOfRatingsSetHashmap(this.transformHashToString(gamesNight.getAmountOfRatingsSetHashmap()));
		gamesNight.setVetoList(this.transformHashToString(gamesNight.getVetoList()));
		localStorage.setItem('gamesnight', JSON.stringify(gamesNight));
	}

	/**
	 * 
	 */
	getGamesNightObject(){
		let unparsedGamesnight = JSON.parse(localStorage.getItem('gamesnight'));
		
		let playerObjectList = [];
		for(let i=0; i < unparsedGamesnight.players.length; i++){
			let name = unparsedGamesnight.players[i].name;
			let games = unparsedGamesnight.players[i].boardgames;
			let ratings = unparsedGamesnight.players[i].ratingHashmap;
			let id = unparsedGamesnight.players[i].id;
			let player = new Player(name, games, id);
			player.setVeto(unparsedGamesnight.players[i].usedVeto);
			if(Object.keys(ratings).length !== 0){
				player.setRatingMap(this.transformStringToHash(ratings));
			}
			playerObjectList.push(player);
		}
		let gamesnight = new Gamesnight(playerObjectList);
		gamesnight.setRatingHashmap(this.transformStringToHash(unparsedGamesnight.ratingHashmap));
		gamesnight.setAmountOfRatingsSetHashmap(this.transformStringToHash(unparsedGamesnight.amountOfRatingsSetHashmap));
		gamesnight.setVetoList(this.transformStringToHash(unparsedGamesnight.vetoHash));
		return gamesnight;
	}


	/**
	 * @description adds game to the games list of an user
	 * @param {userID} number is the ID of the user in which a new game is going to be added
	 * @param {game} string is the name of the game which will be added
	 */
	addGame(userID, game){
		const userList = this.getUserObjectList();
		for(let i = 0; i < userList.length; i++){
			if(userList[i].getID() === userID && !(userList[i].getBoardgames().includes(game))){
				//check if the game is already a key in the hashmap. If so --> just add it to boardgame list. If not --> add it to all ratings
				//check in globalGameList if game exists --> if so: only add to list of player --> else: add to rating list of everyone
				if(!this.checkIfGameExists(game, userList)){
					//Add to Rating of everyone
				}
				userList[i].addBoardgameToList([game]);
				this.saveUserObjectList(userList);
				break;
			}
		}
		this.updateGlobalGameList()
	}

	/**
	 * @returns gameList as Json Obect list
	 */
	getGamesList(){
		return JSON.parse(localStorage.getItem('gameList'));
	}

	/**
	 * @description: extracts every game from every user and creates global Game list
	 */
	getGamesObjectList(){
		let userList = this.getUserObjectList();
		let gameObjects = []
		let gameNames = []
		for(let i = 0; i < userList.length; i++){
			let games = userList[i].getBoardgames();
			for(let j = 0; j < games.length; j++){
				if(!gameNames.includes(games[j])){
					gameNames.push(games[j]);
					let temp = new Boardgame(games[j]);
					gameObjects.push(temp);
				}
			}
		}
		return gameObjects;
		localStorage.setItem('gameList', JSON.stringify(gameObjects));
	}

	/**
	 * @returns List of Player Objects
	 */
	getUserObjectList(){
		let list = this.getUserList();
		let objectList = [];
		for(let i = 0; i < list.length; i++){
			let a = new Player(list[i].name, list[i].boardgames, list[i].id);
			a.setVeto(list[i].usedVeto);
			a.setBoardgameList(a.getBoardgames(), this.transformStringToHash(list[i].ratingHashmap));
			objectList.push(a)
		}
		return objectList;
		//returned Userliste, aber die elemente sind Instanzen von Player
	}

	/**
	 * @returns a JSON Object of the user storage 
	 */
	getUserList(){
		return JSON.parse(localStorage.getItem('users'));
	}

	saveUserObjectList(list){
		for(let i = 0; i < list.length; i++){
			let map = this.transformHashToString(list[i].getRating());
			list[i].setBoardgameList(list[i].getBoardgames(), map);
		}
		
		localStorage.setItem('users', JSON.stringify(list));
	}

	/**
	 * @description adds user to the global user list
	 * @param {userName} string is the name of the new user
	 * @param {gameArr} array is an array with the games the new user has 
	 */
	addUser(userName, gameArr){
		let userList = this.getUserObjectList();
		let userObject = new Player(userName, gameArr, this.generateUserID());
		userList.push(userObject);
		this.saveUserObjectList(userList);
	}

	/**
	 * @description generates a userid and returns it
	 * @returns a new random userID (0-99)
	 */
	generateUserID() {
		let userIDS = JSON.parse(localStorage.getItem('userIds'))
		let id = Math.trunc(Math.floor(Math.random() * 99));
		while(userIDS.includes(id)){
			id = Math.random() * 9999;
		} 
		userIDS.push(id)
		localStorage.setItem("userIds", JSON.stringify(userIDS))
		return id;
	}

	/**
	* @description searches thorugh given array and filters out duplicates
	* @param arr is a random array
	* @returns array without duplicates
	*/
	searchDuplicates(arr){
		let filteredArr = [];
		for(let i = 0; i < arr.length; i++){
			if(!filteredArr.includes(arr[i]) && arr[i] !== "|"){
				filteredArr.push(arr[i])
			}
		}
		return filteredArr;
	}

	/**
	 * @description receives a nested array with user data which is then saved to the global user list
	 * @param users a nested list of the users and the game of the users 
	 */
	saveUserData(users) {
		let userList = [];
		let gameArr = [];
		let row = 1;

		for(let i = 0; i < users[0].length; i++){
			let name = users[0][i];
			while(row < users.length){
				let game = users[row][i];
				if(game !== '' && game !== "|"){
					gameArr.push(game)
				}
				row++;
			}
			//gameArr = this.searchDuplicates(gameArr);
			let id = this.generateUserID()
			let player = new Player(name, gameArr, id);
			userList.push(player);
			gameArr = [];
			row = 1
		}
		this.saveUserObjectList(userList);
	}

	/**
	* @desription receives the data from a csv file as a string and parses it into an array
	* @param 
	* @returns the row from the nested array
	*/
	parseLine(array){
		let currentRow = [];
		let currentWord = "";
		for(let j = 0; j <= array.length; j++){
			if(array[j] === ";"){
				if(currentWord === ""){
					currentRow.push("|");
				}
				else{
					currentRow.push(currentWord);
					currentWord = ""
				}
			}
			else if((array[j]+array[j+1]) === "\r" || array[j] === ""){
				if(currentWord === ""){
					currentRow.push("|");
				}
				else{
					currentRow.push(currentWord);
					currentWord = ""
				}
			}
				else if(j === array.length){
					if(currentWord !== ""){
						currentWord = currentWord.trim()
						if(currentWord === ""){
							currentWord = "|"
						}
						currentRow.push(currentWord)
					}
					else{
						currentRow.push("|")
					}
				}
			else{
				currentWord = currentWord + array[j]
			}
		}
		return currentRow
	}
	
	/**  
	 *  @description takes the file path of the import file and extracts the data from a .csv file
	 */
	importCSV() {
	let filePath = `DataImport//${this.fileName}`;
		fs.readFile(filePath, 'utf-8', (err,data) => {
			if(err) {console.log('File not found!'); return;}
			let dataArray = data.split("\n");
			
			let currentRow = []
			let importedData = []
			let currentWord = ""

			for(let i = 0; i < dataArray.length; i++){
				if(dataArray[i] !== '' && dataArray[i].includes(';') && dataArray[i] !== undefined){
					importedData.push(this.parseLine(dataArray[i], i));
				}
			}
			this.saveUserData(importedData);
		})
	}

	/**
	 *  @description takes the file path of the import file and extracts the data from a .xlsx file
	 */
	importEXCEL() {
		console.log("importing EXCEL")
	}

	/**  
	 *  @description checks the ending of the file name of the import 
	 */
	checkFilename(){
		const fileType = this.fileName.slice(-4)
		if(fileType[0] === "."){
			if(fileType.slice(-3) === "csv"){
			this.importCSV()
			}
			else{
			console.log("Unknown Dataformat")
			}
		}
		else{
			console.log("FormattingError: There was a mistake while checkinf the datatype")
		}
	}
}
exports.DataHandler = DataHandler;
