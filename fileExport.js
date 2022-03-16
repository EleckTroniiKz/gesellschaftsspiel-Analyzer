const {Boardgame, Player, Gamesnight} = require("./applicationMode");
const {DataHandler} = require('./dataHandler');
const {Control} = require("./control");

const LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./DataStorage/storage');
const fs = require('fs');

class Export{
	constructor() {
		this.session = new DataHandler('dos.csv');
		this.userList = this.session.getUserObjectList();
	}
	
	
 setPlayerRatingCSV() {
 let data = "";
  //Ich brauche alle Spieler und deren Games
  //dann brauch ich alle Ratings dazu

  //Für jeden Spieler
  for(let index = 0;index < this.userList.length;index++){
  
    data += `Rating von ${this.userList[index].getName()};\n\n`;
    data += "Game;Rating\n";
    
    //Hier alle Games und Ratings ausgeben
		let map = this.userList[index].getRating()
		let k = Array.from(map.keys());

		for(let key = 0; key < k.length; key++){
			
			data += `${k[key]};${map.get(k[key])}\n`
		}
		
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
