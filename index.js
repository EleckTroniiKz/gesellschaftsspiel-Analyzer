const { Boardgame, Player, Gamesnight } = require("./applicationMode");
const { DataHandler } = require("./dataHandler");
const { Control } = require("./control");
const { Export } = require("./fileExport");
const {
  MODES,
  MANAGEMENT_MODES,
  MANAGEMENT_PLAYERS_MODES,
  EDIT_PLAYERS,
  MANAGEMENT_GAMES_MODES,
  DELETE_GAME,
  ENGLISH,
  TURKISH,
  ITALIAN,
  GERMAN,
} = require("./enums/enum.js");

let session;
let language;

let hasDataForExport = false;
let createdGamenight = false;
let hasImportedData = false;
let control = new Control();
let exp = new Export();
control.postWelcome();
mainLoop();

async function exportLoop(mode_index) {
  switch (mode_index) {
    case 0:
      mainLoop();
      break;
    case 1:
      let exportFileName = "Export";
      exportFileName = await control.addExportFileName();
      let exportDate = await control.confirm(
        control.getLanguage().exportLoopOutput
      );
      let csvData = exp.setExportData();
      exp.createExport(csvData, exportFileName, exportDate);
      mainLoop();
      break;
    default:
      console.log(control.getLanguage().indexIssueOutput);
      break;
  }
}

async function gamesManagementLoop(mode_index) {
  switch (mode_index) {
    case MANAGEMENT_GAMES_MODES.RETURN:
      mainLoop(MODES.MANAGEMENT);
      break;
    case MANAGEMENT_GAMES_MODES.ADD:
      //add GAME
      //Input a Name for the game. Then choose if it should be added to a existing player or create a new player
      if (hasImportedData) {
        let userList = session.getUserObjectList();
        let filteredNameList = [];
        let filteredIDList = [];
        for (let i = 0; i < userList.length; i++) {
          filteredNameList.push(userList[i].getName());
          filteredIDList.push(userList[i].getID());
        }
        filteredNameList.push(control.getLanguage().return);
        let choosenPlayer = await control.choosePlayer(filteredNameList);
        if (filteredNameList[await choosenPlayer] !== control.getLanguage().return) {
          let gameToAdd = await control.addGameInput();
          let a = await control.confirm(control.getLanguage().addGameToPlayerQuestion(gameToAdd,filteredNameList[choosenPlayer]));
          if (await a) {
            session.addGame(filteredIDList[choosenPlayer], gameToAdd);
            await control.decision(
              ["Ok"],
              control.getLanguage().addGameHeader,
              control.getLanguage().gameHasBeenAdded
            );
          } else {
            await control.decision(
              ["Ok"],
              control.getLanguage().noData,
              control.getLanguage().importOrder
            );
          }
          //Wollen sie spiel x zu user y hinzufügen --> ja und nein
          //session.addGame(userID, newGame).
          //Dann ausgeben, dass SPiel x zu User y hinzugefügt wurde.
          //vllt die spiele liste vom user ausgeben. -->
        }
      } else {
        let errorMsg = await control.decision(
          ["Ok"],
          control.getLanguage().noData,
          control.getLanguage().importOrder
        );
      }
      mainLoop(MODES.MANAGEMENT);
      break;
    case MANAGEMENT_GAMES_MODES.EDIT:
      //edit game
      //first show list of games (ID + name). Then choose which one should be edited
      //After selection, choose a player with that game and change the name either for one person or globally
      break;
    case MANAGEMENT_GAMES_MODES.DELETE:
      let gameList = session.getGamesObjectList();
      let tempList = [];
      for (let i = 0; i < gameList.length; i++) {
        tempList.push(gameList[i].getName());
      }
      tempList.push(control.getLanguage().return);
      let gameToDeleteIndex = await control.chooseGame(tempList);
      let gameToDelete = tempList[gameToDeleteIndex];
      let chosenAct = await control.decision(
        [
          control.getLanguage().global,
          control.getLanguage().player,
          control.getLanguage().return,
        ],
        control.getLanguage().deleteGameTitle,
        control.getLanguage().optionTextGlobalOrIndividual
      );
      if (gameToDelete !== control.getLanguage().return) {
        if (chosenAct === control.getLanguage().global) {
          session.deleteGameGlobally(gameToDelete);
        } else if (chosenAct === control.getLanguage().player) {
          let userList = session.getUserObjectList();
          let filteredNameList = [];
          let filteredIDList = [];
          for (let i = 0; i < userList.length; i++) {
            if(userList[i].getBoardgames().includes(gameToDelete)){
              filteredNameList.push(userList[i].getName());
              filteredIDList.push(userList[i].getID());
            }
          }
          if(filteredNameList.length !== 0 || filteredNameList.length !== undefined){
            filteredNameList.push(control.getLanguage().return);
            let chosenIndex = await control.choosePlayer(filteredNameList);
            if (filteredNameList[chosenIndex] === control.getLanguage().return) {
              mainLoop(MODES.MANAGEMENT);
            } else {
              if (await control.decision([control.getLanguage().yes, control.getLanguage().no],control.getLanguage().deleteConfirmText,control.getLanguage().deleteGameFromPlayer(gameToDelete,filteredNameList[await chosenIndex])) === control.getLanguage().yes) {
                session.deleteGameFromUser(
                  filteredIDList[chosenIndex],
                  gameToDelete
                );
              } else {
                mainLoop(MODES.MANAGEMENT);
              }
            }
          }
          else{
            let errorMsg = await control.decision(
              ["Ok"],
              control.getLanguage().noData,
              "No Player found"
            );
          }
        }
        else{
          let errorMsg = await control.decision(
            ["Ok"],
            control.getLanguage().noData,
            "No Player found"
          );
        }
      }
      mainLoop(MODES.MANAGEMENT);
      //Either for a player or globally
      break;
    default:
      console.log(control.getLanguage().indexIssueOutput);
      break;
  }
}

