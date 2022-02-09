const fs = require('fs');
const LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./DataStorage/storage');

class fileImport {
	constructor(fileName){
		this.fileName = fileName;
		this.fileData = ""
		this.userIDs = []
	}

	/**
	 * @description Deletes user out of global user list
	 * @param {userID} number  is the ID of the user which is going to be deleted 
	 */
	deleteUser(userID){
		let userList = this.getUserList();
		let filteredUsers = userList.filter((value) => {
			if(value.uID !== userID){
				return value;
				}
			})
		localStorage.setItem('users', JSON.stringify(filteredUsers))
	}

	/**
	 * @description Deletes a game out of the games list of a specific user
	 * @param {userID} number  is the ID of the user in which the game will be removed out of the users list.
	 * @param {game} string is the name of the game which will be deleted.  
	 */
	deleteGame(userID, game){
		const userList = this.getUserList();
		for(let i = 0; i < userList.length; i++){
			if(userList[i].uID === userID && userList[i].games.includes(game)){
				let filteredGames = userList[i].games.filter((value) => {if(value !== game) return value})
				userList[i].games = filteredGames;
				localStorage.setItem('users', JSON.stringify(userList))
			}
		}
	}

	/**
	 * @description adds game to the games list of an user
	 * @param {userID} number is the ID of the user in which a new game is going to be added
	 * @param {game} string is the name of the game which will be added
	 */
	addGame(userID, game){
		const userList = this.getUserList();
		for(let i = 0; i < userList.length; i++){
			if(userList[i].uID === userID && !(userList[i].games.includes(game))){				
				userList[i].games.push(game)
				localStorage.setItem('users', JSON.stringify(userList))
			}
		}
	}

	/**
	 * @returns a JSON Object of the user storage 
	 */
	getUserList(){
		return JSON.parse(localStorage.getItem('users'));
	}

	/**
	 * @description adds user to the global user list
	 * @param {userName} string is the name of the new user
	 * @param {gameArr} array is an array with the games the new user has 
	 */
	addUser(userName, gameArr){
		let userList = this.getUserList();
		let userObject = {uID: this.generateUserID(), name: userName, games: gameArr}
		userList.push(userObject);
		localStorage.setItem('users', JSON.stringify(userList))
	}

	/**
	 * @description generates a userid and returns it
	 * @returns a new random userID (0-99)
	 */
	generateUserID() {
	let id = Math.trunc(Math.floor(Math.random() * 99));
	while(this.userIDs.includes(id)){
		id = Math.random() * 9999;
	} 
	this.userIDs.push(id)
	return id;
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
				if(game !== ''){
					gameArr.push(game)
				}
				row++;
			}
			let userObject = {uID: this.generateUserID(), name: name, games: gameArr}
			userList.push(userObject);
			gameArr = [];
			row = 1
		}
		localStorage.setItem('users', JSON.stringify(userList));
	}
	
	/**  
	 *  @description takes the file path of the import file and extracts the data from a .csv file
	 */
	importCSV() {
	let filePath = `DataImport//${this.fileName}`;
		fs.readFile(filePath, 'utf-8', (err,data) => {
			if(err) console.log('File not found!')
			let dataArray = data.replace(/(\r\n|\n|\r)/gm, ';;').split(";");
			let currentRow = []
			let importedData = []

			for(let i = 0; i < dataArray.length; i++){
				if(dataArray[i] !== ''){
					currentRow.push(dataArray[i]);
				}
				else if(dataArray[i] === '' && dataArray[i+1] === ''){
					importedData.push(currentRow);
					break;
				}
				else{
					if(currentRow !== []){
						importedData.push(currentRow);
						currentRow = []
					}
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

exports.fileImport = fileImport;