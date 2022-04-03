const fs = require("fs");
const LocalStorage = require("node-localstorage").LocalStorage;
const localStorage = new LocalStorage("./DataStorage/storage");
const { Boardgame, Player, Gamesnight } = require("./applicationMode");

class DataHandler {
  constructor(fileName) {
    this.fileName = fileName;
    this.userIDs = [];
  }

  /**
   * @param game: the game which will be deleted from every user
   * @description iterates through every palyer and removes the game from the list and ratings
   */
  deleteGameGlobally(game) {
    let userList = this.getUserObjectList();
    let currentPlayer;
    let currentGames = [];
    let updatedGames = [];
    let userListWithoutGame = [];
    for (let i = 0; i < userList.length; i++) {
      currentPlayer = userList[i];
      currentGames = currentPlayer.getBoardgames();

      if (currentGames.includes(game)) {
        for (let j = 0; j < currentGames.length; j++) {
          if (currentGames[j] !== game) {
            updatedGames.push(currentGames[j]);
          }
        }
        let map = currentPlayer.getRating();
        map.delete(game);
        currentPlayer.setBoardgameList(updatedGames, map);
      }
      userListWithoutGame.push(currentPlayer);
    }
    this.saveUserObjectList(userListWithoutGame);
  }

  /**
   * @description sets up localstorages if they do not exist yet
   */
  setUpLocalStorages() {
	  if(localStorage.getItem("userIds") !== null || localStorage.getItem("userIds") !== undefined || localStorage.getItem("userIds") !== ""){
		localStorage.setItem("userIds", JSON.stringify(this.userIDs));
	  }
    else{
      localStorage.setItem("userIds",[]);
    }
	  if(localStorage.getItem("gameList") !== null || localStorage.getItem("gameList") !== undefined || localStorage.getItem("gameList") !== ""){
		localStorage.setItem("gameList", JSON.stringify([]));
	  }
    else{
      localStorage.setItem("gameList",[]);
    }
	  if(localStorage.getItem("gamesnight") !== null || localStorage.getItem("gamesnight") !== undefined || localStorage.getItem("gamesnight") !== ""){
		localStorage.setItem("gamesnight", JSON.stringify(""));
	  }
    else{
      localStorage.setItem("gamenight",[]);
    }
  }

  /**
   * @description sorts a hashmap with bogosort. from lowest to highest
   * @param map map which should be sorted 
   * @returns sorted map
   */
  hashMapSorter(map) {
    let keys = Array.from(map.keys());
    let tempKeys = keys;
    let values = [];
    for (let i = 0; i < keys.length; i++) {
      values.push(map.get(keys[i]));
    }
    for (let k = 0; k < keys.length; k++) {
      for (let j = 0; j < keys.length - (k + 1); j++) {
        if (values[j] > values[j + 1]) {
          let a = values[j];
          let b = tempKeys[j];
          values[j] = values[j + 1];
          tempKeys[j] = tempKeys[j + 1];
          values[j + 1] = a;
          tempKeys[j + 1] = b;
        }
      }
    }
    let sortedMap = new Map();
    for (let i = 0; i < tempKeys.length; i++) {
      sortedMap.set(tempKeys[i], values[i]);
    }
    return sortedMap;
  }

  /**
   * @description takes the hashmap of how often a game has been chosen by matchmaking out of the local storage
   * @returns sorted hashmap
   */
  getPlayedGamesMap() {
    let chosenGames = this.transformStringToHash(
      localStorage.getItem("playedGames")
    );
    //chosenGames = this.hashMapSorter(chosenGames);
    return this.hashMapSorter(chosenGames);
  }

  /**
   * @description saves in the localstorage, how often a game has been chosen by matchmaking
   * @param game game which was chosen by matchmaking 
   */
  saveChosenGameIntoHashmap(game) {
    let ratingMap;
    if (localStorage.getItem("playedGames") === null || localStorage.getItem("playedGames") === undefined ||localStorage.getItem("playedGames") === "") {
      ratingMap = new Map();
      let games = this.getGamesObjectList();
      for (let i = 0; i < games.length; i++) {
        ratingMap.set(games[i].getName(), 0);
      }
      ratingMap.set(game, ratingMap.get(game) + 1);
      console.log("HESY")
    } else {
      ratingMap = this.transformStringToHash(
        localStorage.getItem("playedGames")
      );
      let keyList = Array.from(ratingMap.keys());
      if (keyList.includes(game)) {
        ratingMap.set(game, ratingMap.get(game) + 1);
      } else {
        ratingMap.set(game, 1);
      }
    }
    localStorage.setItem("playedGames", this.transformHashToString(ratingMap));
  }

