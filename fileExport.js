const fs = require("fs");

class Export {
  /**
   * @description puts player names, games and rating values into string
   * @param session instance of DataHandler class
   * @returns data string
   */
  setPlayerRatingCSV(session, language) {
    let data = "";
    let userList = session.getUserObjectList();
    for (let i = 0; i < userList.length; i++) {
      data += language.playerRatingHeader(userList[i].getName());
      let map = userList[i].getRating();
      let k = Array.from(map.keys());

      //content
      for (let key = 0; key < k.length; key++) {
        data += language.playerRatingLine(k[key], map.get(k[key]));
      }
      //last line
      data += "\n";
    }
    return data;
  }

  /**
   * @description gets the most played games from localstorage and puts them into a string
   * @param session instance of DataHandler class
   * @returns data string
   */
  setMostPlayedCSV(session, language) {
    let data = "\n";
    let mostPlayed = session.getPlayedGamesMap();
    let games = Array.from(mostPlayed.keys());
    data += language.threeMostPlayed([
      games[games.length - 1],
      games[games.length - 2],
      games[games.length - 3],
    ]);
    return data;
  }

  /**
   * @description gets the best rated games from localstorage (only from the same gamenight) and puts them into a string
   * @param session instance of DataHandler class
   * @returns data string
   */
  setBestRatedCSV(session, language) {
    let data = "\n";
    let gamesnight = session.getGamesNightObject();
    let ratings = gamesnight.getRating();
    let ratingKeys = Array.from(ratings.keys());
    data += language.topThreeGames([
      ratingKeys[ratingKeys.length - 1],
      ratings.get(ratingKeys[ratingKeys.length - 1]),
      ratingKeys[ratingKeys.length - 2],
      ratings.get(ratingKeys[ratingKeys.length - 2]),
      ratingKeys[ratingKeys.length - 3],
      ratings.get(ratingKeys[ratingKeys.length - 3]),
    ]);
    return data;
  }

  /**
   * @description puts the average rating for every game from the gamenight into datastring
   * @param session instance of DataHandler class
   * @returns data string
   */
  setAvgRatingCSV(session, language) {
    //Initialize empty data string so you can append data with +=
    let data = "";
    data += language.averageRatingHeader();
    let gameNight = session.getGamesNightObject();
    let ratingMap = gameNight.getRating();
    let vetoMap = gameNight.getVetoList();
    let games = Array.from(ratingMap.keys());
    for (let i = 0; i < games.length; i++) {
      data += language.averageRatingLine(
        games[i],
        ratingMap.get(games[i]),
        vetoMap.get(games[i])
      );
    }
    return data;
  }

  /**
   * @description sets the chosen game string for export
   * @param language language enum 
   * @param chosenGame game which was chosen in last gamenight
   * @returns 
   */
  setChosenGame(language, chosenGame){
    let data = "-------\n"; 
    data += language.chosenGameTitleExport
    data += chosenGame
    data += "\n"
    return data;
  }


  /**
   * @description calls the functions to get all the data for the export
   * @param session instance of DataHandler class
   * @returns data string
   */
  setExportData(session, language, chosenGame) {
    //Initialize empty data string so you can append data with +=
    let data = "\n";
    data += this.setPlayerRatingCSV(session, language);
    data += this.setAvgRatingCSV(session, language);
    data += this.setBestRatedCSV(session, language);
    data += this.setChosenGame(language, chosenGame)
    data += this.setMostPlayedCSV(session, language);
    return data;
  }

  /**
   *
   * @param data data which will be written into the file
   * @param name name of file
   * @param addDateToFile determines of the file will have the creation date as a suffix
   */
  createExport(data, name = "export", addDateToFile = true) {
    if (addDateToFile) {
      let date = new Date();
      date = date.toLocaleDateString("en-US");
      let strDate = date.toString();
      strDate = strDate.replaceAll("/", "_");

      //with date in filename
      fs.writeFileSync(`.//DataExport//${name}_${strDate}.csv`, data);
    } else {
      //without date in filename
      fs.writeFileSync(`.//DataExport//${name}.csv`, data);
    }
  }
}

//Export
exports.Export = Export;
