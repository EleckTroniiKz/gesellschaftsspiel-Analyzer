/**
 * @description Boardgame Class
 * @param name Boardgame name
 * @param rating average rating value
 */
class Boardgame {
  constructor(name) {
    this.name = name;
    this.rating = null;
  }

  /**
   * @returns boardgame name
   */
  getName() {
    return this.name;
  }

  /**
   * @returns boardgame rating
   */
  getRating() {
    return this.rating;
  }

  /**
   * @description sets the ratingvalue of a boardgame
   * @param ratingValue
   */
  setRating(ratingValue) {
    this.rating = ratingValue;
  }
}

/**
 * @description Player class
 * @param name Playername
 * @param boardgames list of boardgames owned by player
 * @param id id of Player
 * @param ratingHashmap Hashmap with the ratings for every boardgame by the player
 * @param usedVeto determines if the one available veto has been used
 */
class Player {
  constructor(name, boardgames, id) {
    this.name = name;
    this.id = id;
    this.usedVeto = false;
    if (!Array.isArray(boardgames)) {
      this.boardgames = [];
    } else {
      this.boardgames = [];
      for (let i = 0; i < boardgames.length; i++) {
        let boardgameobject = new Boardgame(boardgames[i]);
        this.boardgames.push(boardgameobject.getName());
      }
    }
    this.ratingHashmap = new Map();
    for (let i = 0; i < this.boardgames.length; i++) {
      this.ratingHashmap.set(this.boardgames[i], "No rating asigned yet!");
    }
  }

  /**
   * @description changes name of a game in the list of a player
   * @param newName updated game name
   * @param oldName old game name
   */
  replaceGame(newName, oldName) {
    for (let i = 0; i < this.boardgames.length; i++) {
      if (this.boardgames[i] === oldName) {
        this.boardgames[i] = newName;
        this.ratingHashmap.set(newName, this.ratingHashmap.get(oldName));
        this.ratingHashmap.delete(oldName);
      }
    }
  }

  /**
   * @returns veto boolean
   */
  getVeto() {
    return this.usedVeto;
  }

  /**
   * @description sets if player used veto already
   * @param {*} val new boolean value
   */
  setVeto(val) {
    this.usedVeto = val;
  }

  /**
   * @returns id
   */
  getID() {
    return this.id;
  }

  /**
   * @returns Player name
   */
  getName() {
    return this.name;
  }

  /**
   * @description sets player name
   * @param name new Name of player
   */
  setName(name) {
    this.name = name;
  }

  /**
   * @returns list of boardgames from the player
   */
  getBoardgames() {
    return this.boardgames;
  }

  /**
   * @description adds new boardgame to boardgame list
   * @param boardgamestring name of new boardgame
   */
  addBoardgame(boardgamestring) {
    if (typeof boardgamestring === "string") {
      let boardgameobject = new Boardgame(boardgamestring);
      this.boardgames.push(boardgameobject.getName());
    } else {
      console.log("The boardgame value was invalid! No boardgame was added!");
    }
  }

  /**
   * @returns rating hashmap of player
   */
  getRating() {
    return this.ratingHashmap;
  }

  /**
   * @description sets rating value for boardgame
   * @param boardgame rated boardgame
   * @param rating ring for boardgame
   */
  setRating(boardgame, rating) {
    if (this.ratingHashmap.has(boardgame)) {
      this.ratingHashmap.set(boardgame, rating);
    }
  }

  /**
   * @description set the ratingmap
   * @param map
   */
  setRatingMap(map) {
    this.ratingHashmap = map;
  }

  /**
   * @description sets boardgamelist and ratinghashmap
   * @param boardgames list of boardgames
   * @param ratingHashmap hashmap with ratings for the games
   */
  setBoardgameList(boardgames, ratingHashmap) {
    this.boardgames = boardgames;
    this.ratingHashmap = ratingHashmap;
  }

  /**
   * @description replaces players boardgame list with new list
   * @param boardgames new boardgame list
   */
  setBoardgame(boardgames) {
    this.boardgames = boardgames;
  }

  /**
   * @description adds boardgames from a list to the  players boardgame list
   * @param boardgames list of new boardgames
   */
  addBoardgameToList(boardgames) {
    for (let i = 0; i < boardgames.length; i++) {
      if (!this.boardgames.includes(boardgames[i])) {
        this.boardgames.push(boardgames[i]);
        this.ratingHashmap.set(boardgames[i], "No rating asigned yet!");
      }
    }
  }
}

/**
 * @description Gamesnight class
 * @param players List of players that are
 * @param ratingHashmap hashmap with average ratings of the gamenight
 * @param vetoHash hashmap which displays on which game a veto has been used
 * @param amountOfRatingsSetHashmap hashmap with amount of ratings per game
 * @param boardgames list of boardgames
 */
