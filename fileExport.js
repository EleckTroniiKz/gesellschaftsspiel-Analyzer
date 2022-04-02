const {Boardgame, Player, Gamesnight} = require("./applicationMode");
const {DataHandler} = require('./dataHandler');
const {Control} = require("./control");

const LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./DataStorage/storage');
const fs = require('fs');

/*
@description This class contains all Methods required to export a file in CSV format
*/

class Export{
	constructor() {
		this.session = new DataHandler('dos.csv');
		this.userList = this.session.getUserObjectList();
	}

  /*
  @description This method creates a string formatted in CSV, which contains data about
               the rating of each game for each player
  @return type = string
      This method returns the rating of each game for each player
      formatted in CSV, basically the data for the export file
  */
	
 setPlayerRatingCSV() {
   //Initialize empty data string so you can append data with +=
   let data = "";
   let userList = this.session.getUserObjectList();
   for(let i = 0; i < userList.length; i++){
    data += `User: ${userList[i].getName()}\n`
    data += "Game;Rating\n";
     
     let map = userList[i].getRating();
     let k = Array.from(map.keys());

     //content
     for(let key = 0; key < k.length; key++){
       data += `${k[key]};${map.get(k[key])}\n`;
     }
     //last line
     data += "\n";
  }
   return data;
}

  setMostPlayedCSV(){
    let data = "\n";
    let mostPlayed = this.session.getPlayedGamesMap();
    let games = Array.from(mostPlayed.keys());
    data += `Most played games \n 1.Place: ${games[games.length-1]}\n2.Place: ${games[games.length-2]}\n3.Place: ${games[games.length-3]}`;
    return data;
  }

  setBestRatedCSV(){
    let data = "\n";
    let gamesnight = this.session.getGamesNightObject();
    data += "Top 3 Games\n"
    let ratings = gamesnight.getRating();
    let ratingKeys = Array.from(ratings.keys())
    data += `1. Place: ${ratingKeys[ratingKeys.length-1]} with a rating of ${ratings.get(ratingKeys[ratingKeys.length-1])}\n`
    data += `2. Place: ${ratingKeys[ratingKeys.length-2]} with a rating of ${ratings.get(ratingKeys[ratingKeys.length-2])}\n`
    data += `3. Place: ${ratingKeys[ratingKeys.length-3]} with a rating of ${ratings.get(ratingKeys[ratingKeys.length-3])}\n`
    return data;
  }

  /*
  @description This method creates a string formatted in CSV, which contains data about
               the average of each game
  @return type = string
      This method returns the average rating for each game
      formatted in CSV, basically the data for the export file
  */

 setAvgRatingCSV(){
   //Initialize empty data string so you can append data with +=
   let data = "";
   data += "Average Rating for each Game;\n";
   data += "Game;Average Rating\n";
   
   let gameNight = this.session.getGamesNightObject();
   let ratingMap = gameNight.getRating();
   let vetoMap = gameNight.getVetoList();
   let games = Array.from(ratingMap.keys());
   for(let i = 0; i < games.length; i++){
     data += `${games[i]}; ${ratingMap.get(games[i])}; Has Veto -> ${vetoMap.get(games[i])}\n`;
  }
   return data;
  }

  /*
  @description This method combines the methods setPlayerRatingCSV and setAvgRatingCSV
  @return type = string | This method returns the full rating Export data formatted in
                          CSV
  */

  setExportData(){
    //Initialize empty data string so you can append data with +=
    let data = "";
    data += this.setPlayerRatingCSV();
    data += this.setAvgRatingCSV();
    data += this.setBestRatedCSV();
    data += this.setMostPlayedCSV();
    return data;
  }

  /*
  @param
  data: This parameter is required, it needs the data string that has to be formatted
        in CSV
  name: This parameter is for the name of the export file, default is set to export
  addDateToFile: Boolean value if the Date should be added to the Filename

  @description This method creates the export file inside DataExport
  */
 createExport(data,name = "export",addDateToFile = true){
   
   if(addDateToFile){

     let date = new Date();
     date = date.toLocaleDateString("en-US");
     let strDate = date.toString();
     strDate = strDate.replaceAll("/","_");
     
     //with date in filename     
     console.log("Creating CSV file");
     fs.writeFile(`.//DataExport//${name}_${strDate}.csv`,data, (err) => {
       if (err) throw err;
       console.log("Export Completed!");
       return;
     }
                 );

   } else{
     //without date in filename
     console.log("Creating CSV file");
     fs.writeFile(`.//DataExport//${name}.csv`,data, (err) => {
       if (err) throw err;
       console.log("Export Completed!");
       return;
     }
                 );
   }
 }
}

//Export
exports.Export = Export;
