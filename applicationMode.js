class Boardgame {
  constructor(name) {
    this.name = name;
    this.rating = null;
  }
  getName() {
    return this.name;
  }
  getRating() {
    return this.rating;
  }
  
  setRating(ratingValue) {
    this.rating = ratingValue
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

  setRating(boardgame, rating) {
    if(this.ratingHashmap.has(boardgame)) {
      this.ratingHashmap.set(boardgame, rating);
    }
  }

  setBoardgameList(boardgames, ratingHashmap) {
    this.boardgames = boardgames;
    this.ratingHashmap = ratingHashmap;
  }

  setBoardgame(boardgames){
    this.boardgames = boardgames;
  }

  addBoardgameToList(boardgames) {
    for(let i = 0; i < boardgames.length; i++) {
      if(!this.boardgames.includes(boardgames[i])) {
        this.boardgames.push(boardgames[i]);
        this.ratingHashmap.set(boardgames[i], "No rating asigned yet!");
      }
    }
  }
  
}

class Gamesnight {
  constructor(players) {
    this.players = players;
    this.ratingHashmap = new Map();
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
        for(let j = 0; j < this.boardgames.length; j++) {
          this.ratingHashmap.set(this.boardgames[j], "No rating asigned yet!");
        }
        //this.players[i].setBoardgameList(this.boardgames, this.ratingHashmap);
        
      }
      for(let i = 0; i < this.players.length; i++) {
        this.players[i].addBoardgameToList(this.boardgames);  
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
  
  getRating() {
    return this.ratingHashmap;
  }
  
  setRating(boardgame, rating) {
    if(this.ratingHashmap.has(boardgame)) {
      if(this.ratingHashmap.get(boardgame) === "No rating asigned yet!") {
        this.ratingHashmap.set(boardgame, rating);
      } else {
        let averageRating = (parseInt(this.ratingHashmap.get(boardgame)) + parseInt(rating)) / this.players.length;
        this.ratingHashmap.set(boardgame, averageRating);  
      }
    }
  }
}
exports.Boardgame = Boardgame;
exports.Player = Player;
exports.Gamesnight = Gamesnight;