async function playerManagementLoop(mode_index) {
  switch (mode_index) {
    case MANAGEMENT_PLAYERS_MODES.RETURN:
      mainLoop(MODES.MANAGEMENT);
      break;
    case MANAGEMENT_PLAYERS_MODES.ADD:
      let valueArr = await control.addPlayerInput();
      session.addUser(await valueArr[0], await valueArr[1]);
      if(session.getUserObjectList().length >= 2){
        hasImportedData = true;
      }
      mainLoop(MODES.MANAGEMENT);
      //muss noch liste der spiele und des spielernames returnen
      //add Player
      //Input for Player Name, and the Games from the Player
      break;
    case MANAGEMENT_PLAYERS_MODES.EDIT:
      //edit Player
      //Show list of players and give out the IDs + Names to select.
      //After selection, choose what will be edited: Name, Games
      break;
    case MANAGEMENT_PLAYERS_MODES.DELETE:
      let userList = session.getUserObjectList();
      let names = [];
      let ids = [];
      for (let i = 0; i < userList.length; i++) {
        names.push(userList[i].getName());
        ids.push(userList[i].getID());
      }
      names.push(control.getLanguage().return);
      const player = await control.choosePlayer(names);
      if (names[player] !== control.getLanguage().return) {
        const decision = await control.confirm(
          control.getLanguage().deletePlayerQuestion(player)
        );
        if (decision) {
          session.deleteUser(ids[player]);
        } else {
          let exportMsg = await control.decision(
            ["Ok"],
            control.getLanguage().deletePlayerHeader,
            control.getLanguage().playerNotDeleted
          );
        }
      }
      mainLoop(MODES.MANAGEMENT);
      break;
    default:
      console.log(control.getLanguage().indexIssueOutput);
      break;
  }
}

async function showGamesList(list, playersList, objectList) {
  let chosenGame = await control.chooseGame(list);
  if (list[chosenGame] === control.getLanguage().return) {
    await showPlayersList(playersList, objectList);
  } else {
    await showGamesList(list, playersList, objectList);
  }
}

async function showPlayersList(list, objectList) {
  
  let chosenPlayer = await control.choosePlayer(list);
  if (list[chosenPlayer] !== control.getLanguage().return) {
    let gameList = objectList[chosenPlayer].getBoardgames();
    gameList.push(control.getLanguage().return);
    await showGamesList(gameList, list, objectList);
  } else {
    mainLoop(MODES.MANAGEMENT);
  }
}