  /**
   * @description saves the ratings into the global game list, if a gamenight has been played
   * @param gamesnight 
   */
  saveRatingsIntoGlobalGameList(gamesnight) {
    let ratings = gamesnight.getRating();
    let gameKeys = Array.from(ratings.keys());
    let gamesGlobal = JSON.parse(localStorage.getItem("gameList"));
    let gamesWithRatings = [];
    for (let i = 0; i < gamesGlobal.length; i++) {
      gamesWithRatings.push(new Boardgame(gamesGlobal[i].name));
      if (gameKeys.includes(gamesGlobal[i].name)) {
        gamesWithRatings[gamesWithRatings.length - 1].setRating(
          ratings.get(gamesGlobal[i].name)
        );
      }
    }
    localStorage.setItem("gameList", JSON.stringify(gamesWithRatings));
  }

  /**
   * @description iterates through every Player and saved their games into the global game list
   */
  updateGlobalGameList() {
    let userList = this.getUserObjectList();
    let gamesOfPlayer = [];
    let globalBoardGameNameList = [];
    let globalBoardGameObjectList = [];
    for (let i = 0; i < userList.length; i++) {
      gamesOfPlayer = userList[i].getBoardgames();
      for (let j = 0; j < gamesOfPlayer.length; j++) {
        if (!globalBoardGameNameList.includes(gamesOfPlayer[j])) {
          globalBoardGameNameList.push(gamesOfPlayer[j]);
          globalBoardGameObjectList.push(new Boardgame(gamesOfPlayer[j]));
        }
      }
    }
    localStorage.setItem("gameList", JSON.stringify(globalBoardGameObjectList));
  }

  /**
   * @description checks if a given game exists in a given list of Players
   * @param {String} game: the game which existence will be checked
   * @param {Array<Player>} userList: list of Player instances
   * @returns {boolean}
   */
  checkIfGameExists(game, userList) {
    for (let i = 0; i < userList.length; i++) {
      if (userList[i].getBoardgames().includes(game)) {
        return true;
      }
    }
    return false;
  }

  /**
   * @description Deletes user out of global user list and its games if there is not another player owning that game
   * @param userID is the ID of the user which is going to be deleted
   */
  deleteUser(userID) {
    let userList = this.getUserObjectList();
    let filteredList = [];
    let gamesFromDeletedUser = [];
    for (let i = 0; i < userList.length; i++) {
      if (userList[i].getID() !== userID) {
        userList[i].setBoardgameList(
          userList[i].getBoardgames(),
          this.transformHashToString(userList[i].getRating())
        );
        filteredList.push(userList[i]);
      } else {
        gamesFromDeletedUser = userList[i].getBoardgames();
      }
    }
    let vanish = [];
    for (let i = 0; i < gamesFromDeletedUser.length; i++) {
      //if another user doesn't own the game, the deleted user owned, then the game will be deleted out of the global game list
      if (!this.checkIfGameExists(gamesFromDeletedUser[i], filteredList)) {
        vanish.push(gamesFromDeletedUser[i]);
      }
    }
    if (vanish.length !== 0) {
      for (let i = 0; i < vanish.length; i++) {
        this.deleteGameGlobally(vanish[i]);
      }
    }
    localStorage.setItem("users", JSON.stringify(filteredList));
  }

  /**
   * @description parses a hashmap into an array string
   * @param {Map} hashMap: Hashmap which will be transformed into an Stringarray, so it can be saved and restored in the localStorage
   * @returns {JSONString}
   */
  transformHashToString(hashMap) {
    return JSON.stringify(Array.from(hashMap.entries()));
  }

  /**
   * @description parses an array string into a hashmap
   * @param {JSONString} stringArray: Turns the JSON.stringified Arraystring, to a hashMap
   * @returns {Map}
   */
  transformStringToHash(stringArray) {
    return new Map(JSON.parse(stringArray));
  }

