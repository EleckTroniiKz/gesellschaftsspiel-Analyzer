const GERMAN = {
	ratingOptions:["Sehr gut", "Gut", "Nicht schlecht", "Nicht so gut", "Schlecht"],
	mainMenu: [
		"EXIT",
		"Tutorial",
		"Sprache einstellen",
		"Importmodus",
		"Anwendungsmodus",
		"Verwaltungsmodus",
		"Export Modus"
	],
	languages: ["Deutsch", "Italienisch", "Englisch", "Türkisch"],
	managementModeMenu: [
		"Zurück zum Hauptmenü",
		"Spieler-Verwaltung",
		"Spiel-Verwaltung",
		"Spielabend planung",
		"Spieler Liste"
	],
	applicationModeMenu: [
		"Zurück zum Hauptmenü",
		"Starte Anwendung"
	],
	managePlayersMenu: [
		"Zurück",
		"Spieler hinzufügen",
		"Spieler bearbeiten",
		"Spieler löschen"
	],
	editGameMenu: [
		"Zurück", 
		"Name bearbeiten",
		"Spiel löschen"
	],
	editPlayersMenu: [
		"Zurück", 
		"Name bearbeiten",
		"Spiele bearbeiten"
	],
	manageGamesMenu: [
		"Zurück",
		"Spiel hinzufügen",
		"Spiel bearbeiten",
		"Spiel löschen"
	],
	deleteGamesMenu: [
		"Zurück",
		"Spiel von Spieler löschen",
		"Spiel Global löschen"
	],
	exportMenu: [
		"Zurück zum Hauptmenü",
		"Export-Datei erstellen"
	],
	gameNightPlanHeader: ">Spielabend Planung<",
	mainMenuHeader: ">Hauptmenü<\n",
	languageChangeHeader:">Sprachauswahl<\n",
	languageChangeQuestion: "Zu welcher Sprache möchtest du wechseln?\n",
	managementModeHeader: ">Verwaltungsmodus<\n",
	applicationModeHeader: ">Anwendungsmodus<\n",
	managePlayersHeader: ">Verwalte Spieler<\n",
	rateGamesHeader: ">Bewerte Spiele<\n",
	editPlayerHeader: ">Spieler bearbeiten<\n",
	manageGamesHeader: ">Spiele bearbeiten<\n",
	deleteGamesHeader: ">Spiele löschen<\n",
	deletePlayerHeader: ">Spieler löschen<\n",
	playerNotDeleted: "Spieler wurde nicht gelöscht!",
	importModeHeader: ">Importiere Daten<\n",
	chooseFileQuestion: "Wähle eine Datei: \n",
	choosePlayerHeader: ">Spielerauswahl<\n",
	choosePlayerQuestion: "Wähle einen Spieler aus\n",
	chooseGameHeader: ">Spielauswahl<\n",
	chooseGameQuestion: "Wähle ein Spiel aus\n",
	confirmQuestionCreator: (confirmQuestion, i) => {
		switch(i){
			case 0:
				return `${confirmQuestion}\n Drücke `;
			case 1:
				return `\"n\" um abzulehnen`;
			case 2:
				return ` oder `;
			case 3:
				return `\"y\" um zuzustimmen.\n`;
		}
	},
	addGameHeader: `>Füge Spiel hinzu<\n`,
	addGameQuestion: `Welches Spiel möchtest du hinzufügen?\n`,
	addPlayerHeader: `>Füge Spieler hinzu<\n`,
	addPlayerNameQuestion: `Gib den Namen des Spielers ein, den du hinzufügen möchtest: \n`,
	addPlayerGameQuestion: `\nGib die Namen der Spiele ein, die der Spieler besitzt. \n (Trenne jedes Spiel mit einem Komma[,]. Wenn du fertig bist, schreib am Ende ein Semikolon[;]. -> Bsp: A,B,C;)\n`,
	exportModeHeader: `>Exportmodus<\n`,
	createExportHeader: `>Erstelle Export<\n`,
	createExportFileQuestion: `Gib den Namen der Exportdatei an: \n`,
	rateGameQuestion: (gameName, playerName) => {return `Spieler ${playerName}, bitte bewerte das Spiel ${gameName}`},
	ratingNoticeOutput: (gameName, ratingValue) => {return `Du hast das Spiel ${gameName} mit ${ratingValue} bewertet.`},
	ratingValidationQuestion: (gameName) => {return `Möchtest du das nächste Spiel bewerten oder deine Bewertung für ${gameName} ändern?`},
	mainMenuSelectTitle: "Bitte wähle einen Modus aus. \n",
	exportLoopOutput: "Möchtest du das heutige Datum an den Dateinamen beifügen?",
	addGameToPlayerQuestion: (gameName, playerName) => {return `Möchtest du wirklich das Spiel ${gameName} dem Spieler ${playerName} hinzufügen?`},
	deleteGameFromPlayer: (gameToDelete, player) => {return `Bist du sicher, dass du das Spiel ${gameToDelete} vom Spieler ${player} löschen möchtest?`},
	noData: "Keine Daten gefunden!",
	importOrder: "Bitte importieren Sie zuerst Daten!",
	optionTextGlobalOrIndividual: "Möchtest du dieses Spiel von einem Nutzer löschen oder global?",
	deleteGameTitle: "Lösche Spiel",
	deleteConfirmText: "Löschen bestätigen",
	deletePlayerQuestion: (playerName) => {return `Möchtest du wirklich den Spieler ${playerName} löschen?`},
	exportDataMissingText: "Bitte starte zuerst den Anwendungsmodus und bewerte die Spiele!",
	indexIssueOutput: "Mit dem Index ist etwas schief gelaufen!",
	return: "Zurück",
	player: "Spieler",
	global: "Global",
	yes: "Ja",
	no: "Nein",
	nextGame: "Nächstes Spiel",
	changeRating: "Ändere Bewertung",
	exportCompletedMsg: "Daten wurden exportiert!",
	gameHasBeenAdded: "Das Spiel wurdem dem ausgewählten Spieler hinzugefügt!",
	oneByOne: "Füge die Spieler einzeln zu",
	addEveryPlayer: "Füge jeden Spieler hinzu",
	addToGameNightQuestion: "Möchtest du jeden Spieler einzeln hinzufügen oder alle Spieler direkt?",
	addPlayersToGameNightTitle: "Füge Spieler zum Spielabend hinzu",
	addPlayerToGameNightQuestion: (playerName) => {return `Möchtest du den Spieler ${playerName} zum Spielabend hinzufügen?`},
	choosenGameChoice: "Laut den Bewertungen sollte dieses Spiel gespielt werden:",
	editPlayerQuestion: "Möchtest du den Spielernamen oder ein Spiel des Spielers bearbeiten?",
	changeGameQuestion: "Welches Spiel möchtest du bearbeiten?",
	changeGameEditChoice: "Möchtest du den Namen vom Spiel ändern oder es vom Spieler löschen?",
	changeGameNameQuestion: "Möchtest du den Namen des Spiels ändern (Global)?",
	topThreeGames: (arr) => {return `-------\nTop 3 der best bewertesten Spiele dieses Spielabends\n1.Platz: ${arr[0]} mit einer Bewertung von ${arr[1]}\n2.Platz: ${arr[2]} mit einer Bewertung von ${arr[3]}\n3.Platz: ${arr[4]} mit einer Bewertung von ${arr[5]}\n`},
	threeMostPlayed: (arr) => {return `-------\nMeist gespielten Spiele\n1.Platz: ${arr[0]}\n2.Platz: ${arr[1]}\n3.Platz: ${arr[2]}\n`},
	playerRatingHeader: (name) => {return `-------\nSpieler: ${name}\nSpiel;Rating\n`},
	playerRatingLine: (name, rating) => {
		if(rating === "No rating asigned yet!"){
			return `${name}, nicht vom Spieler bewertet\n`
		}
		else{
			return `${name}, ${rating}\n`
		}
	},
	averageRatingHeader: () => {return `-------\nDurchschnittsbewertung der Spiele des letzten Spielabends\nSpiel; Rating; Hat Veto\n`},
	averageRatingLine: (name, rating, veto) => {
		if(veto){
			return `${name}; ${rating}; Hat mindestens ein Veto\n`
		}
		else{
			return `${name}; ${rating}; Hat kein Veto\n`
		}
	},
	notEoughPlayersError: "Nicht genügend Spieler für den Spieleabend",
	notEnoughPlayersOrder: "Du brauchst mindestens 2 Spieler für einen Spieleabend",
	vetoSetText: "Setze Veto ein",
	vetoResetText: "Ziehe Veto zurück",
	tutorial: `In diesem Tutorial erklären wir Ihnen schrittweise in welcher Reihenfolge Sie den Gesellschaftsanalyzer bedienen dürfen. Wenn in einem Schritt steht, dass Sie zu einer bestimmten Stelle navigieren sollen, dann geschieht dies immer mittels der Pfeiltasten und musst mit Enter bestätigt werden um in die entsprechende Stelle reinzukommen:\\
	\nSchritt 0 (Optional): Navigieren Sie im Hauptmenü zu "Sprache einstellen" um die Sprache einzustellen.
	\nSchritt 1: Navigieren Sie im Hauptmenü zu "Importmodus" um diesen auszuwählen.
	\nSchritt 2: Navigieren Sie zur gewünschten Importdatei um diese Datei zu importieren.
	\nSchritt 3 (Optional): Sie befinden sich nach dem Import wieder im Hauptmenü. Navigieren Sie zu "Verwaltungsmodus" um diesen auszuwählen. In diesem Modus können Sie die Spieler verwalten, deren Spiele verwalten, einen Spielabend planen und die aktuelle Spieler Liste mit deren Spielen einsehen.
	\nSchritt 4: Navigieren Sie zu "Anwendungsmodus" um diesen auszuwählen.
	\nSchritt 5: Navigieren Sie zu "Starte Anwendung" um einen Spielabend zu planen. Dafür muss man nun entscheiden ob man alle aktuell verfügbaren Spieler miteinbezieht oder ob man die Spieler einzeln auswählt.
	\nSchritt 6: Navigieren Sie für jedes Gesellschaftsspiel zu einer Bewertung, die Ihrer Meinung nach angemessen ist für das jeweilige Spiel.
	\nSchritt 7: Wenn Sie eine Bewertung ändern möchten, dann navigieren Sie zu "Ändere Bewertung". Wenn Sie ein Veto einlegen möchten, damit dieses Spiel am Spielabend auf keinen Fall gespielt wird, dann navigieren Sie zu VETO setzen (es kann nur maximal 1 VETO pro Spieler pro Spielabend gesetzt werden). Wenn Sie zufrieden sind mit Ihrer Bewertung des Spieles und dem VETO Zustand, dann navigieren Sie zu "Nächstes Spiel" um zur Bewertung des nächsten Gesellschaftsspiels zu gelangen.
	\nSchritt 8: (Optional) Wenn Sie während den Bewertungen die Bewertungsabfrage stoppen wollen, navigieren Sie auf "Bewertung abbrechen". Dies bricht die Bewertung für den aktuell gewählten Spielabend ab. Dies geschieht dann nach einer Bestätigung des Abbruchs. Wenn Sie es wirklich abbrechen möchten, drücken sie y. Sollten Sie sich nur verdrückt haben, drücken Sie auf n. 
	\nSchritt 9: Nachdem alle Spiele bewertet wurden und die VETOs gesetzt wurden, gibt das Matchmaking das ausgewählte Spiel an. Navigieren Sie zu "Ok" um wieder ins Hauptmenü zu gelangen.
	\nSchritt 10: Navigieren Sie zu "Exportmodus" um diesen auszuwählen.
	\nSchritt 11: Navigieren Sie zu "Export-Datei erstellen" und geben Sie einen angemessenen Namen an. 
	\nSchritt 12: Wenn Sie das aktuelle Datum nicht als Suffix beim Exportdateinamen haben möchten, dann drücken Sie n. Wenn Sie das aktuelle Datum als Suffix beim Exportdateinamen haben möchten, dann drücken Sie y.
	\nSchritt 13: Navigieren Sie zu "Ok" um zurück zum Hauptmenü zu gelangen.`,
	cancelVoting: "Bewertung abbrechen",
	cancelVotingQuestion: "Bist du sicher, dass du die Bewertung abbrechen möchtest?",
	chosenGameTitleExport: `Beim letzen Spielabend wurde dieses Spiel gespielt: \n`
}

