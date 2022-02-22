var term = require( 'terminal-kit' ).terminal ;
//TEST

const mainMenu = [
                    "Exit",
                    "Import Mode",
                    "Application Mode",
                    "Management Mode",
                    "Export Mode"]
const managementModeMenu = ["Back to Main Menu", "Player settings", "Game settings"]

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
  let selectedIndex = 1;
	term(`>MainMenu<\n`) ;
	term(`Please select a mode.\n`)

	// term.singleColumnMenu( mainMenu ,( error , response )=> {
	// 	term( '\n' ).green("Selected: %s \n",response.selectedText); 
  //  	selectedIndex = response.selectedIndex;
	// 	console.log("THIS INDEX SHOULD GO OUT: " + response.selectedIndex)
	// });

  const response = await term.singleColumnMenu( mainMenu ).promise;
  const text = await response.selectedText;
  selectedIndex = await response.selectedIndex;
  term( '\n' ).green("Selected: %s \n", text); 
	console.log("THIS INDEX SHOULD GO OUT: " + selectedIndex)
  
	return selectedIndex;
}
  
postManagementMode() {

term(`>MainMenu<\n`) ;
term(`Please select a mode.\n`)

term.singleColumnMenu( mainMenu , function( error , response ) {
	term( '\n' ).eraseLineAfter.green(
		"Selected: %s \n" ,
		response.selectedText
	) 
} ) ;
}

}

exports.Control = Control