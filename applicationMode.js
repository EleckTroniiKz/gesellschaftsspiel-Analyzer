class Boardgame {
  constructor(name) {
    this.name = name;
  }
  getName() {
    return this.name;
  }
  getRating() {
    return this.rating;
  }
  setRating() {
    let temp = prompt("Rate " + this.getName() + " from 1 to 5: ");
    if(temp == 1 || temp == 2 || temp == 3 || temp == 4 || temp == 5) {
      this.rating = temp;
    } else {
      console.log("You rated " + this.getName() + " with an invalid value. Try again please.");
      this.setRating();
    }
  }
}

class Player {
  constructor(name, boardgames, id) {
    this.name = name;
    this.id = id;
    if(!Array.isArray(boardgames)) {
      this.boardgames = [];
    } else {
      this.boardgames = [];
      for(let i = 0; i < boardgames.length; i++) {
        let boardgameobject = new Boardgame(boardgames[i]);
        this.boardgames.push(boardgameobject.getName());
      }
    }
    this.ratingHashmap = new Map();
    for(let i = 0; i < this.boardgames.length; i++) {
      this.ratingHashmap.set(this.boardgames[i], "No rating asigned yet!");
    }
  }

  getID() {
    return this.id;
  }

  getName() {
    return this.name;
  }
  getBoardgames() {
    return this.boardgames;
  }
  addBoardgame(boardgamestring) {
    if(typeof(boardgamestring) === "string") {
      let boardgameobject = new Boardgame(boardgamestring);
      this.boardgames.push(boardgameobject.getName());
    } else {
      console.log("The boardgame value was invalid! No boardgame was added!");
    }
  }

  getRating() {
    return this.ratingHashmap;
  }
  setRating(boardgame) {
    if(this.ratingHashmap.has(boardgame)) {
      let temp = prompt("Rate " + boardgame + " from 1 to 5: ");
      if(temp == 1 || temp == 2 || temp == 3 || temp == 4 || temp == 5) {
        this.ratingHashmap.set(boardgame, temp);
      } else {
        console.log("You rated " + boardgame + " with an invalid value. Try again please.");
        this.setRating(boardgame);
      }
    }
  }
  
  createGamesnight() {
    let gamesnight = new Gamesnight(this);
  }
  test() {
    let game = new Boardgame("Wizard");
    console.log();
  }
}

class Gamesnight {
  constructor(players) {
    this.players = players;
    if(!Array.isArray(players)) {
      this.boardgames = [];
      console.log("Your player input was not an array!");
    } else {
      this.boardgames = [];
      //iterates through each player
      for(let i = 0; i < this.players.length; i++) {
        //iterates through the boardgames of each player
        for(let j = 0; j < this.players[i].getBoardgames().length; j++) {
          if(!this.boardgames.includes(this.players[i].getBoardgames()[j])) {
            this.boardgames.push(this.players[i].getBoardgames()[j]);
          }
        }
      }
    }
  }

  getPlayers() {
    let playerNames = [];
    for(let i = 0; i < this.players.length; i++) {
        playerNames.push(this.players[i].getName());
    }
    return playerNames;
  }
  getBoardgames() {
    return this.boardgames;
  }
  test() {
    console.log(this.players.getName());
  }
}
exports.Boardgame = Boardgame;
exports.Player = Player;
exports.Gamesnight = Gamesnight;