const ENGLISH = {
	ratingOptions:["very good", "good", "not bad", "not so good", "bad"],
	mainMenu: [
		"EXIT",
		"Tutorial",
		"Change the language",
		"Import Mode",
		"Application Mode",
		"Management Mode",
		"Export Mode"
	],
	languages: ["German", "Italian", "English", "Turkish"],
	managementModeMenu: [
		"Return to Main Menu",
		"Player management",
		"Game management",
		"Gamenight planning",
		"List of players"
	],
	applicationModeMenu: [
		"Return to Main Menu",
		"Start Application"
	],
	managePlayersMenu: [
		"Return",
		"Add player",
		"Edit player",
		"Delete player"
	],
	editGameMenu: [
		"Return",
		"Edit name", 
		"Delete game"
	],
	editPlayersMenu: [
		"Return", 
		"Edit name",
		"Edit games"
	],
	manageGamesMenu: [
		"Return",
		"Add game",
		"Edit game",
		"Delete game"
	],
	deleteGamesMenu: [
		"Return",
		"Delete game from player",
		"Delete game globally"
	],
	exportMenu: [
		"Return to Main Menu",
		"Create Export file"
	],
	gameNightPlanHeader: ">Gamenight planning<",
	languageChangeHeader:">Language Select<\n",
	languageChangeQuestion: "Which Language do you want to choose?\n",
	mainMenuHeader: ">Main menu<\n",
	managementModeHeader: ">Management Mode<\n",
	applicationModeHeader: ">Application Mode<\n",
	managePlayersHeader: ">Manage Players<\n",
	rateGamesHeader: ">Rate Games<\n",
	editPlayerHeader: ">Edit player<\n",
	manageGamesHeader: ">Edit games<\n",
	deleteGamesHeader: ">Delete games<\n",
	importModeHeader: ">Import data<\n",
	chooseFileQuestion: "Choose a file: \n",
	choosePlayerHeader: ">Player select<\n",
	choosePlayerQuestion: "Choose a player\n",
	deletePlayerHeader: ">Delete Player<\n",
	playerNotDeleted: "Player has not been deleted!",
	chooseGameHeader: ">Game select<\n",
	chooseGameQuestion: "Choose a game\n",
	confirmQuestionCreator: (confirmQuestion, i) => {
		switch(i){
			case 0:
				return `${confirmQuestion}\n Insert`;
			case 1:
				return `\"n\" to deny`;
			case 2:
				return `or`;
			case 3:
				return `\"y\" to confirm.\n`;
		}
	},
	addGameHeader: `>Add game<\n`,
	addGameQuestion: `Which game do you want to add?\n`,
	addPlayerHeader: `>Add player<\n`,
	addPlayerNameQuestion: `Insert the name, of the new player: `,
	addPlayerGameQuestion: `\nInsert the names of the game, which are owned by the new player. \n (Seperate every game with a comma [,]. Wenn you're done type a semicolon [;] at the end. -> E.g. A,B,C;)\n`,
	exportModeHeader: `>Export Mode<\n`,
	createExportHeader: `>Create Export<\n`,
	createExportFileQuestion: `Insert the export filename: \,`,
	rateGameQuestion: (gameName, playerName) => {return `Player ${playerName}, please rat the game ${gameName}`},
	ratingNoticeOutput: (gameName, ratingValue) => {return `You've rated ${gameName} with ${ratingValue}.`},
	ratingValidationQuestion: (gameName) => {return `DO you want to rate the next game or change your rating for ${gameName}?`},
	mainMenuSelectTitle: "Please choose a mode. \n",
	exportLoopOutput: "Do you want to add the current date to the filename?",
	addGameToPlayerQuestion: (gameName, playerName) => {return `Do you really want to add the game ${gameName} to the player ${playerName}?`},
	noData: "No Data has been found!",
	importOrder: "Please import data first!",
	optionTextGlobalOrIndividual: "Do you want to delete game from a user or globally?",
	deleteGameTitle: ">Delete Game<\n",
	deleteConfirmText: "Confirm delete",
	deleteGameFromPlayer: (gameToDelete, player) => {return `Are you sure, that you want to delete ${gameToDelete} from the player ${player}?`},
	deletePlayerQuestion: (playerName) => {return `Do you really want to delete the player ${playerName}?`},
	exportDataMissingText: "Please start the application mode first and rate the games!",
	indexIssueOutput: "Something went wrong with the index!",
	return: "Return",
	player: "Player",
	global: "Globally",
	yes: "Yes",
	no: "No",
	nextGame: "Next game",
	changeRating: "Change rating",
	exportCompletedMsg: "Data has been exported!",
	gameHasBeenAdded: "Game has been added to chosen Player!",
	oneByOne: "Add one by one",
	addEveryPlayer: "Add every Player",
	addToGameNightQuestion: "Do you want to add every Player or add them one by one to the gamenight?",
	addPlayersToGameNightTitle: "Add Players to gamesnight",
	addPlayerToGameNightQuestion: (playerName) => {return `Do you want to add the Player ${playerName} to the Gamesnight?`},
	choosenGameChoice: "According to the reviews, this game should be played:",
	editPlayerQuestion: "Do you want to change the name of a player or edit a game of the player?",
	changeGameQuestion: "Which game do you want to edit?",
	changeGameEditChoice: "Do you want to delete the name of the game or delete it from the player?",
	changeGameNameQuestion: "Do you want to change the name of the game (globally)?",
	topThreeGames: (arr) => {return `-------\nTop 3 best rated Boardgames\n1.Place: ${arr[0]} with a rating of ${arr[1]}\n2.Place: ${arr[2]} with a rating of ${arr[3]}\n3.Place: ${arr[4]} with a rating of ${arr[5]}\n`},
	threeMostPlayed: (arr) => {return `-------\nMost played games\n1.Place: ${arr[0]}\n2.Place: ${arr[1]}\n3.Place: ${arr[2]}\n`},
	playerRatingHeader: (name) => {return `-------\nPlayer: ${name}\nGame;Rating\n`},
	playerRatingLine: (name, rating) => {
		if(rating === "No rating asigned yet!"){
			return `${name}, not rated by player\n`
		}
		else{
			return `${name}, ${rating}\n`
		}
	},
	averageRatingHeader: () => {return `-------\nAverage ratings of most recent gamenight\nGame; Rating; Has Veto\n`},
	averageRatingLine: (name, rating, veto) => {
		if(veto){
			return `${name}; ${rating}; has atleast one Veto\n`
		}
		else{
			return `${name}; ${rating}; No Veto\n`
		}
	},
	notEoughPlayersError: "Not enough players for gamenight",
	notEnoughPlayersOrder: "You need atleast 2 players for a gamenight",
	vetoSetText: "Set Veto",
	vetoResetText: "Withdraw Veto",
	tutorial: `This tutorial teaches you step by step how to use the application. If a step tells you to navigate to a certain spot you are supposed to do so with the arrow keys and you need to confirm with the enter key.
	\nstep 0: Navigate to "Sprache einstellen" to change the language from german (default) to english.
	\nstep 1: Navigate to "Importmode" to enter it.
	\nstep 2: Navigate to your desired import file to import it.
	\nstep 3 (optional): After the import you are sent back to the main menu. Navigate to "Management Mode" to enter it. In this mode you can manage players, their boardgames, set up a games night and check the current list of players.
	\nstep 4: Navigate to "Application Mode" to enter it.
	\nstep 5: Navigate to "Start Application" to set up a games night. To do so you need to choose if you want to include all players from the current list of players or if you want to choose certain people.
	\nstep 6: Navigate to an appropriate rating for each boardgame.
	\nstep 7: Navigate to "Change Rating" if you want to change a rating you just set. Navigate to "set VETO" (only 1 VETO can be set per player per games night) if you do not want to play that game during the games night.
	\nstep 8 (optional): If you want to cancel the rating process, you can navigate to "cancel rating" so the rating process of the current gamenight will be cancelled.
	\nstep 9: The matchmaking system will choose a boardgame after all boardgames have been rated and VETOs have been set. Navigate to "Ok" to get back to the main manu.
	\nstep 10: Navigate to "Export Mode" to enter it.
	\nstep 11: Navigate to "Create Export file" and name it appropriately.
	\nstep 12: Press n if you do not want to set the current date as suffix after the given export file name. Press y if you do want to set the current date as suffix after the given export file name.
	\nstep 13: Navigate to "Ok" to get back to the main menu.`,
	cancelVoting: "Cancel ranking",
	cancelVotingQuestion: "Are you sure you want to cancel the voting?",
	chosenGameTitleExport: `This game was played on the last gamenight: \n`
}

