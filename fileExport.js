const {Boardgame, Player, Gamesnight} = require("./applicationMode");
const {DataHandler} = require('./dataHandler');
const {Control} = require("./control");

const LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./DataStorage/storage');
const fs = require('fs');

class Export{
	/**
   * @description puts player names, games and rating values into string
   * @param session instance of DataHandler class 
   * @returns data string
   */
 setPlayerRatingCSV(session) {
   let data = "";
   let userList = session.getUserObjectList();
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

  /**
   * @description gets the most played games from localstorage and puts them into a string
   * @param session instance of DataHandler class 
   * @returns data string
   */
  setMostPlayedCSV(session){
    let data = "\n";
    let mostPlayed = session.getPlayedGamesMap();
    let games = Array.from(mostPlayed.keys());
    data += `Most played games \n 1.Place: ${games[games.length-1]}\n2.Place: ${games[games.length-2]}\n3.Place: ${games[games.length-3]}`;
    return data;
  }

  /**
   * @description gets the best rated games from localstorage (only from the same gamenight) and puts them into a string
   * @param session instance of DataHandler class 
   * @returns data string
   */
  setBestRatedCSV(session){
    let data = "\n";
    let gamesnight = session.getGamesNightObject();
    data += "Top 3 Games\n"
    let ratings = gamesnight.getRating();
    let ratingKeys = Array.from(ratings.keys())
    data += `1. Place: ${ratingKeys[ratingKeys.length-1]} with a rating of ${ratings.get(ratingKeys[ratingKeys.length-1])}\n`
    data += `2. Place: ${ratingKeys[ratingKeys.length-2]} with a rating of ${ratings.get(ratingKeys[ratingKeys.length-2])}\n`
    data += `3. Place: ${ratingKeys[ratingKeys.length-3]} with a rating of ${ratings.get(ratingKeys[ratingKeys.length-3])}\n`
    return data;
  }

  /**
   * @description puts the average rating for every game from the gamenight into datastring
   * @param session instance of DataHandler class  
   * @returns data string
   */
 setAvgRatingCSV(session){
   //Initialize empty data string so you can append data with +=
   let data = "";
   data += "Average Rating for each Game;\n";
   data += "Game;Average Rating\n";
   
   let gameNight = session.getGamesNightObject();
   let ratingMap = gameNight.getRating();
   let vetoMap = gameNight.getVetoList();
   let games = Array.from(ratingMap.keys());
   for(let i = 0; i < games.length; i++){
     data += `${games[i]}; ${ratingMap.get(games[i])}; Has Veto -> ${vetoMap.get(games[i])}\n`;
  }
   return data;
  }

/**
 * @description calls the functions to get all the data for the export
 * @param session instance of DataHandler class 
 * @returns data string
 */
  setExportData(session){
    //Initialize empty data string so you can append data with +=
    let data = "";
    data += this.setPlayerRatingCSV(session);
    data += this.setAvgRatingCSV(session);
    data += this.setBestRatedCSV(session);
    data += this.setMostPlayedCSV(session);
    return data;
  }

 /**
  * 
  * @param data data which will be written into the file
  * @param name name of file
  * @param addDateToFile determines of the file will have the creation date as a suffix 
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
