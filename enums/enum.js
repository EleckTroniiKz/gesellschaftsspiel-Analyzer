const GERMAN = {
	ratingOptions:["Sehr gut", "Gut", "Nicht schlecht", "Nicht so gut", "Schlecht"],
	mainMenu: [
		"EXIT",
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
				return `${confirmQuestion}\n Drücke`;
			case 1:
				return `\"n\" um abzulehnen`;
			case 2:
				return `oder`;
			case 3:
				return `\"y\" um zuzustimmen.\n`;
		}
	},
	addGameHeader: `>Füge Spiel hinzu<\n`,
	addGameQuestion: `Welches Spiel möchtest du hinzufügen?\n`,
	addPlayerHeader: `>Füge Spieler hinzu<\n`,
	addPlayerNameQuestion: `Gib den Namen des Spielers ein, den du hinzufügen möchtest: `,
	addPlayerGameQuestion: `\nGib die Namen der Spiele ein, die der Spieler besitzt. \n (Trenne jedes Spiel mit einem Komma[,]. Wenn du fertig bist, schreib am Ende ein Semikolon[;]. -> Bsp: A,B,C;)\n`,
	exportModeHeader: `>Exportmodus<\n`,
	createExportHeader: `>Erstelle Export<\n`,
	createExportFileQuestion: `Gib den Namen der Exportdatei an: `,
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
	exportDataMissingText: "Bitte starte zuerst den Anwensungsmodus und bewerte die Spiele!",
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
	revoteChoice: "Wir wollen nochmal wählen",
	choosenGameChoice: "Laut den Bewertungen sollte dieses Spiel gespielt werden:",
}

const ENGLISH = {
	ratingOptions:["very good", "good", "not bad", "not so good", "bad"],
	mainMenu: [
		"EXIT",
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
	createExportFileQuestion: `Insert the export filename: `,
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
	revoteChoice: "We want to vote again",
	choosenGameChoice: "According to the reviews, this game should be played:",
}

const ITALIAN = {
	ratingOptions:["Molto bene", "Bene", "Non male", "É non molto bene", "Male"],
	mainMenu: [
		"EXIT",
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
	createExportFileQuestion: `Immettere il nome del file di esportazione: `,
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
	revoteChoice: "Vogliamo votare di nuovo",
	choosenGameChoice: "Secondo le recensioni, questo gioco è giocato:",
}

const TURKISH = {
	ratingOptions:["Çok iyi", "Iyi", "Fena değil", "Çok iyi değil", "Kötü"],
	mainMenu: [
		"EXIT",
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
	aapplicationModeMenu: [
		"Ana menüye dön",
		"Uygulamayı başlat"
	],
	managePlayersMenu: [
		"Geri dön",
		"Oyuncu ekle",
		"Oyuncuyu düzenle",
		"Oyuncuyu sil"
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
	createExportFileQuestion: `Dışa aktarma dosyasının adını girin: `,
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
	revoteChoice: "Tekrar oy istiyoruz",
	choosenGameChoice: "İncelemelere göre, bu oyun oynanır:",
}

const MODES = {
	EXIT: 0,
	LANGUAGE: 1,
	IMPORT: 2,
	APPLICATION: 3,
	MANAGEMENT: 4,
	EXPORT: 5
}

const MANAGEMENT_MODES = {
	RETURN: 0,
	MANAGE_PLAYERS: 1,//MUST
	MANAGE_GAMES: 2, //MUST
	PLAN_GAMENIGHT: 3, //MUST
	SHOW_PLAYERS: 4,
}

const MANAGEMENT_PLAYERS_MODES = {
	RETURN: 0,
	ADD: 1, //MUST
	EDIT: 2, //NICETOHAVE
	DELETE: 3 //MUST
}

const EDIT_PLAYERS = {
	RETURN: 0,
	NAME: 1,
	GAME: 2
}

const MANAGEMENT_GAMES_MODES = {
  RETURN: 0,
  ADD: 1, //MUST
  EDIT: 2, //NICETOHAVE
  DELETE: 3 //MUST
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
