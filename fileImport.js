const fs = require('fs');
const LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./DataStorage/storage');

/**
 * this. ... works in fs.readfile only when the callback is an arrow function.
 */

//Mabye change json with localStorage
class fileImport {
  constructor(fileName){
    this.fileName = fileName;
    this.checkFilename()
    this.fileData = ""
    this.userIDs = []
  }

  /**  
   * @param data: extracted data from json file
   *  saves the data from the parameter in the class variable data. 
   *  had to be extracted into another method because of Promise
  */
  saveReadData(data){
    this.fileData = JSON.parse(data)
    console.log(this.fileData)
  }

  /**  
   * @param filepath: path of file in this project 
   *  extracts the data from the storage.json and saves it
  */ 
  getFileData(filepath){
    fs.readFile((filepath), (err, data) => {
      if(err){ 
        console.log("Couldn't Read File")
        this.saveReadData("No Data found")
      }
      else{
        let parsedData = data
        this.saveReadData(parsedData);
      }
    })
    
  }

  /**
   * 
   * generates UserIDs
   * @returns userID
   */
  generateUserID() {
    let id = Math.trunc(Math.floor(Math.random() * 9999));
    while(this.userIDs.includes(id)){
      id = Math.random() * 9999;
    } 
    this.userIDs.push(id)
    return id;
  }
  
  /**  
   *  extracts data from .csv file and saves it in storage.json
  */
  importCSV() {
    console.log("importing CSV")
    //idea --> IDK if all csv files are seperated by the same symbol but maybe define a function which first skims through the csv file and finds out what the seperator is
    let seperator = ";"
    let importFilePath = 'DataImport/' + this.fileName;
    fs.readFile(importFilePath, 'utf8', (err,data) => {
      if(err) {
        console.log("File not found!");
      }
      else{
        data = data.replace(/(\r\n|\n|\r)/gm, seperator+seperator).split(";");
        let dataArray = []
        let currentLine = []
        
        // loop through file and put elements into nested array
        for(let i = 0; i < data.length; i++){
          if(data[i] !== ''){
            currentLine.push(data[i])
          }
          else if(data[i] === '' && data[i+1] === ''){
            dataArray.push(currentLine);
            break;
          }
          else{
            if(currentLine !== []){
              dataArray.push(currentLine)
              currentLine = []
            }
          }
        } 

        let objectList = [];
        // read through element list form loop before and create a JSON object, which is then pushed into an object list
        for(let i = 0; i < dataArray[0].length; i++){
          let jsonObject = { uID: 0, name: '', games: []};
          let gameArray = [];
          let arrayLine = 0;
          while(arrayLine < dataArray.length){
            if(arrayLine === 0){
              jsonObject.name = dataArray[arrayLine][i];
              jsonObject.uID = this.generateUserID()
            }
            else{
              gameArray.push(dataArray[arrayLine][i]);
            }
            jsonObject.games = gameArray;
            arrayLine += 1;
          }
          objectList.push(jsonObject);
        }
        let nD = JSON.stringify(objectList)
        
        fs.writeFile('DataStorage/storage.json', nD, (err) => {
          if(err) console.log("Saving failed")
        });
      }
    });
    this.getFileData('DataStorage/storage.json')
  }

  /**  TODO
   *  extracts data from .xlsx file and saves it in storage.json
  */
  importEXCEL() {
    console.log("importing EXCEL")
  }

  /**  
   *  checks filetype and then determines, which filetype it has to call the according method
  */
  checkFilename(){
    const fileType = this.fileName.slice(-4)
    if(fileType[0] === "."){
      if(fileType.slice(-3) === "csv"){
        this.importCSV()
      }
      else{
        console.log("Unknown Dataformat")
      }
    }
    else{
      console.log("Wrong stripped")
    }
  }
}

var a = new fileImport('users1.csv')