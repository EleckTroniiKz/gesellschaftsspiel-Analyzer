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
    let currentHighest = 0
    let currentHighestName = ""
    let highestRating = 0;
    let highestOfAll = "";
    let hasVeto = [];
    let iterations = 0;
    for (let i = 0; i < Array.from(this.ratingHashmap.keys()).length
    ; i++) {
      highestRatedBoardgame = this.boardgames[i];
      highestRating = this.ratingHashmap.get(this.boardgames[i]);
      if(highestRating > currentHighest){
        currentHighest = highestRating;
        currentHighestName = highestRatedBoardgame;
        highestOfAll = currentHighestName;
      }
    }
    if(this.vetoHash.get(currentHighestName)){
      while(iterations < 5){
        for(let i = 0; i < Array.from(this.ratingHashmap.keys()).length; i++){
          if(hasVeto.indexOf(this.boardgames[i]) === -1){
            if(this.ratingHashmap.get(this.boardgames[i]) > highestRating){
              currentHighest = this.ratingHashmap.get(this.boardgames[i]);
              currentHighestName = this.boardgames[i];
            }
          }
        }
        if(this.getVetoList().get(currentHighestName)){
          iterations++;
          hasVeto.push(currentHighestName);
        }
      }
      if(iterations === 5){
        let noVeto = [];
        let highestNoVetoValue = 0;
        let highestWithoutVeto = "";
        for(let i = 0; i < Array.from(this.vetoHash.keys()).length; i++){
          if(this.vetoHash.get(this.boardgames[i]) === false){
            noVeto.push(this.boardgames[i]);
          }
        }
        if(noVeto.length !== 0){
          for(let i = 0; i < noVeto.length; i++){
            if(this.ratingHashmap.get(noVeto[i]) > highestNoVetoValue){
              highestNoVetoValue = this.ratingHashmap.get(noVeto[i]);
              highestWithoutVeto = noVeto[i];
            }
          }
          return highestWithoutVeto;
        }
        else{
          return highestOfAll
        }
      }
      else{
        return currentHighestName;
      }
    }
    else{
      return currentHighestName;
    }
  }

  sortByRating() {
    let keys = Array.from(this.ratingHashmap.keys());;
    let newKeys = keys;
    let values = [];
    for(let i = 0; i < keys.length; i++){
      values.push(this.ratingHashmap.get(keys[i]));
    }
    for(let k = 0; k < keys.length; k++){
      for(let j = 0; j < keys.length - k-1; j++){
        if(values[j] > values[j+1]){
          let tempVal = values[j];
          let tempKey = newKeys[j];
          values[j] = values[j+1];
          newKeys[j] = newKeys[j+1];
          values[j+1] = tempVal;
          newKeys[j+1] = tempKey;
        }
      }
    }
    let newMap = new Map();
    for(let i = 0; i < newKeys.length; i++){
      newMap.set(newKeys[i], values[i]);
    }
    this.setRatingHashmap(newMap);
    // Print the sorted array
  }

  
}
exports.Boardgame = Boardgame;
exports.Player = Player;
exports.Gamesnight = Gamesnight;
