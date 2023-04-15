export function resultsTableHelper(playerArray, scoreArray) {
    const results = [];

    playerArray.forEach(element => {
        const homeGames = scoreArray.filter(el => el.player_1 === element.name);
        const awayGames = scoreArray.filter(el => el.player_2 === element.name);

        let playerData = {
            playerName: element.name,
            leaguePoints: 0,
            games: homeGames.length + awayGames.length,
            wonSets: 0,
            lostSets: 0,
            pointsWon: 0,
            pointsLost: 0,
        }

// nie liczy jednej kolejki
        homeGames.forEach(game => {
            if (game.player_1_points > game.player_2_points) {
                playerData.wonSets += 1;
                playerData.leaguePoints += 2;
                playerData.pointsWon += game.player_1_points;
                playerData.pointsLost += game.player_2_points;
            }
            else {
                playerData.pointsWon += game.player_1_points;
                playerData.pointsLost += game.player_2_points;
            }
        })

        awayGames.forEach(game => {
            if (game.player_2_points > game.player_1_points) {
                playerData.wonSets += 1;
                playerData.leaguePoints += 2;
                playerData.pointsWon += game.player_2_points;
                playerData.pointsLost += game.player_1_points;
            }
            else {
                playerData.pointsWon += game.player_2_points;
                playerData.pointsLost += game.player_1_points;
            }
        })

        playerData.lostSets = playerData.games - playerData.wonSets

        let finalPlayerStats = {
            ...playerData,
            setsDifference: playerData.wonSets - playerData.lostSets,
            pointsDifference: playerData.pointsWon - playerData.pointsLost,
            wonPercentage: (playerData.wonSets / playerData.games).toFixed(2),
        }

        results.push(finalPlayerStats);
    })

    return results
}