const ITALIAN = {
	ratingOptions:["Molto bene", "Bene", "Non male", "É non molto bene", "Male"],
	mainMenu: [
		"EXIT",
		"Tutorial",
		"Cambiare la lingua",
		"Modelità di importazione",
		"Modelità di applicazione",
		"Modelità di amministrazione",
		"Modelità di espotare"
	],
	languages: ["Tedesco", "Italiano", "Inglese", "Turco"],
	managementModeMenu: [
		"Indietro al menù principale",
		"Amministrazione dei giocatori",
		"Amministrazione dei giochi",
		"Amministrazione del serale di gioco",
		"Lista dei giocatori"
	],
	applicationModeMenu: [
		"Ritorno al menù principale",
		"Cominciare l'applicazione"
	],
	managePlayersMenu: [
		"Ritorno",
		"Aggiungere dei giocatori",
		"Modificare dei giocatori",
		"Spegnere dei giocatori"
	],
	editGameMenu: [
		"Ritorno",
		"Modificate il nome",
		"Spegnere un gioco"
	],
	editPlayersMenu: [
		"Ritorno", 
		"Modificare il nome",
		"Modificare i giochi"
	],
	manageGamesMenu: [
		"Ritorno",
		"Aggiungere dei giochi",
		"Modificare dei giochi",
		"Spegnere dei giochi"
	],
	deleteGamesMenu: [
		"Ritorno",
		"Spegnere un gioco da un giocatore",
		"Spegnere un gioco globale"
	],
	exportMenu: [
		"Ritorno al menù principale",
		"Creare un file esporto"
	],
	gameNightPlanHeader: ">Pianificazione della serata di gioco<",
	mainMenuHeader: ">Menù principale<\n",
	languageChangeHeader:">Selezione della lingua<\n",
	languageChangeQuestion: "Quale lingua vuoi selezionare?\n",
	managementModeHeader: ">Modelità di amministrazione<\n",
	applicationModeHeader: ">Modelità di applicazione<\n",
	managePlayersHeader: ">Gestisci i giocatori<\n",
	rateGamesHeader: ">Valuta i giochi<\n",
	deletePlayerHeader: ">Rimuovere il giocatore<\n",
	playerNotDeleted: "Il giocatore non è stato rimuovuto!",
	editPlayerHeader: ">Modifica giocatore<\n",
	manageGamesHeader: ">Modifica i giochi<\n",
	deleteGamesHeader: ">Rimuovere i giochi<\n",
	importModeHeader: ">Importa dati<\n",
	chooseFileQuestion: "Scegli un file: \n",
	choosePlayerHeader: ">Selezione del giocatore<\n",
	choosePlayerQuestion: "Scegli un giocatore\n",
	chooseGameHeader: ">Selezione del giochi<\n",
	chooseGameQuestion: "Scegli un gioco\n",
	confirmQuestionCreator: (confirmQuestion, i) => {
		switch(i){
			case 0:
				return `${confirmQuestion}\n Premi `;
			case 1:
				return `\"n\" per rifiutare`;
			case 2:
				return `o`;
			case 3:
				return `\"y\" per accettare.\n`;
		}
	},
	deleteGameFromPlayer: (gameToDelete, player) => {return `Sei sicuro di voler eliminare il gioco ${gameToDelete} dal giocatore ${player}?`},
	addGameHeader: `>Aggiungi un gioco<\n`,
	addGameQuestion: `Quale gioco vorresti aggiungere?\n`,
	addPlayerHeader: `>Aggiungi giocatori<\n`,
	addPlayerNameQuestion: `Inserisci il nome del giocatore che vuoi aggiungere: `,
	addPlayerGameQuestion: `\nInserisci i nomi dei giochi che possiede il giocatore. \n (Separa ogni gioco con una virgola[,]. Quando hai finito, aggiungi un punto e virgola [;] alla fine. -> Bsp: A,B,C;)\n`,
	exportModeHeader: `>modalità di esportazione<\n`,
	createExportHeader: `>Creare l'esportazione<\n`,
	createExportFileQuestion: `Immettere il nome del file di esportazione: \n`,
	rateGameQuestion: (gameName, playerName) => {return `Giocatore ${playerName}, per favore valuta il gioco ${gameName}`},
	ratingNoticeOutput: (gameName, ratingValue) => {return `Hai valutato il gioco ${gameName} con ${ratingValue}.`},
	ratingValidationQuestion: (gameName) => {return `Vuoi dare un voto al prossimo gioco o cambiare il tuo punteggio per ${gameName}?`},
	mainMenuSelectTitle: "Seleziona una modalità. \n",
	exportLoopOutput: "uoi aggiungere la data odierna al nome del file?",
	addGameToPlayerQuestion: (gameName, playerName) => {return `uoi davvero aggiungere il gioco ${gameName} al giocatore ${playerName}?`},
	noData: "Nessun dato trovato!",
	importOrder: "Si prega di importare prima i dati!",
	optionTextGlobalOrIndividual: "Vuoi eliminare questo gioco da un utente o globalmente?",
	deleteGameTitle: "Rimuovere il gioco",
	deleteConfirmText: "Confermare il rimuoverazione",
	deletePlayerQuestion: (playerName) => {return `Vuoi davvero rimuovere il giocatore ${playerName}?`},
	exportDataMissingText: "Avvia prima la modalità applicazione e valuta i giochi!",
	indexIssueOutput: "C'è und errore con l'indice!",
	return: "Ritornare",
	player: "Giocatore",
	global: "Globalmente",
	yes: "Sì",
	no: "No",
	nextGame: "Prossimo gioco",
	changeRating: "Cambia valutazione",
	exportCompletedMsg: "I dati sono stati esportati!",
	gameHasBeenAdded: "Il gioco è stato aggiunto al giocantore!",
	oneByOne: "Aggiungi i giocatori uno per uno",
	addEveryPlayer: "Aggiungi ogni giocatore",
	addToGameNightQuestion: "Vuoi aggiungere ogni giocatore individualmente o tutti i giocatori direttamente? ",
	addPlayersToGameNightTitle: "Aggiungi i giocatori alla serata di gioco ",
	addPlayerToGameNightQuestion: (playerName) => {return `Vuoi aggiungere il giocatore ${playerName} alla serata di gioco?`},
	choosenGameChoice: "Secondo le recensioni, questo gioco è giocato:",
	editPlayerQuestion: "Vuoi cambiare il nome di un giocatore o modificare una partita del giocatore?",
	changeGameQuestion: "Quale gioco vuoi rimuovere?",
	changeGameEditChoice: "Vuoi eliminare il nome del gioco o rimuoverlo dal giocatore?",
	changeGameNameQuestion: "Vuoi cambiare il nome del gioco (globale)?",
	topThreeGames: (arr) => {return `-------\nI 3 giochi da tavolo più votati\n1.Posto: ${arr[0]} con il voto di ${arr[1]} punti\n2.Posto: ${arr[2]} con il voto di ${arr[3]} punti\n3.Posto: ${arr[4]} con il voto di ${arr[5]} punti\n`},
	threeMostPlayed: (arr) => {return `-------\nLe partite più giocate\n1.Posto: ${arr[0]}\n2.Posto: ${arr[1]}\n3.Post: ${arr[2]}\n`},
	playerRatingHeader: (name) => {return `-------\nGiocatore: ${name}\nGioco;Voto\n`},
	playerRatingLine: (name, rating) => {
		if(rating === "No rating asigned yet!"){
			return `${name}, non valutato dal giocatore\n`
		}
		else{
			return `${name}, ${rating}\n`
		}
	},
	averageRatingHeader: () => {return `-------\nValutazioni medie della serata di gioco più recente\nGioco; Voto; Ha Veto\n`},
	averageRatingLine: (name, rating, veto) => {
		if(veto){
			return `${name}; ${rating}; ha almeno un Veto\n`
		}
		else{
			return `${name}; ${rating}; non ha Veto\n`
		}
	},
	notEoughPlayersError: "Non abbastanza giocatori per la serata di gioco",
	notEnoughPlayersOrder: "Hai bisogno di almeno 2 giocatori per una serata di gioco",
	vetoSetText: "Usa il veto",
	vetoResetText: "Ritiro Veto",
	tutorial: `Questo tutorial ti insegna passo dopo passo come utilizzare l'applicazione. Se un passaggio ti dice di navigare in un determinato punto, dovresti farlo con i tasti freccia e devi confermare con il tasto Invio.
	\npassaggio 0: Passa a "Sprache einstellen" per cambiare la lingua dal tedesco (predefinito) all'inglese.
	\npassaggio 1: vai su "Importmode" per accedervi.
	\npassaggio 2: vai al file di importazione desiderato per importarlo.
	\npassaggio 3 (opzionale): dopo l'importazione si torna al menu principale. Passare a "Modalità di gestione" per accedervi. In questa modalità puoi gestire i giocatori, i loro giochi da tavolo, organizzare una serata di giochi e controllare l'elenco attuale dei giocatori.
	\npassaggio 4: vai a "Modalità applicazione" per accedervi.
	\npassaggio 5: vai su "Avvia applicazione" per impostare una serata di giochi. Per farlo devi scegliere se vuoi includere tutti i giocatori dall'attuale elenco di giocatori o se vuoi scegliere determinate persone.
	\npassaggio 6: passa a una valutazione appropriata per ogni gioco da tavolo.
	\npassaggio 7: vai a "Modifica valutazione" se desideri modificare una valutazione che hai appena impostato. Passa a "imposta VETO" (è possibile impostare solo 1 VETO per giocatore per notte di gioco) se non vuoi giocare a quel gioco durante la notte di gioco.
	\npassaggio 8 (opzionale): Se desideri annullare il processo di valutazione, puoi accedere a "cancella valutazione" in modo che il processo di valutazione della serata di gioco in corso venga annullato.
	\npassaggio 9:Il sistema di matchmaking sceglierà un gioco da tavolo dopo che tutti i giochi da tavolo sono stati valutati e sono stati impostati i VETO. Passare a "Ok" per tornare al menu principale.
	\npassaggio 10: Passa a "Modalità esportazione" per accedervi.
	\npassaggio 11: Vai a "Crea file di esportazione" e denominalo in modo appropriato.
	\npassaggio 12: premere n se non si desidera impostare la data corrente come suffisso dopo il nome del file di esportazione specificato. Premere y se si desidera impostare la data corrente come suffisso dopo il nome del file di esportazione specificato.
	\npassoggio 13: vai su "Ok" per tornare al manuale principale.`,
	cancelVoting: "Annulla recensione",
	cancelVotingQuestion: "Sei sicuro di voler cancellare la recensione?",
	chosenGameTitleExport: `Questa gioco è stata giocata l'ultima notte di gioco: \n`,
}

