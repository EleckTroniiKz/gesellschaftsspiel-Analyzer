var term = require("terminal-kit").terminal;
const fs = require("fs");
const { Player } = require("./applicationMode.js");
const { ITALIAN, GERMAN, ENGLISH, TURKISH } = require("./enums/enum.js");

//Arrays mit den Menüs

let setveto = false;

const mainMenu = [
  "Exit",
  "Set Language",
  "Import Mode",
  "Application Mode",
  "Management Mode",
  "Export Mode",
]; 

const managementModeMenu = [
  "Return to Main Menu",
  "Player management",
  "Game management",
  "Gamenight planning",
  "Gameslist"
];
const applicationModeMenu = ["Return to Main Menu", "Start Game"];

const managePlayersMenu = [
  "Return",
  "Add Player",
  "Edit Player",
  "Delete Player",
];

const editPlayersMenu = [
  //NicetoHave
  "Return",
  "Edit Name",
  "Edit Games",
];

const manageGamesMenu = ["Return", "Add Game", "Edit Game", "Delete Game"];

const deleteGamesMenu = [
  "Return",
  "Delete Game from Player",
  "Delete Game Globally",
];

const exportMenu = ["Return", "Create Export"];

/**
 * @description onClick handler to terminate the code
 */
function terminate() {
  term.grabInput(false);
  console.clear();
  console.log("Program has been terminated");
  setTimeout(function () {
    process.exit();
  }, 100);
}

/**
 * @description mapping handler to keyboard keys
 */
term.on("key", function (name, matches, data) {
  if (name === "CTRL_C" || name === "ESCAPE") {
    terminate();
  }
});

/**
 * @params lastOption: last menu page which was visited (for nicetohave) 
 * @params language: contains the current language enums (german, turkish, english or italian)
 */
class Control {
  constructor() {
    this.lastOption = "Main Menu";
    this.language = GERMAN;
  }

  /**
   * @description sets new language enum
   * @param language language enum 
   */
  setLanguage(language) {
    this.language = language;
    this.lastOption = "Set Language";
  }

  /**
   * @description sets last visited menu option
   * @param opt last option 
   */
  setLastOption(opt) {
    this.lastOption = opt
  }

  /**
   * @returns current language value 
   */
  getLanguage() {
    return this.language;
  }

  /**
   * @description logs the welcome ascii art
   */
  postWelcome() {
    console.clear();
    console.log(`
	█───█─▄▀▀─█───▄▀▀─▄▀▀▄─█▄─▄█─▄▀▀
	█───█─█───█───█───█──█─█▀▄▀█─█──
	█───█─█▀▀─█───█───█──█─█─▀─█─█▀▀
	█▄█▄█─█───█───█───█──█─█───█─█──
	─▀─▀───▀▀──▀▀──▀▀──▀▀──▀───▀──▀▀\n`);
  }

  /**
   * @description posts selection menu for language select
   * @returns selectedindex of chosen menu item
   */
  async languageSelectionMenu() {
    let selectedIndex;
    console.clear();

    let startIndex = mainMenu.indexOf(this.lastOption);

    if (startIndex === -1) {
      startIndex = 0;
    }

    term(this.language.languageChangeHeader);
    term(this.language.languageChangeQuestion);
    const response = await term.singleColumnMenu(this.language.languages, {
      selectedIndex: startIndex,
    }).promise;
    const selectedText = await response.selectedText;
    selectedIndex = await response.selectedIndex;
    term("\n").green("Selected: ", selectedText);

    this.lastOption = "Change Language";

    return selectedIndex;
  }

  /**
   * @descriptions posts main menu
   * @returns selectedindex of chosen menu item
   */
  async postMainMenu() {
    let selectedIndex;
    console.clear();

    let startIndex = mainMenu.indexOf(this.lastOption);

    if (startIndex === -1) {
      startIndex = 0;
    }

    term(this.language.mainMenuHeader);
    term(this.language.mainMenuSelectTitle);

    const response = await term.singleColumnMenu(this.language.mainMenu, {
      selectedIndex: startIndex,
    }).promise;
    const selectedText = await response.selectedText;
    selectedIndex = await response.selectedIndex;
    term("\n").green("Selected: ", selectedText);

    this.lastOption = "Main Menu";

    return selectedIndex;
  }

  /**
   * @description posts management menu
   * @returns selectedindex of chosen menu item
   */
  async postManagementMode() {
    let selectedIndex;

    console.clear();

    term(this.language.managementModeHeader);
    term(this.language.mainMenuSelectTitle);

    let startIndex = 0;

    startIndex = managementModeMenu.indexOf(this.lastOption);
    if (startIndex === -1) {
      startIndex = 0;
    }

    const response = await term.singleColumnMenu(
      this.language.managementModeMenu,
      { selectedIndex: startIndex }
    ).promise;
    const selectedText = await response.selectedText;
    selectedIndex = await response.selectedIndex;
    term("\n").green("Selected: ", selectedText);

    this.lastOption = "Management Mode";

    return selectedIndex;
  }

