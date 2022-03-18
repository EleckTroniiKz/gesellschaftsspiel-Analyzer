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
    /*
    For every player in userList this loop gets the ratings from the hashmap and writes
    it into the data string in CSV format
    */
   for(let index = 0;index < this.userList.length;index++){
     //header for each player
     data += `Rating von ${this.userList[index].getName()};\n\n`;
     data += "Game;Rating\n";
     
     let map = this.userList[index].getRating();
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
   data += "Average Rating for each Game;\n\n";
   data += "Game;Rating\n";
   
    //Hier alle Games und Ratings ausgeben
   
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
     }
                 );


   } else{
     //without date in filename
     console.log("Creating CSV file");
     fs.writeFile(`.//DataExport//${name}.csv`,data, (err) => {
       if (err) throw err;
       console.log("Export Completed!");
     }
                 );
   }
 }
}

//Export
exports.Export = Export;