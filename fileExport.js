const {Boardgame, Player, Gamesnight} = require("./applicationMode");
const {DataHandler} = require('./dataHandler');
const {Control} = require("./control");

const LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./DataStorage/storage');
const fs = require('fs');

let UserList = JSON.parse(localStorage.getItem('users'))

class Export{
 setPlayerRatingCSV() {
 let data = "";
  //Ich brauche alle Spieler und deren Games
  //dann brauch ich alle Ratings dazu

  //Für jeden Spieler
  for(let index = 0;index < UserList.length;index++){
  
    data += `Rating von ${UserList[index].name};\n\n`;
    console.log(index)
    data += "Game;Rating\n";
    //Hier alle Games und Ratings ausgeben
    
    //Letzte Line vor neuem Spieler
    data += "\n";
    
  }
   return data;
}

 setGameAvgCSV(){
   let data = "";
    data += "Average Rating for each Game;\n\n";
    data += "Game;Rating\n";
    //Hier alle Games und Ratings ausgeben
   
    return data;
  }

  

 createCSV(data,name = "export"){
   
   console.log("Creating CSV file");
   let date = new Date();
   date = date.toLocaleDateString("en-US")
   let strDate = date.toString();
   strDate = strDate.replaceAll("/","_")

   
   
   fs.writeFile(`.//DataExport//${name}_${strDate}.csv`,data, (err) => {
     if (err) throw err;
     console.log("Export Completed!");
    }
    );
  }
}

exports.Export = Export;