  /**
   * @description posts application mode menu
   * @returns selectedindex of chosen menu item
   */
  async postApplicationMode() {
    let selectedIndex;
    let startIndex = managementModeMenu.indexOf(this.lastOption);
    if (startIndex === -1) {
      startIndex = 0;
    }

    console.clear();

    term(this.language.applicationModeHeader);
    term(this.language.mainMenuSelectTitle);

    const response = await term.singleColumnMenu(
      this.language.applicationModeMenu,
      { selectedIndex: startIndex }
    ).promise;
    const selectedText = await response.selectedText;
    selectedIndex = await response.selectedIndex;
    term("\n").green("Selected: ", selectedText);

    this.lastOption = "Application Mode";

    return selectedIndex;
  }

  /**
   * @description posts management players menu
   * @returns selectedindex of chosen menu item
   */
  async postManagePlayersMenu() {
    let selectedIndex;

    console.clear();

    term(this.language.managePlayersHeader);
    term(this.language.mainMenuSelectTitle);

    const response = await term.singleColumnMenu(
      this.language.managePlayersMenu
    ).promise;
    const selectedText = await response.selectedText;
    selectedIndex = await response.selectedIndex;
    term("\n").green("Selected: ", selectedText);
    this.lastOption = "Player management";

    return selectedIndex;
  }

  /**
   * @description posts the game rating confirmation
   * @param gameName
   * @param selectedIndex 
   * @param playerName 
   * @param usedVeto 
   * @returns array with 2 elements: selected index and veto
   */
  async ConfirmRating(gameName, selectedIndex, playerName, usedVeto) {
    let vetoState = "";
    console.clear();
    let choice;
    if(setveto){
      vetoState = "VETO RESET"
    }
    else{
      vetoState = "VETO SET"
    }
    if(usedVeto){
      choice = await this.decision(
        [this.language.nextGame, this.language.changeRating],
        this.language.ratingNoticeOutput(
          gameName,
          this.language.ratingOptions[selectedIndex]
        ),
        this.language.ratingValidationQuestion(gameName)
      );
    }
    else{
      choice = await this.decision(
        [this.language.nextGame, this.language.changeRating, vetoState],
        this.language.ratingNoticeOutput(
          gameName,
          this.language.ratingOptions[selectedIndex]
        ),
        this.language.ratingValidationQuestion(gameName)
      );
    }

    if(choice === this.language.nextGame){
      let veto = setveto;
      setveto = false;
      if(usedVeto){
        return [selectedIndex, false];
      }
      else{
        return [selectedIndex, veto];
      }
      
    }
    else if(choice === this.language.changeRating){
      return await this.setRating(playerName, gameName, usedVeto);
    }
    else{
      //setveto call this confirm Rating again
      if(setveto){
        setveto = false;
        return await this.ConfirmRating(gameName, selectedIndex, playerName, usedVeto);
        //remove veto;
      }
      else{
        setveto = true;
        return await this.ConfirmRating(gameName, selectedIndex, playerName, usedVeto);
        //add veto
      }
    }
  }

  /**
   * @description posts rating question for amge
   * @param playerName player that is rating
   * @param gameName name of game which is rated
   * @param usedVeto boolean if veto has been set
   * @returns 
   */
  async setRating(playerName, gameName, usedVeto) {
    let selectedIndex;
    console.clear();
    let options = this.language.ratingOptions;
    term(this.language.rateGamesHeader);
    term(`${this.language.rateGameQuestion(gameName, playerName)}\n`);
    const response = await term.singleColumnMenu(options).promise;
    selectedIndex = await response.selectedIndex;
    term("\n").green(
      this.language.ratingNoticeOutput(gameName, await response.selectedText)
    );
     return await this.ConfirmRating(gameName, selectedIndex, playerName, usedVeto);
  }

  /**
   * @description posts edit player menu
   * @returns 
   */
  async postEditPlayersMenu() {
    let selectedIndex;

    console.clear();

    term(this.language.editPlayerHeader);
    term(this.language.mainMenuSelectTitle);

    const response = await term.singleColumnMenu(this.language.editPlayersMenu)
      .promise;
    const selectedText = await response.selectedText;
    selectedIndex = await response.selectedIndex;
    term("\n").green("Selected: ", selectedText);

    this.lastOption = "Player management";

    return selectedIndex;
  }

  /**
   * @description posts manage games menu
   * @returns selectedIndex of menu
   */
  async postManageGamesMenu() {
    let selectedIndex;

    console.clear();

    term(this.language.manageGamesHeader);
    term(this.language.mainMenuSelectTitle);

    const response = await term.singleColumnMenu(this.language.manageGamesMenu)
      .promise;
    const selectedText = await response.selectedText;
    selectedIndex = await response.selectedIndex;
    term("\n").green("Selected: ", selectedText);

    this.lastOption = "Game management";

    return selectedIndex;
  }

  /**
   * @description posts menu of the delete games process
   * @returns index of selected menu item
   */
  async postDeleteGamesMenu() {
    let selectedIndex;

    console.clear();

    term(this.language.deleteGamesHeader);
    term(this.language.mainMenuSelectTitle);

    const response = await term.singleColumnMenu(this.language.deleteGamesMenu)
      .promise;
    const selectedText = await response.selectedText;
    selectedIndex = await response.selectedIndex;
    term("\n").green("Selected: ", selectedText);

    return selectedIndex;
  }

