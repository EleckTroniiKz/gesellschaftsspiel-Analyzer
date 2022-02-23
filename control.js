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


class Control {

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

	term(`>MainMenu<\n`) ;
	term(`Please select a mode.\n`)

  const response = await term.singleColumnMenu( mainMenu ).promise;
  const selectedText = await response.selectedText;
  selectedIndex = await response.selectedIndex;
  term( '\n' ).green("Selected: ", selectedText); 

	return selectedIndex;
}
  
async postManagementMode() {

  let selectedIndex;

  console.clear()

	term(`>Management Mode<\n`) ;
	term(`Please select a mode.\n`);
  
  const response = await term.singleColumnMenu( managementModeMenu ).promise;
  const selectedText = await response.selectedText;
  selectedIndex = await response.selectedIndex;
  term( '\n' ).green("Selected: ", selectedText);
	return selectedIndex;
}

async postApplicationMode() {

  let selectedIndex;

  console.clear()

	term(`>Application Mode<\n`) ;
	term(`Please select a mode.\n`)

  const response = await term.singleColumnMenu( applicationModeMenu ).promise;
  const selectedText = await response.selectedText;
  selectedIndex = await response.selectedIndex;
  term( '\n' ).green("Selected: ", selectedText);
  
	return selectedIndex;

}

async postManagePlayersMenu() {

  let selectedIndex;
  
  console.clear()

	term(`>Manage Players<\n`) ;
	term(`Please select an Option.\n`);
  
  const response = await term.singleColumnMenu( managePlayersMenu ).promise;
  const selectedText = await response.selectedText;
  selectedIndex = await response.selectedIndex;
  term( '\n' ).green("Selected: ", selectedText);
  
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

  

}

exports.Control = Control