  /**
   * @description Deletes a game out of the games list of a specific user
   * @param userID  is the ID of the user in which the game will be removed out of the users list.
   * @param game is the name of the game which will be deleted.
   */
  deleteGameFromUser(userID, game) {
    const userList = this.getUserObjectList();
    for (let i = 0; i < userList.length; i++) {
      if (
        userList[i].getID() === userID &&
        userList[i].getBoardgames().includes(game)
      ) {
        let games = userList[i].getBoardgames();
        let gameList = [];
        for (let j = 0; j < games.length; j++) {
          if (games[j] !== game) {
            gameList.push(games[j]);
          }
        }
        userList[i].setBoardgame(gameList);
		//if the user was the only player with that game, it has to be removed out of the global gameslist
        if (!this.checkIfGameExists(game, userList)) {
          this.deleteGameGlobally(game);
          break;
        } else {
          this.saveUserObjectList(userList);
          break;
        }
      }
    }
  }

  /**
   * @description parses a standard gamesnight object into a into JSON saveable object
   * @param gamesNight gamesNight Object which has to be saved
   */
  saveGamesNightObject(gamesNight) {
    gamesNight.setRatingHashmap(
      this.transformHashToString(gamesNight.getRating())
    );
    gamesNight.setAmountOfRatingsSetHashmap(
      this.transformHashToString(gamesNight.getAmountOfRatingsSetHashmap())
    );
    gamesNight.setVetoList(
      this.transformHashToString(gamesNight.getVetoList())
    );
    localStorage.setItem("gamesnight", JSON.stringify(gamesNight));
  }

  /**
   * @description extracts the gamesnight object from the localstorage
   * @returns instance of Gamesnight 
   */
  getGamesNightObject() {
    let unparsedGamesnight = JSON.parse(localStorage.getItem("gamesnight"));

    let playerObjectList = [];
    for (let i = 0; i < unparsedGamesnight.players.length; i++) {
      let name = unparsedGamesnight.players[i].name;
      let games = unparsedGamesnight.players[i].boardgames;
      let ratings = unparsedGamesnight.players[i].ratingHashmap;
      let id = unparsedGamesnight.players[i].id;
      let player = new Player(name, games, id);
      player.setVeto(unparsedGamesnight.players[i].usedVeto);
      if (Object.keys(ratings).length !== 0) {
        player.setRatingMap(this.transformStringToHash(ratings));
      }
      playerObjectList.push(player);
    }
    let gamesnight = new Gamesnight(playerObjectList);
    gamesnight.setRatingHashmap(
      this.transformStringToHash(unparsedGamesnight.ratingHashmap)
    );
    gamesnight.setAmountOfRatingsSetHashmap(
      this.transformStringToHash(unparsedGamesnight.amountOfRatingsSetHashmap)
    );
    gamesnight.setVetoList(
      this.transformStringToHash(unparsedGamesnight.vetoHash)
    );
    return gamesnight;
  }

  /**
   * @description adds game to the games list of an user
   * @param userID is the ID of the user in which a new game is going to be added
   * @param game is the name of the game which will be added
   */
  addGame(userID, game) {
    const userList = this.getUserObjectList();
    for (let i = 0; i < userList.length; i++) {
      if (
        userList[i].getID() === userID &&
        !userList[i].getBoardgames().includes(game)
      ) {
        let oldGames = userList[i].getBoardgames();
        oldGames.push(game);
        userList[i].addBoardgameToList(oldGames);
        this.saveUserObjectList(userList);
        break;
      }
    }
    this.updateGlobalGameList();
  }

  /**
   * @returns list made of game objects from local storage
   */
  getGamesList() {
    return JSON.parse(localStorage.getItem("gameList"));
  }

  /**
   * @description extracts every game from every user
   * @returns list of game objects
   */
  getGamesObjectList() {
    let userList = this.getUserObjectList();
    let gameObjects = [];
    let gameNames = [];
    for (let i = 0; i < userList.length; i++) {
      let games = userList[i].getBoardgames();
      for (let j = 0; j < games.length; j++) {
        if (!gameNames.includes(games[j])) {
          gameNames.push(games[j]);
          let temp = new Boardgame(games[j]);
          gameObjects.push(temp);
        }
      }
    }
    return gameObjects;
  }

  /**
   * @description parses the userobjects from the localStorage to instances of player
   * @returns List of Player Objects
   */
  getUserObjectList() {
    let objectList = []
    if(localStorage.getItem("users") !== ""){
      let list = JSON.parse(localStorage.getItem("users"));
      for (let i = 0; i < list.length; i++) {
        let a = new Player(list[i].name, list[i].boardgames, list[i].id);
        a.setVeto(list[i].usedVeto);
        a.setBoardgameList(
          a.getBoardgames(),
          this.transformStringToHash(list[i].ratingHashmap)
        );
        objectList.push(a);
      }
  
    }
    
    return objectList;
  }