const TURKISH = {
	ratingOptions:["Çok iyi", "Iyi", "Fena değil", "Çok iyi değil", "Kötü"],
	mainMenu: [
		"EXIT",
		"Tutorial",
		"Dili değiştir",
		"İçe aktarma modu",
		"Uygulama modu",
		"Yönetim modu",
		"İhracat modları"
	],
	languages: ["Almanca", "İtalyan", "İngilizce", "Türkçe"],
	managementModeMenu: [
		"Ana menüye dön",
		"Oyuncu yönetimi",
		"Oyun yönetimi",
		"Oyun gecesi planlaması",
		"Oyuncu listesi"
	],
	applicationModeMenu: [
		"Ana menüye dön",
		"Uygulamayı başlat"
	],
	managePlayersMenu: [
		"Geri dön",
		"Oyuncu ekle",
		"Oyuncuyu düzenle",
		"Oyuncuyu sil"
	],
	editGameMenu: [
		"Geri dön",
		"Oyun adıyi düzenle",
		"Oyunu sil"
	],
	editPlayersMenu: [
		"Geri dön", 
		"Adı düzenle",
		"Oyunları düzenle"
	],
	manageGamesMenu: [
		"Geri dön",
		"Oyun ekle",
		"Oyunu düzenle",
		"Oyunu sil"
	],
	deleteGamesMenu: [
		"Geri dön",
		"Oyuncudan oyunu sil",
		"Oyunu global olarak sil"
	],
	exportMenu: [
		"Ana menüye dön",
		"Dışa aktarma dosyası oluştur"
	],
	gameNightPlanHeader: ">Oyun akşamı planlaması<",
	mainMenuHeader: ">Ana menü<\n",
	languageChangeHeader:">Dili değiştir<\n",
	languageChangeQuestion: "Hangi dili seçmek istiyorsunuz?\n",
	managementModeHeader: ">Yönetim modu<\n",
	applicationModeHeader: ">Uygulama modu<\n",
	managePlayersHeader: ">Oyuncuları yönet<\n",
	rateGamesHeader: ">Oyunları değerlendirin<\n",
	editPlayerHeader: ">Oyuncuyu düzenle<\n",
	manageGamesHeader: ">Oyunları düzenle<\n",
	deletePlayerHeader: ">Oyuncuyu sil<\n",
	playerNotDeleted: "Oyuncu silinmedi!",
	deleteGamesHeader: ">Oyunları kaldır<\n",
	importModeHeader: ">Verileri içe aktar<\n",
	chooseFileQuestion: "Bir dosya seçin: \n",
	choosePlayerHeader: ">Oyuncu seçimi<\n",
	choosePlayerQuestion: "Bir oyuncu seçin\n",
	chooseGameHeader: ">Oyun seçimi<\n",
	chooseGameQuestion: "Bir oyun seçin\n",
	confirmQuestionCreator: (confirmQuestion, i) => {
		switch(i){
			case 0:
				return `${confirmQuestion}\n Reddetmek için `;
			case 1:
				return `\"n\" bas`;
			case 2:
				return `yoksa`;
			case 3:
				return `\"y\" bas, kabul etmek istersen.\n`;
		}
	},
	deleteGameFromPlayer: (gameToDelete, player) => {return `${gameToDelete} oyununu ${player} oyuncusundan silmek istediğinizden emin misiniz??`},
	addGameHeader: `>Oyun ekle<\n`,
	addGameQuestion: `Hangi oyunu eklemek istersin?\n`,
	addPlayerHeader: `>Oyuncu ekle<\n`,
	addPlayerNameQuestion: `Eklemek istediğiniz oyuncunun adını girin: `,
	addPlayerGameQuestion: `\nOyuncunun sahip olduğu oyunların adlarını yasin. \n (Her oyunu virgülle [,] ayırın. şiniz bittiğinde, sonuna noktalı virgül [;] ekleyin. -> Ö.v. A,B,C;)\n`,
	exportModeHeader: `>Dışa aktarma modu<\n`,
	createExportHeader: `>Dışa aktarmayı oluştur<\n`,
	createExportFileQuestion: `Dışa aktarma dosyasının adını girin: \n`,
	rateGameQuestion: (gameName, playerName) => {return `Oyuncu ${playerName}, lütfen oyuna ${gameName} oy verin`},
	ratingNoticeOutput: (gameName, ratingValue) => {return `${gameName} oyununu ${ratingValue} ile eşleştirdin.`},
	ratingValidationQuestion: (gameName) => {return `Bir sonraki oyuna oy vermek istiyormusun yoksa tekrar ${gameName} oy vermek ister misiniz?`},
	mainMenuSelectTitle: "Bir mod seçin. \n",
	exportLoopOutput: "Dosya adına bugünün tarihini eklemek istiyorsunuz?",
	addGameToPlayerQuestion: (gameName, playerName) => {return `${gameName} oyununu gerçekten ${playerName} oyuncusuna eklemek istiyor musunuz?`},
	noData: "Veri bulunamadı!",
	importOrder: "Lütfen önce verileri ayarlayın!",
	optionTextGlobalOrIndividual: "Bu oyunu bir kullanıcı tarafından mı yoksa genel olarak mı silmek istiyorsunuz?",
	deleteGameTitle: "Oyunu kaldır",
	deleteConfirmText: "Kaldırma işlemini onaylayın",
	deletePlayerQuestion: (playerName) => {return `${playerName} adlı oyuncuyu gerçekten kaldırmak istiyor musunuz?`},
	exportDataMissingText: "Önce uygulama modunu başlatın ve oyunları derecelendirin!",
	indexIssueOutput: "Dizinde bir sorun var!",
	return: "Dönüş",
	player: "Oyuncu",
	global: "Küresel olarak",
	yes: "Evet",
	no: "Hayir",
	nextGame: "Sonraki oyun",
	changeRating: "Derecelendirmeyi değiştir",
	exportCompletedMsg: "Veriler dışa aktarıldı!",
	gameHasBeenAdded: "Oyun oyuncuya eklendi!",
	oneByOne: "Oyuncuları tek tek ekleyin",
	addEveryPlayer: "Her oyuncuyu ekle",
	addToGameNightQuestion: "Her oyuncuyu tek tek mi yoksa tüm oyuncuları doğrudan mı eklemek istiyorsunuz?",
	addPlayersToGameNightTitle: "Oyun gecesine oyuncu ekle",
	addPlayerToGameNightQuestion: (playerName) => {return `Ouncuyu ${playerName}'i oyun gecesine eklemek ister misiniz?`},
	choosenGameChoice: "İncelemelere göre, bu oyun oynanır:",
	editPlayerQuestion: "Bir oyuncunun adını değiştirmek mi yoksa oyuncunun oyununu düzenlemek mi istiyorsunuz?",
	changeGameQuestion: "Hangi oyunu değiştirmek istiyorsunuz?",
	changeGameEditChoice: "Oyunun adını değiştirmek mi yoksa oyuncudan silmek mi istiyorsunuz?",
	changeGameNameQuestion: "Oyunun adını (küresel olarak) değiştirmek istiyor musunuz?",
	topThreeGames: (arr) => {return `-------\nEn çok oy alan 3 Masa Oyunu\nBirinci: ${arr[0]}, ${arr[1]} puanla\nIkinci: ${arr[2]}, ${arr[3]} puanla\nÜçüncü: ${arr[4]}, ${arr[5]} puanla\n`},
	threeMostPlayed: (arr) => {return `-------\nEn çok oynanan oyunlar \nBirinci: ${arr[0]}\nIkinci: ${arr[1]}\nÜcüncü: ${arr[2]}\n`},
	playerRatingHeader: (name) => {return `-------\nOyuncu: ${name}\nOyun;Puan\n`},
	playerRatingLine: (name, rating) => {
		if(rating === "No rating asigned yet!"){
		return `${name}, oyuncu bu oyuna puan vermedi\n`
	}
	else{
		return `${name}, ${rating}\n`
	}
},
	averageRatingHeader: () => {return `-------\nEn son oyun gecesinin ortalama puanları\nOyun; Puan; Veto var mi\n`},
	averageRatingLine: (name, rating, veto) => {
		if(veto){
			return `${name}; ${rating}; en az bir Veto'ya sahip\n`
		}
		else{
			return `${name}; ${rating}; Veto yok\n`
		}
	},
	notEoughPlayersError: "Oyun gecesi için yeterli oyuncu yok",
	notEnoughPlayersOrder: "Bir oyun gecesi için en az 2 oyuncuya ihtiyacınız var",
	vetoSetText: "Veto Ayarla",
	vetoResetText: "Veto'yu geri çek",
	tutorial: `Bu eğitim size uygulamayı nasıl kullanacağınızı adım adım öğretir. Bir adım size belirli bir noktaya gitmenizi söylüyorsa, bunu yön tuşlarıyla yapmanız ve enter tuşuyla onaylamanız gerekir.
	\nadım 0: Dili almancadan (varsayılan) ingilizceye değiştirmek için "Sprache einstellen"e gidin.
	\nadım 1: Girmek için "İçe Aktarma Modu"na gidin.
	\nadım 2: İçe aktarmak için istediğiniz içe aktarma dosyasına gidin.
	\nadım 3: (isteğe bağlı): İçe aktarmadan sonra ana menüye geri gönderilirsiniz. Girmek için "Yönetim Modu"na gidin. Bu modda oyuncuları, masa oyunlarını yönetebilir, bir oyun gecesi ayarlayabilir ve mevcut oyuncu listesini kontrol edebilirsiniz.
	\nadım 4: Girmek için "Uygulama Modu"na gidin.
	\nadım 5: Bir oyun gecesi ayarlamak için "Uygulamayı Başlat"a gidin. Bunu yapmak için, mevcut oyuncu listesinden tüm oyuncuları dahil etmek isteyip istemediğinizi veya belirli kişileri seçmek isteyip istemediğinizi seçmeniz gerekir.
	\nadım 6: Her masa oyunu için uygun bir derecelendirmeye gidin.
	\nadım 7: Yeni ayarladığınız bir derecelendirmeyi değiştirmek istiyorsanız "Derecelendirmeyi Değiştir"e gidin. Oyun gecesi boyunca o oyunu oynamak istemiyorsanız, "VETO'yu ayarla"ya gidin (oyun gecesi başına oyuncu başına sadece 1 VETO ayarlanabilir).
	\nadım 8: (isteğe bağlı): Derecelendirme sürecini iptal etmek istiyorsanız, mevcut oyun gecesinin derecelendirme işleminin iptal edilmesi için "derecelendirmeyi iptal et" seçeneğine gidebilirsiniz.
	\nadım 9: Tüm masa oyunları derecelendirildikten ve VETO'lar ayarlandıktan sonra çöpçatanlık sistemi bir masa oyunu seçecektir. Ana menüye geri dönmek için "Tamam"a gidin.
	\nadım 10: Girmek için "Dışa Aktarma Modu"na gidin.
	\nadım 11: "Dışa Aktarma dosyası oluştur" seçeneğine gidin ve uygun şekilde adlandırın.
	\nadım 12: Verilen dışa aktarma dosyası adından sonra geçerli tarihi sonek olarak ayarlamak istemiyorsanız n'ye basın. Verilen dışa aktarma dosyası adından sonra geçerli tarihi sonek olarak ayarlamak istiyorsanız y tuşuna basın.
	\nadım 13: Ana manuya geri dönmek için "Tamam"a gidin.`,
	cancelVoting: "İncelemeyi iptal et",
	cancelVotingQuestion: "İncelemeyi iptal etmek istediğinizden emin misiniz?",
	chosenGameTitleExport: "Bu oyun son oyun gecesinde oynandı: \n",
	 
}

