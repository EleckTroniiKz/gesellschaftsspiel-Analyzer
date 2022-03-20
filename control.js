var term = require( 'terminal-kit' ).terminal ;
const fs = require('fs');
const {ITALIAN, GERMAN, ENGLISH, TURKISH} = require("./enums/enum.js")


//Arrays mit den Menüs

const ratingOptions = ["very good", "good", "not bad", "not so good", "bad"];

const mainMenu = [
                    "Exit",
                    "Import Mode",
                    "Application Mode",
                    "Management Mode",
                    "Export Mode"]

const managementModeMenu = [
                  	"Return to Main Menu",
                    "Player management",
                    "Game management",
					"Gamenight planning"]
const applicationModeMenu = [
					"Return to Main Menu",
					"Start Game"
]

const managePlayersMenu = [
                    "Return",
                    "Add Player",
                    "Edit Player",
                    "Delete Player"
]

const editPlayersMenu = [ //NicetoHave
										"Return",
										"Edit Name",
										"Edit Games"
]

const manageGamesMenu = [
                    "Return",
                    "Add Game",
                    "Edit Game",
                    "Delete Game"
]

const deleteGamesMenu = [
                    "Return",
                    "Delete Game from Player",
                    "Delete Game Globally"
]

const exportMenu = [
                    "Return",
                    "Create Export"
]

function terminate() {
	term.grabInput( false ) ;
	console.clear();
	console.log( "Program has been terminated" ) ;
	setTimeout( function() { process.exit() } , 100 ) ;
}

term.on( 'key' , function( name , matches , data ) {
	if ( name === 'CTRL_C' || name === 'ESCAPE' ) { terminate() ; }
});

class Control {

	constructor(){
		this.lastOption = "Main Menu"
		this.language = GERMAN;
	}

	setLanguage(language){
		this.language = language;
	}

	getLanguage(){
		return this.language;
	}

	postWelcome() {
	  console.log(`
	█───█─▄▀▀─█───▄▀▀─▄▀▀▄─█▄─▄█─▄▀▀
	█───█─█───█───█───█──█─█▀▄▀█─█──
	█───█─█▀▀─█───█───█──█─█─▀─█─█▀▀
	█▄█▄█─█───█───█───█──█─█───█─█──
	─▀─▀───▀▀──▀▀──▀▀──▀▀──▀───▀──▀▀\n`)
	}

	async languageSelectionMenu(){
		let selectedIndex;
		console.clear()

		let startIndex = mainMenu.indexOf(this.lastOption)
		
		if(startIndex === -1){
			startIndex = 0;
		}

		term(this.language.languageChangeHeader) ;
		term(this.language.languageChangeQuestion)
		const response = await term.singleColumnMenu( this.language.languages ,{selectedIndex: startIndex} ).promise;
		const selectedText = await response.selectedText;
		selectedIndex = await response.selectedIndex;
		term( '\n' ).green("Selected: ", selectedText); 
		
		this.lastOption = "Change Language"
	
		return selectedIndex;
	}
	
	async postMainMenu() {
	
	  	let selectedIndex;
		console.clear()

		let startIndex = mainMenu.indexOf(this.lastOption)
		
		if(startIndex === -1){
			startIndex = 0;
		}

		term(this.language.mainMenuHeader) ;
		term(this.language.mainMenuSelectTitle)
	
		const response = await term.singleColumnMenu( this.language.mainMenu ,{selectedIndex: startIndex} ).promise;
		const selectedText = await response.selectedText;
		selectedIndex = await response.selectedIndex;
		term( '\n' ).green("Selected: ", selectedText); 
		
		this.lastOption = "Main Menu"
	
		return selectedIndex;
	}
	  
