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
    this.usedVeto = false;
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

  getVeto(){
    return this.usedVeto;
  }

  setVeto(val){
    this.usedVeto = val;
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

  setRatingMap(map){
    this.ratingHashmap = map;
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
    this.vetoHash = new Map();
    this.amountOfRatingsSetHashmap = new Map();
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
      for(let i = 0; i < this.boardgames.length; i++){
        this.amountOfRatingsSetHashmap.set(this.boardgames[i], 0);
        this.vetoHash.set(this.boardgames[i], false);
      }
      
    }
  }

  getVetoList(){
    return this.vetoHash;
  }

  setVetoList(map){
    this.vetoHash = map;
  }

  getPlayers() {
    return this.players;
    //think this would be better 
    /* if we return only the name, we have to iterate through the userList to find the user with that name and then do the operations. Just returning the oobject list is better imo
    */
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

  getAmountOfRatingsSetHashmap() {
    return this.amountOfRatingsSetHashmap;
  }

  setAmountOfRatingsSetHashmap(map) {
    this.amountOfRatingsSetHashmap = map;
  }

  calculateAverages(){
    for(let i = 0; i < this.boardgames.length; i++){
      let ratingSum = this.ratingHashmap.get(this.boardgames[i]);
      let ratingAmount = this.amountOfRatingsSetHashmap.get(this.boardgames[i]);
      this.ratingHashmap.set(this.boardgames[i], (ratingSum/ratingAmount));
    }
  }

  setRatingHashmap(map) {
    this.ratingHashmap = map;
  }

  setRating(boardgame, rating) {
    if(this.ratingHashmap.has(boardgame)) {
      if(this.ratingHashmap.get(boardgame) === "No rating asigned yet!") {
        this.ratingHashmap.set(boardgame, rating);
        let temp = this.amountOfRatingsSetHashmap.get(boardgame);
        this.amountOfRatingsSetHashmap.set(boardgame, temp + 1);
        
      } else {
        let temp = this.amountOfRatingsSetHashmap.get(boardgame);
        let ratingSum = (parseInt(this.ratingHashmap.get(boardgame)) + parseInt(rating));
        //let averageRating = (parseInt(this.ratingHashmap.get(boardgame)) + parseInt(rating)) / this.players.length;
        this.ratingHashmap.set(boardgame, ratingSum);
        this.amountOfRatingsSetHashmap.set(boardgame, temp + 1);
      }
    }
  }

  setVeto(game, val){
    //val should be boolean!
    this.vetoHash.set(game, val);
  }

  chooseBoardgame() {
    //TODO
    let highestRatedBoardgame = "";
    let highestRating = 0;
    for (let i = 0; i < this.getRating().length; i++) {
      highestRatedBoardgame = this.getBoardgames[i];
      highestRating = this.getRating().get(this.getBoardgames[i]);
      
    }
    if() {
      
    }
  }

  sortByRating(ratingHashmap) {
    for(let i = 0; i < ratingHashmap.length; i++) {
      //last i elements are already in place  
      for(let j = 0; j < ( ratingHashmap.length - i - 1 ) ; j++) {
        //checking if the item at present iteration 
        //is greater than the next iteration
        if(this.getRating().get(this.getBoardgames[j]) > this.getRating().get(this.getBoardgames[j + 1])) {
          //if the condition is true then swap them
          let temp = this.getRating().get(this.getBoardgames[j]);
          this.getRating().get(this.getBoardgames[j]) = this.getRating().get(this.getBoardgames[j + 1]);
          this.getRating().get(this.getBoardgames[j + 1]) = temp;
        }
      }
    }
    // Print the sorted array
    console.log(ratingHashmap);
  }
  
}
exports.Boardgame = Boardgame;
exports.Player = Player;
exports.Gamesnight = Gamesnight;
