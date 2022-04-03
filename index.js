const { Boardgame, Player, Gamesnight } = require("./applicationMode");
const { DataHandler } = require("./dataHandler");
const { Control } = require("./control");
const { Export } = require("./fileExport");
const {
  MODES,
  MANAGEMENT_MODES,
  MANAGEMENT_PLAYERS_MODES,
  MANAGEMENT_GAMES_MODES,
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
let hasOneUser = false;
let control = new Control();
let exp = new Export();
control.postWelcome();
mainLoop();

/**
 * @description creates a data export if data was imported and the application mode was started
 * @param mode_index chosen Menu index
 */
async function exportLoop(mode_index) {
  switch (mode_index) {
    case 0:
      mainLoop();
      break;
    case 1:
      let exportFileName = "";
      exportFileName = await control.addExportFileName();
      if (exportFileName === "") {
        exportFileName = "Export";
      }
      let exportDate = await control.confirm(
        control.getLanguage().exportLoopOutput
      );
      let csvData = exp.setExportData(session, control.getLanguage());
      exp.createExport(csvData, exportFileName, exportDate);
      mainLoop();
      break;
    default:
      console.log(control.getLanguage().indexIssueOutput);
      break;
  }
}

/**
 * @description handles actions from the games management menu
 * @param mode_index chosen Menu index
 */
async function gamesManagementLoop(mode_index) {
  language = control.getLanguage();
  let gameList = session.getGamesObjectList();
  let userList;
  switch (mode_index) {
    case MANAGEMENT_GAMES_MODES.RETURN:
      mainLoop(MODES.MANAGEMENT);
      break;
    case MANAGEMENT_GAMES_MODES.ADD:
      if (session === undefined) {
        session = new DataHandler("");
      }
      userList = session.getUserObjectList();
      if (userList.length === 0) {
        await control.decision(["Ok"], language.noData, language.importOrder);
      } else if (hasImportedData || userList.length >= 1) {
        let filteredNameList = [];
        let filteredIDList = [];
        for (let i = 0; i < userList.length; i++) {
          filteredNameList.push(userList[i].getName());
          filteredIDList.push(userList[i].getID());
        }
        if (!filteredNameList.includes(language.return)) {
          filteredNameList.push(language.return);
        }
        let choosenPlayer = await control.choosePlayer(filteredNameList);
        if (filteredNameList[await choosenPlayer] !== language.return) {
          let gameToAdd = await control.addGameInput();
          let addGameConfirmation = await control.confirm(
            language.addGameToPlayerQuestion(
              gameToAdd,
              filteredNameList[choosenPlayer]
            )
          );
          if (addGameConfirmation) {
            //might needs await a
            session.addGame(filteredIDList[choosenPlayer], gameToAdd);
            await control.decision(
              ["Ok"],
              language.addGameHeader,
              language.gameHasBeenAdded
            );
          } else {
            await control.decision(
              ["Ok"],
              language.noData,
              language.importOrder
            );
          }
        }
      } else {
        let errorMsg = await control.decision(
          ["Ok"],
          language.noData,
          language.importOrder
        );
      }
      mainLoop(MODES.MANAGEMENT);
      break;
    case MANAGEMENT_GAMES_MODES.EDIT:
      if (session === undefined) {
        session = new DataHandler("");
      }
      userList = session.getUserObjectList();
      if (userList.length === 0) {
        await control.decision(["Ok"], language.noData, language.importOrder);
      } else {
        var userList1 = session.getUserObjectList();
        if (hasImportedData || userList1.length >= 1) {
          let gameNames = [];
          for (let i = 0; i < gameList.length; i++) {
            gameNames.push(gameList[i].getName());
          }
          if (!gameNames.includes(language.return)) {
            gameNames.push(language.return);
          }
          let gameToEditIndex = await control.chooseGame(gameNames);
          let gameToEdit = gameNames[gameToEditIndex];
          let editQuesiton = await control.decision(
            ["Ok", language.no],
            language.manageGamesHeader,
            language.changeGameNameQuestion
          );
          if (editQuesiton !== language.no) {
            let newGameName = await control.addGameInput();
            let userList = session.getUserObjectList();
            if (newGameName !== gameToEdit) {
              for (let j = 0; j < userList.length; j++) {
                userList[j].replaceGame(newGameName, gameToEdit);
              }
              session.saveUserObjectList(userList);
            }
          }
        }
      }
      mainLoop(MODES.MANAGEMENT);
      break;
    case MANAGEMENT_GAMES_MODES.DELETE:
      if (session === undefined) {
        session = new DataHandler("");
      }
      if (session.getUserObjectList().length === 0) {
        await control.decision(["Ok"], language.noData, language.importOrder);
      } else {
        var userList1 = session.getUserObjectList();
        if (hasImportedData || userList1.length >= 1) {
          let tempList = [];
          for (let i = 0; i < gameList.length; i++) {
            tempList.push(gameList[i].getName());
          }
          if (!tempList.includes(language.return)) {
            tempList.push(language.return);
          }
          let gameToDeleteIndex = await control.chooseGame(tempList);
          let gameToDelete = tempList[gameToDeleteIndex];
          let chosenAct = await control.decision(
            [language.global, language.player, language.return],
            language.deleteGameTitle,
            language.optionTextGlobalOrIndividual
          );
          if (gameToDelete !== language.return) {
            if (chosenAct === language.global) {
              session.deleteGameGlobally(gameToDelete);
            } else if (chosenAct === language.player) {
              let userList = session.getUserObjectList();
              let filteredNameList = [];
              let filteredIDList = [];
              for (let i = 0; i < userList.length; i++) {
                if (userList[i].getBoardgames().includes(gameToDelete)) {
                  filteredNameList.push(userList[i].getName());
                  filteredIDList.push(userList[i].getID());
                }
              }
              if (
                filteredNameList.length !== 0 ||
                filteredNameList.length !== undefined
              ) {
                if (!filteredNameList.includes(language.return)) {
                  filteredNameList.push(language.return);
                }
                let chosenIndex = await control.choosePlayer(filteredNameList);
                if (filteredNameList[chosenIndex] === language.return) {
                  mainLoop(MODES.MANAGEMENT);
                } else {
                  if (
                    (await control.decision(
                      [language.yes, language.no],
                      language.deleteConfirmText,
                      language.deleteGameFromPlayer(
                        gameToDelete,
                        filteredNameList[await chosenIndex]
                      )
                    )) === control.getLanguage().yes
                  ) {
                    session.deleteGameFromUser(
                      filteredIDList[chosenIndex],
                      gameToDelete
                    );
                  } else {
                    mainLoop(MODES.MANAGEMENT);
                  }
                }
              } else {
                let errorMsg = await control.decision(
                  ["Ok"],
                  language.noData,
                  "No Player found"
                );
              }
            } else {
              let errorMsg = await control.decision(
                ["Ok"],
                language.noData,
                "No Player found"
              );
            }
          }
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

/**
 * @description handles actions from the player management menu
 * @param mode_index chosen Menu index
 */
async function playerManagementLoop(mode_index) {
  let names = [];
  let ids = [];
  language = control.getLanguage();
  switch (mode_index) {
    case MANAGEMENT_PLAYERS_MODES.RETURN:
      mainLoop(MODES.MANAGEMENT);
      break;
    case MANAGEMENT_PLAYERS_MODES.ADD:
      let valueArr = await control.addPlayerInput();
      if (session === undefined) {
        session = new DataHandler("");
      }
      session.addUser(await valueArr[0], await valueArr[1]);
      if (session.getUserObjectList().length >= 1) {
        if (session.getUserObjectList().length >= 2) {
          hasImportedData = true;
        }
        hasOneUser = true;
      }
      mainLoop(MODES.MANAGEMENT);
      break;
    case MANAGEMENT_PLAYERS_MODES.EDIT:
      if (session === undefined) {
        session = new DataHandler("");
      }
      let userList = session.getUserObjectList();
      if (userList.length === 0) {
        await control.decision(["Ok"], language.noData, language.importOrder);
      } else {
        for (let i = 0; i < userList.length; i++) {
          names.push(userList[i].getName());
          ids.push(userList[i].getID());
        }
        if (!names.includes(language.return)) {
          names.push(language.return);
        }
        const chosenPlayer = await control.choosePlayer(names);
        if (names[chosenPlayer] !== language.return) {
          const decisionForPlayer = await control.decision(
            [language.editPlayersMenu],
            language.editPlayerHeader,
            language.editPlayerQuestion
          );
          if ((await decisionForPlayer) === language.editPlayersMenu[1]) {
            const playerName = await control.addPlayerNameInput();
            userList[chosenPlayer].setName(playerName);
            session.saveUserObjectList(userList);
            mainLoop(MODES.MANAGEMENT);
          } else if (decisionForPlayer === language.editPlayersMenu[2]) {
            let gameNames = userList[chosenPlayer].getBoardgames();
            if (!gameNames.includes(language.return)) {
              gameNames.push(language.return);
            }
            const chosenGame = await control.decision(
              gameNames,
              language.editPlayerHeader,
              language.changeGameQuestion
            );

            if (chosenGame !== language.return) {
              const gameEditAction = await control.decision(
                language.editGameMenu,
                language.editPlayerHeader,
                language.changeGameEditChoice
              );
              if (gameEditAction !== language.editGameMenu[0]) {
                if (gameEditAction === language.editGameMenu[1]) {
                  const gameName = await control.addGameInput();
                  if (gameName !== chosenGame) {
                    userList[chosenPlayer].replaceGame(gameName, chosenGame);
                    session.saveUserObjectList(userList);
                    mainLoop(MODES.MANAGEMENT);
                  }
                } else {
                  if (
                    (await control.decision(
                      [language.yes, language.no],
                      language.deleteConfirmText,
                      language.deleteGameFromPlayer(
                        chosenGame,
                        userList[chosenPlayer].getName()
                      )
                    )) === language.yes
                  ) {
                    session.deleteGameFromUser(ids[chosenPlayer], chosenGame);
                    mainLoop(MODES.MANAGEMENT);
                  } else {
                    mainLoop(MODES.MANAGEMENT);
                  }
                }
              } else {
                mainLoop(MODES.MANAGEMENT);
              }
            } else {
              mainLoop(MODES.MANAGEMENT);
            }
          } else {
            mainLoop(MODES.MANAGEMENT);
          }
        }
      }
      mainLoop(MODES.MANAGEMENT);
      break;
    case MANAGEMENT_PLAYERS_MODES.DELETE:
      if (session === undefined) {
        session = new DataHandler("");
      }
      let userList1 = session.getUserObjectList();
      if (userList1.length === 0) {
        await control.decision(["Ok"], language.noData, language.importOrder);
      } else {
        for (let i = 0; i < userList1.length; i++) {
          names.push(userList1[i].getName());
          ids.push(userList1[i].getID());
        }
        if (!names.includes(language.return)) {
          names.push(language.return);
        }
        const player = await control.choosePlayer(names);
        if (names[player] !== language.return) {
          const decision = await control.confirm(
            language.deletePlayerQuestion(player)
          );
          if (decision) {
            session.deleteUser(ids[player]);
          } else {
            let exportMsg = await control.decision(
              ["Ok"],
              language.deletePlayerHeader,
              language.playerNotDeleted
            );
          }
        }
      }

      mainLoop(MODES.MANAGEMENT);
      break;
    default:
      console.log(control.getLanguage().indexIssueOutput);
      break;
  }
}

/**
 * @description shows list of games
 * @param list list of games
 * @param playersList list of players (needed for recursion reasons)
 * @param objectList list of objects (needed for recursion reasons)
 */
async function showGamesList(list, playersList, objectList) {
  let chosenGame = await control.chooseGame(list);
  if (list[chosenGame] === control.getLanguage().return) {
    await showPlayersList(playersList, objectList);
  } else {
    await showGamesList(list, playersList, objectList);
  }
}

/**
 * @description shows list of players
 * @param list list of Player objects (for recursion reasons)
 * @param objectList list of objects (for recursion reasons)
 */
async function showPlayersList(list, objectList) {
  language = control.getLanguage();
  let chosenPlayer = await control.choosePlayer(list);
  if (list[chosenPlayer] !== control.getLanguage().return) {
    let gameList = objectList[chosenPlayer].getBoardgames();
    if (!gameList.includes(language.return)) {
      gameList.push(language.return);
    }
    await showGamesList(gameList, list, objectList);
  } else {
    mainLoop(MODES.MANAGEMENT);
  }
}

/**
 * @description handles actions regarding planning the gamenight
 * @param mode_index chosen Menu index
 * @param fromManagement determines if planGamenightLoop was called from Management or not
 * @returns
 */
async function planGamenightLoop(mode_index, fromManagement = true) {
  if (session === undefined) {
    session = new DataHandler("");
  }
  let userList;
  language = control.getLanguage();
  switch (mode_index) {
    case language.addEveryPlayer:
      userList = session.getUserObjectList();
      if (userList.length === 0) {
        await control.decision(["Ok"], language.noData, language.importOrder);
      } else {
        session.saveGamesNightObject(new Gamesnight(userList));
        createdGamenight = true;
        if (fromManagement) {
          mainLoop(MODES.MANAGEMENT);
        } else {
          return;
        }
      }
      break;
    case language.oneByOne:
      userList = session.getUserObjectList();
      let gameNightUsers = [];
      for (let i = 0; i < userList.length; i++) {
        let chooseToAdd = await control.decision(
          [language.yes, language.no],
          language.addPlayersToGameNightTitle,
          language.addPlayerToGameNightQuestion(userList[i].getName())
        );
        if (chooseToAdd === language.yes) {
          gameNightUsers.push(userList[i]);
        }
      }
      if (gameNightUsers !== []) {
        let night = new Gamesnight(gameNightUsers);

        session.saveGamesNightObject(night);
        createdGamenight = true;
      }
      if (fromManagement) {
        mainLoop(MODES.MANAGEMENT);
      } else {
        return;
      }
      break;
    default:
      console.log(language.indexIssueOutput);
      mainLoop(MODES.MANAGEMENT);
      break;
  }
}

/**
 * @description handles actions in management menu
 * @param mode_index chosen menu index from menu
 */
async function managementLoop(mode_index) {
  language = control.getLanguage();
  if (session === undefined) {
    session = new DataHandler("");
  }
  let userList = session.getUserObjectList();
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
      if (userList.length >= 2) {
        planGamenightIndex = await control.postGameNightPlanMenu();
        planGamenightLoop(planGamenightIndex);
      } else {
        let errorMsg = await control.decision(
          ["Ok"],
          language.noData,
          language.importOrder
        );
        mainLoop();
      }
      break;
    case MANAGEMENT_MODES.SHOW_PLAYERS:
      control.setLastOption("Gameslist");

      if (userList.length >= 1) {
        let userNames = [];
        for (let i = 0; i < userList.length; i++) {
          userNames.push(userList[i].getName());
        }
        if (!userNames.includes(language.return)) {
          userNames.push(language.return);
        }

        await showPlayersList(userNames, userList);
      } else {
        let errorMsg = await control.decision(
          ["Ok"],
          language.noData,
          language.importOrder
        );
      }
      mainLoop(MODES.MANAGEMENT);
      break;
    default:
      let errorMsg = await control.decision(
        ["Ok"],
        "",
        language.indexIssueOutput
      );
      mainLoop(MODES.MANAGEMENT);
      break;
  }
}

/**
 * @description iterates through every game from gamenight and asks players to rate them
 * @param mode_index chosen menu index
 */
async function applicationLoop(mode_index) {
  let gamesnight;
  language = control.getLanguage();
  switch (mode_index) {
    case 1:
      if (session === undefined) {
        session = new DataHandler("");
      }
      let userList = session.getUserObjectList();
      if (userList.length === 0) {
        await control.decision(["Ok"], language.noData, language.importOrder);
      } else if (userList.length >= 2) {
        if (createdGamenight) {
          gamesnight = session.getGamesNightObject();
        } else {
          planGamenightIndex = await control.postGameNightPlanMenu();
          await planGamenightLoop(planGamenightIndex, false);
          gamesnight = session.getGamesNightObject();
        }
        if (gamesnight.getPlayers().length > 1) {
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
            spieler[i].setVeto(false);
            let player = spieler[i];
            let playerName = player.getName();
            for (let g = 0; g < gameList.length; g++) {
              let gameName = gameList[g];
              let usedVeto = player.getVeto();
              let ratings = await control.setRating(
                playerName,
                gameName,
                usedVeto
              );
              if (ratings === "CANCELLED") {
                mainLoop();
                return;
              } else {
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
                if (vetoSetted) {
                  gamesnight.setVeto(gameName, vetoSetted);
                  player.setRating(gameName, rating);
                  player.setVeto(vetoSetted);
                  gamesnight.setRating(gameName, rating);
                } else {
                  player.setRating(gameName, rating);
                  gamesnight.setRating(gameName, rating);
                }
              }
            }
          }
          for (let i = 0; i < spieler.length; i++) {
            let found = false;
            for (let j = 0; j < userList.length; j++) {
              if (!found) {
                if (userList[j].getID() === spieler[i].getID()) {
                  userList[j] = spieler[i];
                  found = true;
                }
              }
            }
          }
          session.saveUserObjectList(userList);
          gamesnight.calculateAverages();
          gamesnight.setRatingHashmap(
            session.hashMapSorter(gamesnight.getRating())
          );
          session.saveRatingsIntoGlobalGameList(gamesnight);
          session.saveGamesNightObject(gamesnight);
          hasDataForExport = true;
          gamesnight = session.getGamesNightObject();
          let chosenGame = gamesnight.chooseBoardgame();
          session.saveChosenGameIntoHashmap(chosenGame);
          let gameChoice = await control.decision(
            ["Ok", language.revoteChoice],
            language.choosenGameChoice,
            chosenGame
          );
          if (gameChoice === language.revoteChoice) {
            mainLoop(MODES.APPLICATION);
          } else {
            control.setLastOption("Application Mode");
            mainLoop();
          }
        } else {
          createdGamenight = false;
          let errorMsg = await control.decision(
            ["Ok"],
            language.notEoughPlayersError,
            language.notEnoughPlayersOrder
          );
        }
      }
      break;
    default:
      break;
  }
  mainLoop();
}

/**
 * @description represents the root or main function of the project
 * @param mainIndex chosen menu item index
 */
async function mainLoop(mainIndex = null) {
  if (!mainIndex) {
    mainIndex = await control.postMainMenu();
  }
  language = control.getLanguage();

  switch (mainIndex) {
    case MODES.EXIT:
      process.exit();

    case MODES.TUTORIAL:
      control.setLastOption("Tutorial");
      let tutorial = await control.decision(
        ["Ok"],
        "TUTORIAL",
        language.tutorial
      );
      mainLoop();
      break;
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
    case MODES.IMPORT:
      const fileText = await control.postFileSelector();
      if (fileText !== "EXIT") {
        session = new DataHandler(fileText);
        session.setUpLocalStorages();
        session.checkFilename();
        hasImportedData = true;
      }
      mainLoop();
      break;
    case MODES.APPLICATION:
      let applicationIndex = await control.postApplicationMode();
      applicationLoop(applicationIndex);
      break;
    case MODES.MANAGEMENT:
      let managementIndex = await control.postManagementMode();
      managementLoop(managementIndex);
      break;
    case MODES.EXPORT:
      if (hasDataForExport) {
        let exportIndex = await control.postExportMode();
        exportLoop(exportIndex);
      } else {
        let errorMsg = await control.decision(
          ["Ok"],
          language.noData,
          language.exportDataMissingText
        );
        mainLoop();
      }
      break;
    default:
      let errorMsg = await control.decision(
        ["Ok"],
        " ",
        language.indexIssueOutput
      );
      mainLoop();
      break;
  }
}