	async postManagementMode() {
	
	  let selectedIndex;
	
	  console.clear()
	
		term(this.language.managementModeHeader) ;
		term(this.language.mainMenuSelectTitle);
	
		let startIndex = 0;
		
		startIndex = managementModeMenu.indexOf(this.lastOption)
		if(startIndex === -1){
			startIndex = 0;
		}
	  
	  const response = await term.singleColumnMenu( this.language.managementModeMenu, {selectedIndex: startIndex}  ).promise;
	  const selectedText = await response.selectedText;
	  selectedIndex = await response.selectedIndex;
	  term( '\n' ).green("Selected: ", selectedText);
	
		this.lastOption = "Management Mode"
		
		return selectedIndex;
	}
	
	async postApplicationMode() {
	
	  let selectedIndex;
	
	  console.clear()
	
		let startIndex = managementModeMenu.indexOf(this.lastOption)
		if(startIndex === -1){
			startIndex = 0;
		}
		
		term(this.language.applicationModeHeader) ;
		term(this.language.mainMenuSelectTitle)
	
	  const response = await term.singleColumnMenu( this.language.applicationModeMenu, {selectedIndex: startIndex} ).promise;
	  const selectedText = await response.selectedText;
	  selectedIndex = await response.selectedIndex;
	  term( '\n' ).green("Selected: ", selectedText);
	
		this.lastOption = "Application Mode"
		
		return selectedIndex;
	}
	
	async postManagePlayersMenu() {
	
	  let selectedIndex;
		
	  console.clear()
	
		term(this.language.managePlayersHeader) ;
		term(this.language.mainMenuSelectTitle);
	  
	  const response = await term.singleColumnMenu( this.language.managePlayersMenu).promise;
	  const selectedText = await response.selectedText;
	  selectedIndex = await response.selectedIndex;
	  term( '\n' ).green("Selected: ", selectedText);
		this.lastOption = "Player management"
	  
		return selectedIndex;
	}

	async setRating(playerName, gameName){
		let selectedIndex;
		console.clear();
		term(this.language.rateGamesHeader);
		
		term(`${this.language.rateGameQuestion(gameName, playerName)}\n`)

		const response = await term.singleColumnMenu( this.language.ratingOptions ).promise;
		selectedIndex = await response.selectedIndex;
		term('\n').green(this.language.ratingNoticeOutput(gameName, await response.selectedText));

		let choice = await this.decision(["Next game", "Change rating"], this.language.ratingNoticeOutput(gameName,this.language.ratingOptions[selectedIndex]), this.language.ratingValidationQuestion(gameName));
		if(choice === "Next game"){
			return selectedIndex;
		}
		else{
			this.setRating(playerName, gameName);
		}
	}
	
	//NicetoHave
	async postEditPlayersMenu() {
	
	  let selectedIndex;
	
	  console.clear()
	
		term(this.language.editPlayerHeader) ;
		term(this.language.mainMenuSelectTitle);
	  
	  const response = await term.singleColumnMenu( this.language.editPlayersMenu ).promise;
	  const selectedText = await response.selectedText;
	  selectedIndex = await response.selectedIndex;
	  term( '\n' ).green("Selected: ", selectedText);

		this.lastOption = "Player management"
		
		return selectedIndex;
	}
	
	async postManageGamesMenu() {
	
	  let selectedIndex;
	
	  console.clear()
	
		term(this.language.manageGamesHeader) ;
		term(this.language.mainMenuSelectTitle);
	  
	  const response = await term.singleColumnMenu( this.language.manageGamesMenu ).promise;
	  const selectedText = await response.selectedText;
	  selectedIndex = await response.selectedIndex;
	  term( '\n' ).green("Selected: ", selectedText);
	
		this.lastOption = "Game management";
		
		return selectedIndex;
	}
	
	async postDeleteGamesMenu() {
	
	  let selectedIndex;
	
	  console.clear()
	
		term(this.language.deleteGamesHeader) ;
		term(this.language.mainMenuSelectTitle);
	  
	  const response = await term.singleColumnMenu( this.language.deleteGamesMenu ).promise;
	  const selectedText = await response.selectedText;
	  selectedIndex = await response.selectedIndex;
	  term( '\n' ).green("Selected: ", selectedText);
	  
		return selectedIndex;
	}

