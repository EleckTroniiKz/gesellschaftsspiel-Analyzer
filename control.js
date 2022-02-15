var term = require( 'terminal-kit' ).terminal ;



const mainMenu = ["Exit","Import Mode","Application Mode", "Management Mode", "Export Mode"]
const managementModeMenu = ["Back to Main Menu", "Player settings", "Game settings"]

class Control {

postWelcome() {
  console.log(`
█───█─▄▀▀─█───▄▀▀─▄▀▀▄─█▄─▄█─▄▀▀
█───█─█───█───█───█──█─█▀▄▀█─█──
█───█─█▀▀─█───█───█──█─█─▀─█─█▀▀
█▄█▄█─█───█───█───█──█─█───█─█──
─▀─▀───▀▀──▀▀──▀▀──▀▀──▀───▀──▀▀`)
}

postMainMenu() {

/*console.log(`This is the Main Menue`);
console.log(`You can chose one of these Modes:\n`);

for(let i = 0; i<mainMenu.length;i++ ) {
console.log(`${mainMenu[i]} [${i}]`);
}
console.log();

let invalidInput = true;
while(invalidInput) {
let choice = prompt("Please enter the mode number");
if(choice )
}
*/
term.cyan( 'The hall is spacious. Someone lighted few chandeliers.\n' ) ;
term.cyan( 'There are doorways south and west.\n' ) ;

var items = [
	'a. Go south' ,
	'b. Go west' ,
	'c. Go back to the street'
] ;

term.singleColumnMenu( items , function( error , response ) {
	term( '\n' ).eraseLineAfter.green(
		"#%s selected: %s (%s,%s)\n" ,
		response.selectedIndex ,
		response.selectedText ,
		response.x ,
		response.y
	) ;
	process.exit() ;
} ) ;



}
  
}

exports.Control = Control