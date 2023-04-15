import { supabase } from "@/lib/supabaseClient";
import { resultsTableHelper } from "../../lib/resultsTableHelper";

export async function getServerSideProps() {
  const { data: scores } = await supabase.from("scores").select("*");
  const { data: players } = await supabase.from("players").select("*");

  return {
    props: {
      players: players,
      scores: scores,
    },
  };
}

export default function Table(data) {
  const players = data.players;
  const scores = data.scores;

  const table = resultsTableHelper(players, scores)
    .sort((a, b) => a.leaguePoints - b.leaguePoints)
    .reverse();

  console.log(table);

  return (
    <>
      <div className="h-screen bg-cover bg-no-repeat bg-center bg-my-img flex">
        <div className="overflow-x-auto m-auto">
          <table className="table table-zebra w-full opacity-80">
            {/* head */}
            <thead>
              <tr>
                <th className="text-center">Miejsce</th>
                <th className="text-center">Gracz</th>
                <th className="text-center">
                  Punkty
                  <div className="flex justify-center w-full py-1">
                    <kbd className="kbd">sortuj ▼</kbd>
                  </div>
                </th>
                <th className="text-center">
                  Procent wygranych
                  <div className="flex justify-center w-full py-1">
                    <kbd className="kbd">sortuj ▼</kbd>
                  </div>
                </th>
                <th className="text-center">
                  Ilość meczów
                  <div className="flex justify-center w-full py-1">
                    <kbd className="kbd">sortuj ▼</kbd>
                  </div>
                </th>
                <th className="text-center border-l-2 border-slate-400">
                  Sety wygrane
                  <div className="flex justify-center w-full py-1">
                    <kbd className="kbd">sortuj ▼</kbd>
                  </div>
                </th>
                <th className="text-center">
                  Sety przegrane
                  <div className="flex justify-center w-full py-1">
                    <kbd className="kbd">sortuj ▼</kbd>
                  </div>
                </th>
                <th className="text-center">
                  +/-
                  <div className="flex justify-center w-full py-1">
                    <kbd className="kbd">sortuj ▼</kbd>
                  </div>
                </th>
                <th className="text-center border-l-2 border-slate-400">
                  Punkty zdobyte
                  <div className="flex justify-center w-full py-1">
                    <kbd className="kbd">sortuj ▼</kbd>
                  </div>
                </th>
                <th className="text-center">
                  Punkty przegrane
                  <div className="flex justify-center w-full py-1">
                    <kbd className="kbd">sortuj ▼</kbd>
                  </div>
                </th>
                <th className="text-center">
                  +/-
                  <div className="flex justify-center w-full py-1">
                    <kbd className="kbd">sortuj ▼</kbd>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {table.map((player, i) => (
                <tr key={i}>
                  <th className="text-center">{i + 1}</th>
                  <th className="text-center">{player.playerName}</th>
                  <th className="text-center">{player.leaguePoints}</th>
                  <th className="text-center">{player.wonPercentage} %</th>
                  <th className="text-center">{player.games}</th>
                  <th className="text-center border-l-2 border-slate-400">{player.wonSets}</th>
                  <th className="text-center">{player.lostSets}</th>
                  <th className="text-center">{player.setsDifference}</th>
                  <th className="text-center border-l-2 border-slate-400">{player.pointsWon}</th>
                  <th className="text-center">{player.pointsLost}</th>
                  <th className="text-center">{player.pointsDifference}</th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
