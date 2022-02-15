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
  constructor(name, boardgames) {
    this.name = name;
    if(!Array.isArray(boardgames)) {
      this.boardgames = [];
    } else {
      this.boardgames = [];
      for(let i = 0; i < boardgames.length; i++) {
        let boardgameobject = new Boardgame(boardgames[i]);
        this.boardgames.push(boardgameobject.getName());
      }
    }
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
  test() {
    let game = new Boardgame("Wizard");
    console.log();
  }
}
exports.Boardgame = Boardgame;
exports.Player = Player;