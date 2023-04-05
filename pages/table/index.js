import { supabase } from "@/lib/supabaseClient";
import Footer from "../components/Footer";
import Navigation from "../components/Navigation";
import { resultsTableHelper } from "../../lib/resultsTableHelper"; 

export async function getServerSideProps() {
  const { data: scores } = await supabase.from('scores').select('*');
  const { data: players } = await supabase.from('players').select('*');

  return {
    props: {
      players: players,
      scores: scores,
    }
  }
}

export default function Table(data) {
  const players = data.players;
  const scores = data.scores;

  const table = resultsTableHelper(players, scores).sort((a,b) => a.leaguePoints - b.leaguePoints).reverse()

  console.log(table)

  // console.log(players)
  console.log(scores)

  return (
    <>
      <div className="h-screen bg-cover bg-no-repeat bg-center bg-my-img flex">
        <div className="overflow-x-auto m-auto">
          <table className="table table-zebra w-full opacity-80">
            {/* head */}
            <thead>
              <tr>
                <th>Miejsce</th>
                <th>Punkty</th>
                <th>Gracz</th>
                <th>Ilość meczów</th>
                <th>Sety wygrane</th>
                <th>Sety przegrane</th>
                <th>Punkty zdobyte</th>
                <th>Ilość przegrane</th>
              </tr>
            </thead>
            <tbody>
              {table.map((player, i) => (
                <tr key={i}>
                  <th>{i + 1}</th>
                  <th>{player.leaguePoints}</th>
                  <th>{player.playerName}</th>
                  <th>{player.games}</th>
                  <th>{player.wonSets}</th>
                  <th>{player.lostSets}</th>
                  <th>{player.pointsWon}</th>
                  <th>{player.pointsLost}</th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