async function planGamenightLoop(mode_index, fromManagement = true) {
  let userList;
  let add = false;
  let lang = control.getLanguage()
  switch (mode_index) {
    case lang.addEveryPlayer:
      //getUserList and just pass that list into gamenight
      userList = session.getUserObjectList();
      session.saveGamesNightObject(new Gamesnight(userList));
      createdGamenight = true;
      if(fromManagement){
        mainLoop(MODES.MANAGEMENT);
      }
      else{
        return;
      }
      break;
    case lang.oneByOne:
      //getUserList. Iterate through the list and ask if they want to add that user to the list --> if so add them into the new user list || if not dont add the
      //create instance of the gamenight and send them to the dataHandler so it can be saved in the localStorage
      userList = session.getUserObjectList();
      let gameNightUsers = [];
      for (let i = 0; i < userList.length; i++) {
        //ask if they want to add them.
        let chooseToAdd = await control.decision(
          [lang.yes, lang.no],
          lang.addPlayersToGameNightTitle,
          lang.addPlayerToGameNightQuestion(userList[i].getName())
        );
        if(chooseToAdd === control.getLanguage().yes) {
          gameNightUsers.push(userList[i]);
        }
      }
      if(gameNightUsers !== []) {
        let night = new Gamesnight(gameNightUsers);
        
        session.saveGamesNightObject(night);
        createdGamenight = true;
      }
      if(fromManagement){
        mainLoop(MODES.MANAGEMENT);
      }
      else{
        return
      }
      break;
    default:
      console.log(control.getLanguage().indexIssueOutput);
      mainLoop(MODES.MANAGEMENT);
      break;
  }
}

async function managementLoop(mode_index) {
  let managementIndex;
  switch (mode_index) {
    case MANAGEMENT_MODES.RETURN:
      mainLoop();
      break;
    case MANAGEMENT_MODES.MANAGE_PLAYERS:
      managementIndex = await control.postManagePlayersMenu();
      playerManagementLoop(managementIndex);
      break;
    case MANAGEMENT_MODES.MANAGE_GAMES:
      managementIndex = await control.postManageGamesMenu();
      gamesManagementLoop(managementIndex);
      break;
    case MANAGEMENT_MODES.PLAN_GAMENIGHT:
      if(hasImportedData){
        planGamenightIndex = await control.postGameNightPlanMenu();
        planGamenightLoop(planGamenightIndex);
      }
      else{
        let errorMsg = await control.decision(
          ["Ok"],
          control.getLanguage().noData,
          control.getLanguage().importOrder
        );
        mainLoop()
      }
      break;
    case MANAGEMENT_MODES.SHOW_PLAYERS:
      control.setLastOption("Gameslist")
      if (hasImportedData) {
        let userList = session.getUserObjectList();
        let userNames = [];
        for (let i = 0; i < userList.length; i++) {
          userNames.push(userList[i].getName());
        }
        userNames.push(control.getLanguage().return);
        
        await showPlayersList(userNames, userList);
      } else {
        let errorMsg = await control.decision(
          ["Ok"],
          control.getLanguage().noData,
          control.getLanguage().importOrder
        );
      }
      mainLoop(MODES.MANAGEMENT);
      break;
    default:
      console.log(control.getLanguage().indexIssueOutput);
      break;
  }
}