const MODES = {
	EXIT: 0,
	TUTORIAL: 1,
	LANGUAGE: 2,
	IMPORT: 3,
	APPLICATION: 4,
	MANAGEMENT: 5,
	EXPORT: 6 
}

const MANAGEMENT_MODES = {
	RETURN: 0,
	MANAGE_PLAYERS: 1,
	MANAGE_GAMES: 2,
	PLAN_GAMENIGHT: 3,
	SHOW_PLAYERS: 4,
}

const MANAGEMENT_PLAYERS_MODES = {
	RETURN: 0,
	ADD: 1, 
	EDIT: 2,
	DELETE: 3
}

const EDIT_PLAYERS = {
	RETURN: 0,
	NAME: 1,
	GAME: 2
}

const MANAGEMENT_GAMES_MODES = {
  RETURN: 0,
  ADD: 1, 
  EDIT: 2,
  DELETE: 3 
}

const DELETE_GAME = {
	RETURN: 0,
	GLOBAL: 1,
	PLAYER: 2
}

exports.MODES = MODES;
exports.MANAGEMENT_MODES = MANAGEMENT_MODES
exports.MANAGEMENT_PLAYERS_MODES = MANAGEMENT_PLAYERS_MODES
exports.EDIT_PLAYERS = EDIT_PLAYERS
exports.MANAGEMENT_GAMES_MODES = MANAGEMENT_GAMES_MODES
exports.DELETE_GAME = DELETE_GAME
exports.GERMAN = GERMAN;
exports.TURKISH = TURKISH;
exports.ENGLISH = ENGLISH;
exports.ITALIAN = ITALIAN;
