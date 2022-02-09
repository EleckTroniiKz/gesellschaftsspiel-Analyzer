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

	saveUserData(users) {
		let userList = [];
		let gameArr = [];
		let row = 1;
		for(let i = 0; i < users[0].length; i++){
			let name = users[0][i];
			while(row < users.length){
				let game = users[row][i];
				if(game !== ''){
					gameArr.push(game)
				}
				row++;
			}
			let userObject = {uID: this.generateUserID(), name: name, games: gameArr}
			userList.push(userObject);
			gameArr = [];
			row = 1
		}
		localStorage.setItem('users', JSON.stringify(userList));
	}
	
  /**  
   *  extracts data from .csv file and saves it in storage.json
  */
  importCSV() {
    let filePath = `DataImport//${this.fileName}`;
		fs.readFile(filePath, 'utf-8', (err,data) => {
			if(err) console.log('File not found!')
			let dataArray = data.replace(/(\r\n|\n|\r)/gm, ';;').split(";");
			let currentRow = []
			let importedData = []

			for(let i = 0; i < dataArray.length; i++){
				if(dataArray[i] !== ''){
					currentRow.push(dataArray[i]);
				}
				else if(dataArray[i] === '' && dataArray[i+1] === ''){
					importedData.push(currentRow);
					break;
				}
				else{
					if(currentRow !== []){
						importedData.push(currentRow);
						currentRow = []
					}
				}
			}
			this.saveUserData(importedData);
		})
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

exports.fileImport = fileImport;