  /**
   * @description posts file selector for data import
   * @returns the filename which has been selected
   */
  async postFileSelector() {
    console.clear();

    term(this.language.importModeHeader);
    term.cyan(this.language.chooseFileQuestion);

    let items = await fs
      .readdirSync("./DataImport", { withFileTypes: true })
      .map((d) => d.name);
    items.push("EXIT");
    const response = await term.gridMenu(items).promise;
    const selectedText = await response.selectedText;
    const selectedIndex = await response.selectedIndex;
    term("\n").green("Selected: ", selectedText);

    this.lastOption = "Import Mode";
    return selectedText;
  }

  /**
   * @description posts choosePlayer menu
   * @param userList 
   * @returns returns index of selected player
   */
  async choosePlayer(userList) {
    let selectedIndex;

    console.clear();

    term(this.language.choosePlayerHeader);
    term(this.language.choosePlayerQuestion);

    const response = await term.singleColumnMenu(userList).promise;
    const selectedText = await response.selectedText;
    selectedIndex = await response.selectedIndex;
    term("\n").green("Selected: ", selectedText);

    return selectedIndex;
  }

  /**
   * @description posts game selector
   * @param gameList list of games that are selectable 
   * @returns index of selected game
   */
  async chooseGame(gameList) {
    let selectedIndex;

    console.clear();

    term(this.language.chooseGameHeader);
    term(this.language.chooseGameQuestion);

    const response = await term.singleColumnMenu(gameList).promise;
    const selectedText = await response.selectedText;
    selectedIndex = await response.selectedIndex;
    term("\n").green("Selected: ", selectedText);

    return selectedIndex;
  }

  /**
   * @description post a decision
   * @param optionList  options which are selectable
   * @param termTitle title of the decision post
   * @param question question which has to be decided
   * @returns text which was selected from optionlist
   */
  async decision(optionList, termTitle, question) {
    let selectedIndex;

    console.clear();

    term(`>${termTitle}<\n`);
    term(question + "\n");

    const response = await term.singleColumnMenu(optionList).promise;
    const selectedText = await response.selectedText;

    return selectedText;
  }

  /**
   * @description posts confirmation question
   * @param confirmQuestion question which has to be confirmed 
   * @returns boolean value true or false
   */
  async confirm(confirmQuestion) {
    console.clear();
    term(this.language.confirmQuestionCreator(confirmQuestion, 0));
    term.red(this.language.confirmQuestionCreator(confirmQuestion, 1));
    term(this.language.confirmQuestionCreator(confirmQuestion, 2));
    term.green(this.language.confirmQuestionCreator(confirmQuestion, 3));
    const result = await term.yesOrNo({ yes: ["y", "ENTER"], no: ["n"] })
      .promise;
    return result;
  }

  /**
   * @description asks for input for a game name, which will be added to a user
   * @returns game which will be added to a user
   */
  async addGameInput() {
    console.clear();
    term(this.language.addGameHeader);
    term.cyan(this.language.addGameQuestion);
    const gameName = await term.inputField().promise;
    if (gameName !== "") {
      return gameName;
    } else {
      this.addGameInput();
    }
  }

  /**
   * @description asks for input for a player name and games, which will be added to new a user
   * @returns array of playerName and gamelist
   */
  async addPlayerInput() {
    console.clear();
    term(this.language.addPlayerHeader);
    term.cyan(this.language.addPlayerNameQuestion);
    const playerName = await term.inputField().promise;
    term.magenta(this.language.addPlayerGameQuestion);
    const gameList = await term.inputField().promise;
    let listString = gameList.slice(0, -1).split(",");
    return [playerName, listString];
  }

  /**
   * @description posts export menu
   * @returns index of selected menu item
   */
  async postExportMode() {
    let selectedIndex;

    console.clear();

    term(this.language.exportModeHeader);
    term(this.language.mainMenuSelectTitle);
    const response = await term.singleColumnMenu(this.language.exportMenu)
      .promise;
    const selectedText = await response.selectedText;
    selectedIndex = await response.selectedIndex;
    term("\n").green("Selected: ", selectedText);
    this.lastOption = "Export Mode";

    return selectedIndex;
  }

  /**
   * @description asks for filename input for a new export file which will be created
   * @returns name of file
   */
  async addExportFileName() {
    console.clear();
    term(this.language.createExportHeader);
    term.cyan(this.language.createExportFileQuestion);
    const fileName = await term.inputField().promise;
    return fileName;
  }

  /**
   * @description posts menu for gamenight plannign
   * @returns response
   */
  async postGameNightPlanMenu() {
    let selectedIndex;
    let lang = this.getLanguage();

    console.clear();

    const response = await this.decision(
      [lang.oneByOne, lang.addEveryPlayer],
      lang.gamenightplanHeader,
      lang.addToGameNightQuestion
    );

    this.lastOption = "Gamenight planning";

    return response;
  }
}

 

exports.Control = Control
