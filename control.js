var term = require( 'terminal-kit' ).terminal ;
//TEST

const mainMenu = [
                    "Exit",
                    "Import Mode",
                    "Application Mode",
                    "Management Mode",
                    "Export Mode"]
const managementModeMenu = [
                       "Back to Main Menu",
                       "Player settings",
                       "Game settings"]

const applicationModeMenu = [
                    "Back to Main Menu",
                    "Start Game"
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

	term(`>MainMenu<\n`) ;
	term(`Please select a mode.\n`)

  const response = await term.singleColumnMenu( mainMenu ).promise;
  const selectedText = await response.selectedText;
  selectedIndex = await response.selectedIndex;
  term( '\n' ).green("Selected:", selectedText); 
  console.log();
	console.log("THIS INDEX SHOULD GO OUT: " + selectedIndex);
  
	return selectedIndex;
}
  
async postManagementMode() {

  let selectedIndex;

  await console.clear()

	term(`>Management Mode<\n`) ;
	term(`Please select a mode.\n`);
  
  const response = await term.singleColumnMenu( managementModeMenu ).promise;
  const selectedText = await response.selectedText;
  selectedIndex = await response.selectedIndex;
  term( '\n' ).green("Selected:", selectedText);
  console.log();
	console.log("THIS INDEX SHOULD GO OUT: " + selectedIndex);
  
	return selectedIndex;

}

async postApplicationMode() {

  let selectedIndex;

  await console.clear()

	term(`>Application Mode<\n`) ;
	term(`Please select a mode.\n`)

  const response = await term.singleColumnMenu( applicationModeMenu ).promise;
  const selectedText = await response.selectedText;
  selectedIndex = await response.selectedIndex;
  term( '\n' ).green("Selected:", selectedText);
  console.log();
	console.log("THIS INDEX SHOULD GO OUT: " + selectedIndex)
  
	return selectedIndex;

}

}


exports.Control = Control