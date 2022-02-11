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
exports.Boardgame = Boardgame;