async function applicationLoop(mode_index) {
  let gamesnight;
  switch (mode_index) {
    case 1:
      if (hasImportedData) {
        let userList = session.getUserObjectList();
        if (createdGamenight) {
          gamesnight = session.getGamesNightObject();
        } else {
          planGamenightIndex = await control.postGameNightPlanMenu();
          await planGamenightLoop(planGamenightIndex, false);
          gamesnight = session.getGamesNightObject();
        }
        let gameList = []; 
        let spieler = gamesnight.getPlayers();
        for (let i = 0; i < spieler.length; i++) {
          let currentUsersGames = spieler[i].getBoardgames();
          for (let j = 0; j < currentUsersGames.length; j++) {
            let gameName = currentUsersGames[j];
            if (!gameList.includes(gameName)) {
              gameList.push(gameName);
            }
          }
        }
        let gameObjects = [];
        for (let i = 0; i < gameList.length; i++) {
          gameObjects.push(new Boardgame(gameList[i]));
        }

        for (let i = 0; i < spieler.length; i++) {
          let player = spieler[i];
          let playerName = player.getName();
          for (let g = 0; g < gameList.length; g++) {
            let gameName = gameList[g];
            let usedVeto = player.getVeto();
            let ratings = await control.setRating(playerName, gameName, usedVeto);
            let rating = ratings[0];
            let vetoSetted = ratings[1];  
            switch (rating) {
              case 0:
                rating = 5;
                break;
              case 1:
                rating = 4;
                break;
              case 2:
                rating = 3;
                break;
              case 3:
                rating = 2;
                break;
              case 4:
                rating = 1;
                break;
              default:
                rating = -1;
                break;
            }
            if(vetoSetted){
              gamesnight.setVeto(gameName, vetoSetted);
              player.setRating(gameName, rating);
              player.setVeto(vetoSetted);
              gamesnight.setRating(gameName, rating);
            }
            else{
              player.setRating(gameName, rating);
              gamesnight.setRating(gameName, rating);
            } 
          }
        }
        //Die spieler der gamenight werden mit den psielern der gesamten userlist getauscht.
        // also die spieler daten in der userlist werden mit den spieler daten der gamenight aktualisiert
        for (let i = 0; i < spieler.length; i++) {
          let found = false;
          for (let j = 0; j < userList.length; j++) {
            if (!found) {
              if (userList[i].getID() === spieler[i].getID()) {
                userList[i] = spieler[i];
                found = true;
              }
            }
          }
        }
        session.saveUserObjectList(userList);
        gamesnight.calculateAverages();
        gamesnight.sortByRating();
        session.saveGamesNightObject(gamesnight);
        //show average ratings
        hasDataForExport = true;
        gamesnight = session.getGamesNightObject();
        let chosenGame = gamesnight.chooseBoardgame();
        let gameChoice = await control.decision(["Ok", control.getLanguage().revoteChoice], control.getLanguage().choosenGameChoice, chosenGame)
        if(gameChoice === control.getLanguage().revoteChoice){
          mainLoop(MODES.APPLICATION);
        }
        else{
          control.setLastOption("Application Mode")
          mainLoop();
          
        }
      } else {
        let errorMsg = await control.decision(
          ["Ok"],
          control.getLanguage().noData,
          control.getLanguage().importOrder
        );
      }
      break;
    case 0:
      break;
    default:
      break;
  }
  mainLoop();
  //TO DO
}

async function mainLoop(mainIndex = null) {
  if (!mainIndex) {
    mainIndex = await control.postMainMenu();
  }
  language = control.getLanguage();

  switch (mainIndex) {
    case MODES.EXIT:
      process.exit();
    case MODES.LANGUAGE:
      const newLanguageIndex = await control.languageSelectionMenu();
      switch (newLanguageIndex) {
        case 0:
          control.setLanguage(GERMAN);
          break;
        case 1:
          control.setLanguage(ITALIAN);
          break;
        case 2:
          control.setLanguage(ENGLISH);
          break;
        case 3:
          control.setLanguage(TURKISH);
          break;
        default:
          break;
      }
      mainLoop();
      break;
    case MODES.IMPORT: //Import Mode
      const fileText = await control.postFileSelector();
      if (fileText !== "EXIT") {
        session = new DataHandler(fileText);
        session.setUpLocalStorages();
        session.checkFilename();
        hasImportedData = true;
      }
      mainLoop();
      break;
    case MODES.APPLICATION: // Application Mode
      let applicationIndex = await control.postApplicationMode();
      applicationLoop(applicationIndex);
      break;
    case MODES.MANAGEMENT: //Management Mode
      let managementIndex = await control.postManagementMode();
      managementLoop(managementIndex);
      break;
    case MODES.EXPORT: //Export Mode
      if (hasDataForExport) {
        //Abfrage, etc. pp
        let exportIndex = await control.postExportMode();
        exportLoop(exportIndex);
      } else {
        let errorMsg = await control.decision(
          ["Ok"],
          control.getLanguage().noData,
          control.getLanguage().exportDataMissingText
        );
        mainLoop();
      }
      break;
    default:
      console.log(control.getLanguage().indexIssueOutput);
      break;
  }
}