class Gamesnight {
  constructor(players) {
    this.players = players;
    this.ratingHashmap = new Map();
    this.vetoHash = new Map();
    this.amountOfRatingsSetHashmap = new Map();
    if (!Array.isArray(players)) {
      this.boardgames = [];
      console.log("Your player input was not an array!");
    } else {
      this.boardgames = [];
      //iterates through each player
      for (let i = 0; i < this.players.length; i++) {
        //iterates through the boardgames of each player
        for (let j = 0; j < this.players[i].getBoardgames().length; j++) {
          if (!this.boardgames.includes(this.players[i].getBoardgames()[j])) {
            this.boardgames.push(this.players[i].getBoardgames()[j]);
          }
        }
        for (let j = 0; j < this.boardgames.length; j++) {
          this.ratingHashmap.set(this.boardgames[j], "No rating asigned yet!");
        }
      }
      for (let i = 0; i < this.players.length; i++) {
        this.players[i].addBoardgameToList(this.boardgames);
      }
      for (let i = 0; i < this.boardgames.length; i++) {
        this.amountOfRatingsSetHashmap.set(this.boardgames[i], 0);
        this.vetoHash.set(this.boardgames[i], false);
      }
    }
  }

  /**
   * @returns returns veto map
   */
  getVetoList() {
    return this.vetoHash;
  }

  /**
   * @param map
   * @description sets veto list with
   */
  setVetoList(map) {
    this.vetoHash = map;
  }

  /**
   * @returns list of player
   */
  getPlayers() {
    return this.players;
  }

  /**
   * @returns lsit of boardgames
   */
  getBoardgames() {
    return this.boardgames;
  }

  /**
   * @returns rating hashmap
   */
  getRating() {
    return this.ratingHashmap;
  }

  /**
   * @returns hashmap with rating amount
   */
  getAmountOfRatingsSetHashmap() {
    return this.amountOfRatingsSetHashmap;
  }

  /**
   * @param map
   * @description sets hashmap with amount of ratings per game
   */
  setAmountOfRatingsSetHashmap(map) {
    this.amountOfRatingsSetHashmap = map;
  }

  /**
   * @description calculates average ratings of the games from the gamesnight
   */
  calculateAverages() {
    for (let i = 0; i < this.boardgames.length; i++) {
      let ratingSum = this.ratingHashmap.get(this.boardgames[i]);
      let ratingAmount = this.amountOfRatingsSetHashmap.get(this.boardgames[i]);
      this.ratingHashmap.set(this.boardgames[i], ratingSum / ratingAmount);
    }
  }

  /**
   * @description a setter for the rating hashmap
   * @param map map which will be set as rating map for gamenight
   */
  setRatingHashmap(map) {
    this.ratingHashmap = map;
  }

  /**
   * @description increases rating value of a boardgame
   * @param boardgame boardgame which was rated
   * @param rating rating value
   */
  setRating(boardgame, rating) {
    if (this.ratingHashmap.has(boardgame)) {
      if (this.ratingHashmap.get(boardgame) === "No rating asigned yet!") {
        this.ratingHashmap.set(boardgame, rating);
        let temp = this.amountOfRatingsSetHashmap.get(boardgame);
        this.amountOfRatingsSetHashmap.set(boardgame, temp + 1);
      } else {
        let temp = this.amountOfRatingsSetHashmap.get(boardgame);
        let ratingSum =
          parseInt(this.ratingHashmap.get(boardgame)) + parseInt(rating);
        //let averageRating = (parseInt(this.ratingHashmap.get(boardgame)) + parseInt(rating)) / this.players.length;
        this.ratingHashmap.set(boardgame, ratingSum);
        this.amountOfRatingsSetHashmap.set(boardgame, temp + 1);
      }
    }
  }

  /**
   * @description sets if a veto was used for that game
   * @param game game where a veto was used
   * @param val true or false
   */
  setVeto(game, val) {
    //val should be boolean!
    this.vetoHash.set(game, val);
  }

  /**
   * @description calculated which boardgame was rated highest without veto and returns that game (matchmaking)
   * @returns chosen game
   */
  chooseBoardgame() {
    let ratingKeys = Array.from(this.ratingHashmap.keys());
    let index = ratingKeys.length - 1;
    let foundGame = false;
    while (!foundGame) {
      if (this.vetoHash.get(ratingKeys[index]) === false) {
        foundGame = true;
        return ratingKeys[index];
      } else {
        index--;
        if (index === -1) {
          foundGame = true;
          return ratingKeys[Array.from(this.ratingHashmap.keys()).length];
        }
      }
    }
  }
}
exports.Boardgame = Boardgame;
exports.Player = Player;
exports.Gamesnight = Gamesnight;
