var term = require( 'terminal-kit' ).terminal ;
const fs = require('fs');

/*	Dieser Code-Snippet ist um die Dateien für den Import zu kriegen.
var files = fs.readdirSync('./DataImport', {withFileTypes: true});
console.log(files);
process.exit()*/
//TEST

//Arrays mit den Menüs

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
	}

	postWelcome() {
	  console.log(`
	█───█─▄▀▀─█───▄▀▀─▄▀▀▄─█▄─▄█─▄▀▀
	█───█─█───█───█───█──█─█▀▄▀█─█──
	█───█─█▀▀─█───█───█──█─█─▀─█─█▀▀
	█▄█▄█─█───█───█───█──█─█───█─█──
	─▀─▀───▀▀──▀▀──▀▀──▀▀──▀───▀──▀▀\n`)
	}
	
	async postMainMenu() {
	
	  	let selectedIndex;
		console.clear()

		let startIndex = mainMenu.indexOf(this.lastOption)
		if(startIndex === -1){
			startIndex = 0;
		}

		term(`>MainMenu<\n`) ;
		term(`Please select a mode.\n`)
	
		const response = await term.singleColumnMenu( mainMenu ,{selectedIndex: startIndex} ).promise;
		const selectedText = await response.selectedText;
		selectedIndex = await response.selectedIndex;
		term( '\n' ).green("Selected: ", selectedText); 
		
		this.lastOption = "Main Menu"
	
		return selectedIndex;
	}
	  
	async postManagementMode() {
	
	  let selectedIndex;
	
	  console.clear()
	
		term(`>Management Mode<\n`) ;
		term(`Please select a mode.\n`);
	
		let startIndex = 0;
		
		startIndex = managementModeMenu.indexOf(this.lastOption)
		if(startIndex === -1){
			startIndex = 0;
		}
	  
	  const response = await term.singleColumnMenu( managementModeMenu, {selectedIndex: startIndex}  ).promise;
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
		
		term(`>Application Mode<\n`) ;
		term(`Please select a mode.\n`)
	
	  const response = await term.singleColumnMenu( applicationModeMenu, {selectedIndex: startIndex} ).promise;
	  const selectedText = await response.selectedText;
	  selectedIndex = await response.selectedIndex;
	  term( '\n' ).green("Selected: ", selectedText);
	
		this.lastOption = "Application Mode"
		
		return selectedIndex;
	}
	
	async postManagePlayersMenu() {
	
	  let selectedIndex;
		
	  console.clear()
	
		term(`>Manage Players<\n`) ;
		term(`Please select an Option.\n`);
	  
	  const response = await term.singleColumnMenu( managePlayersMenu).promise;
	  const selectedText = await response.selectedText;
	  selectedIndex = await response.selectedIndex;
	  term( '\n' ).green("Selected: ", selectedText);
		this.lastOption = "Player management"
	  
		return selectedIndex;
	}
	
	//NicetoHave
	async postEditPlayersMenu() {
	
	  let selectedIndex;
	
	  console.clear()
	
		term(`>Edit Player<\n`) ;
		term(`Please select an Option.\n`);
	  
	  const response = await term.singleColumnMenu( editPlayersMenu ).promise;
	  const selectedText = await response.selectedText;
	  selectedIndex = await response.selectedIndex;
	  term( '\n' ).green("Selected: ", selectedText);
	  
		return selectedIndex;
	}
	
	async postManageGamesMenu() {
	
	  let selectedIndex;
	
	  console.clear()
	
		term(`>Manage Games<\n`) ;
		term(`Please select an Option.\n`);
	  
	  const response = await term.singleColumnMenu( manageGamesMenu ).promise;
	  const selectedText = await response.selectedText;
	  selectedIndex = await response.selectedIndex;
	  term( '\n' ).green("Selected: ", selectedText);
	
		this.lastOption = "Game management";
		
		return selectedIndex;
	}
	
	async postDeleteGamesMenu() {
	
	  let selectedIndex;
	
	  console.clear()
	
		term(`>Delete Games<\n`) ;
		term(`Please select an Option.\n`);
	  
	  const response = await term.singleColumnMenu( deleteGamesMenu ).promise;
	  const selectedText = await response.selectedText;
	  selectedIndex = await response.selectedIndex;
	  term( '\n' ).green("Selected: ", selectedText);
	  
		return selectedIndex;
	}

	async postFileSelector() {

		console.clear();
		
		term(`>Import Mode<\n`)
		term.cyan( 'Choose a file:\n' ) ;

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
	
		term(`>Choose Player<\n`) ;
		term(`Please select a Player.\n`);
	  
	  const response = await term.singleColumnMenu( userList ).promise;
	  const selectedText = await response.selectedText;
	  selectedIndex = await response.selectedIndex;
	  term( '\n' ).green("Selected: ", selectedText);
	  
		return selectedIndex;
	}

  	async chooseGame( gameList ) {
      
		let selectedIndex;
	
	  console.clear()
	
		term(`>Choose Game<\n`) ;
		term(`Please select a Game.\n`);
	  
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
		term(`${confirmQuestion} \n Insert`); term.red(` \"n\" to deny `); term(`or`);
		term.green(` \"y\" to confirm \n`);
		const result = await term.yesOrNo( { yes: [ 'y' , 'ENTER' ] , no: [ 'n' ] }).promise;
		return result;
	}

	async addGameInput() {
		
		console.clear()
		term('>Add Game<\n');
		term.cyan('Enter the game you want to add: ')
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
		term('>Add Player<\n')
		term.cyan('Enter the name of the player: ');
		const playerName = await term.inputField().promise;
		term.magenta(`\nEnter the games the player has. \n(Divide each game with a comma and if you're done, with a colon)\nExample: A,B,D,C; \n`)
		const gameList = await term.inputField().promise;
		let listString = gameList.slice(0, -1).split(',')
		
	}
}

exports.Control = Control