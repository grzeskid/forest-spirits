export function resultsPetanque(players, scores) {
    const results = []


    players.forEach(element => {
        const winner = scores.filter(el => el.winner === element.name);
        const loser = scores.filter(el => el.loser === element.name);

        let playerData = {
            playerName: element.name,
            leaguePoints: 0,
            games: winner.length + loser.length,
            wonPercentage: 0,
            wins_for_1: 0,
            wins_for_2: 0,
            wins_for_3: 0,
        }

        winner.forEach(game => {
            if (game.winner_points === 1) {
                playerData.wins_for_1 += 1;
                playerData.leaguePoints += 1;
            }
            if (game.winner_points === 2) {
                playerData.wins_for_2 += 1;
                playerData.leaguePoints += 2;
            }
            if (game.winner_points === 3) {
                playerData.wins_for_3 += 1;
                playerData.leaguePoints += 3;
            }
        })

        if (loser.length === 0 && winner.length === 0) {
            playerData.wonPercentage = "0.000"
        }
        else {
            playerData.wonPercentage = ((playerData.wins_for_1 + playerData.wins_for_2 + playerData.wins_for_3) / playerData.games).toFixed(3)
        }

        results.push(playerData);
    })

    return results
}