	async postFileSelector() {

		console.clear();
		
		term(this.language.importModeHeader)
		term.cyan( this.language.chooseFileQuestion) ;

		let items = await fs.readdirSync('./DataImport', {withFileTypes: true}).map(d => d.name ) ;
			items.push('EXIT');
		const response = await term.gridMenu( items ).promise;
		const selectedText = await response.selectedText;
		const selectedIndex = await response.selectedIndex;
		term( '\n' ).green("Selected: ", selectedText);

		return selectedText;
	}

	async choosePlayer(userList) {
		let selectedIndex;
	
	  console.clear()
	
		term(this.language.choosePlayerHeader) ;
		term(this.language.choosePlayerQuestion);
	  
	  const response = await term.singleColumnMenu( userList ).promise;
	  const selectedText = await response.selectedText;
	  selectedIndex = await response.selectedIndex;
	  term( '\n' ).green("Selected: ", selectedText);
	  
		return selectedIndex;
	}

  	async chooseGame( gameList ) {
      
		let selectedIndex;
	
	  console.clear()
	
		term(this.language.chooseGameHeader) ;
		term(this.language.chooseGameQuestion);
	  
	  const response = await term.singleColumnMenu( gameList ).promise;
	  const selectedText = await response.selectedText;
	  selectedIndex = await response.selectedIndex;
	  term( '\n' ).green("Selected: ", selectedText);
	  
		return selectedIndex;
	}

	async decision(optionList, termTitle, question) {
		let selectedIndex;
	
	  	console.clear()
	
		term(`>${termTitle}<\n`) ;
		term(question + '\n');
	  
	  const response = await term.singleColumnMenu( optionList ).promise;
	  const selectedText = await response.selectedText;
	  
		return selectedText;
	}

	async confirm(confirmQuestion) {

			console.clear()
			term(this.language.confirmQuestionCreator(confirmQuestion,0));
			term.red(this.language.confirmQuestionCreator(confirmQuestion,1));
			term(this.language.confirmQuestionCreator(confirmQuestion,2))
			term.green(this.language.confirmQuestionCreator(confirmQuestion,3))
			const result = await term.yesOrNo( { yes: [ 'y' , 'ENTER' ] , no: [ 'n' ] }).promise;
		return result;
	}

	async addGameInput() {
		
		console.clear()
		term(this.language.addGameHeader);
		term.cyan(this.language.addGameQuestion)
		const gameName = await term.inputField().promise;
		if(gameName !== ""){
			return gameName;
		}
		else{
			this.addGameInput()
		}
	}

	async addPlayerInput() {
		console.clear()
		term(this.language.addPlayerHeader)
		term.cyan(this.language.addPlayerNameQuestion);
		const playerName = await term.inputField().promise;
		term.magenta(this.language.addPlayerGameQuestion)
		const gameList = await term.inputField().promise;
		let listString = gameList.slice(0, -1).split(',');
		
	}

  //Export
  async postExportMode() {
    let selectedIndex;
	
	  console.clear()
	
		term(this.language.exportModeHeader) ;
		term(this.language.mainMenuSelectTitle);
	  
	  const response = await term.singleColumnMenu( this.languages.exportMenu ).promise;
	  const selectedText = await response.selectedText;
	  selectedIndex = await response.selectedIndex;
	  term( '\n' ).green("Selected: ", selectedText);
		this.lastOption = "Export Mode";
	  
		return selectedIndex;
	}

  async addExportFileName() {
		console.clear();
		term(this.language.createExportHeader);
		term.cyan(this.language.createExportFileQuestion);
		const fileName = await term.inputField().promise;
    return fileName;
}
}
 

exports.Control = Control