  /**
   * @description receives an list of Playerobjects, and saves them into the localStorage
   * @param list list of Playerobjects
   */
  saveUserObjectList(list) {
    for (let i = 0; i < list.length; i++) {
      let map = this.transformHashToString(list[i].getRating());
      list[i].setBoardgameList(list[i].getBoardgames(), map);
    }

    localStorage.setItem("users", JSON.stringify(list));
    this.updateGlobalGameList();
  }

  /**
   * @description adds user to the global user list
   * @param userName is the name of the new user
   * @param gameArr is an array with the games the new user has
   */
  addUser(userName, gameArr) {
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
    let userIDS = []
    let id;
    if(localStorage.getItem("userIds") === "" || localStorage.getItem("userIds") === null || localStorage.getItem("userIds") === undefined){
      id = Math.trunc(Math.floor(Math.random() * 99));
      userIDS.push(id);
    }
    else{
      userIDS = JSON.parse(localStorage.getItem("userIds"));
      id = Math.trunc(Math.floor(Math.random() * 99));
      while(userIDS.includes(id)) {
        id = Math.random() * 9999;
      }
      userIDS.push(id);
    }
    localStorage.setItem("userIds", JSON.stringify(userIDS));
    return id;
  }

  /**
   * @description receives a nested array with user data which is then formatted into Player objects and then saved
   * @param users a nested list of the users and the game of the users
   */
  saveUserData(users) {
    let userList = [];
    let gameArr = [];
    let row = 1;

    for (let i = 0; i < users[0].length; i++) {
      let name = users[0][i];
      while (row < users.length) {
        let game = users[row][i];
        if (game !== "" && game !== "|") {
          gameArr.push(game);
        }
        row++;
      }
      let id = this.generateUserID();
      let player = new Player(name, gameArr, id);
      userList.push(player);
      gameArr = [];
      row = 1;
    }
    this.saveUserObjectList(userList);
  }

  /**
   * @description receives the data from a csv file as a string and parses it into an array per Line
   * @param array unparsed data from csv file
   * @returns the row from the nested array
   */
  parseLine(array) {
    let currentRow = [];
    let currentWord = "";
    for (let j = 0; j <= array.length; j++) {
      if (array[j] === ";") {
        if (currentWord === "") {
          currentRow.push("|");
        } else {
          currentRow.push(currentWord);
          currentWord = "";
        }
      } else if (array[j] + array[j + 1] === "\r" || array[j] === "") {
        if (currentWord === "") {
          currentRow.push("|");
        } else {
          currentRow.push(currentWord);
          currentWord = "";
        }
      } else if (j === array.length) {
        if (currentWord !== "") {
          currentWord = currentWord.trim();
          if (currentWord === "") {
            currentWord = "|";
          }
          currentRow.push(currentWord);
        } else {
          currentRow.push("|");
        }
      } else {
        currentWord = currentWord + array[j];
      }
    }
    return currentRow;
  }

  /**
   *  @description takes the file path of the import file and extracts the data from a .csv file
   */
  importCSV() {
    let filePath = `DataImport//${this.fileName}`;
    fs.readFile(filePath, "utf-8", (err, data) => {
      if (err) {
        console.log("File not found!");
        return;
      }
      let dataArray = data.split("\n");

      let importedData = [];

      for (let i = 0; i < dataArray.length; i++) {
        if (
          dataArray[i] !== "" &&
          dataArray[i].includes(";") &&
          dataArray[i] !== undefined
        ) {
          importedData.push(this.parseLine(dataArray[i], i));
        }
      }
      this.saveUserData(importedData);
    });
  }

  /**
   *  @description checks the ending of the file name of the import
   */
  checkFilename() {
    const fileType = this.fileName.slice(-4);
    if (fileType[0] === ".") {
      if (fileType.slice(-3) === "csv") {
        this.importCSV();
      } else {
        console.log("Unknown Dataformat");
      }
    } else {
      console.log(
        "FormattingError: There was a mistake while checkinf the datatype"
      );
    }
  }
}

exports.DataHandler = DataHandler;
