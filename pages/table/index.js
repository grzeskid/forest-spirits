import { supabase } from "@/lib/supabaseClient";
import { resultsTableHelper } from "../../lib/resultsTableHelper";
import { useState } from "react";

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

  const [table, setTable] = useState(
    resultsTableHelper(players, scores)
      .sort((a, b) => a.leaguePoints - b.leaguePoints)
      .reverse()
  );

  function sort(value) {
    setTable(
      resultsTableHelper(players, scores)
        .sort((a, b) => a[value] - b[value])
        .reverse()
    );
  }

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
                <th className="text-center sticky left-2 z-20">Gracz</th>
                <th className="text-center">
                  Punkty
                  <div className="flex justify-center w-full py-1">
                    <button
                      className="kbd hover:bg-slate-400 focus:bg-slate-400 uppercase font-light"
                      onClick={() => sort("leaguePoints")}
                    >
                      sortuj ▼
                    </button>
                  </div>
                </th>
                <th className="text-center">
                  Procent wygranych
                  <div className="flex justify-center w-full py-1">
                    <button
                      className="kbd hover:bg-slate-400 focus:bg-slate-400 uppercase font-light"
                      onClick={() => sort("wonPercentage")}
                    >
                      sortuj ▼
                    </button>
                  </div>
                </th>
                <th className="text-center">
                  Mecze
                  <div className="flex justify-center w-full py-1">
                    <button
                      className="kbd hover:bg-slate-400 focus:bg-slate-400 uppercase font-light"
                      onClick={() => sort("games")}
                    >
                      sortuj ▼
                    </button>
                  </div>
                </th>
                <th className="text-center border-l-2 border-slate-400">
                  Sety wygrane
                  <div className="flex justify-center w-full py-1">
                    <button
                      className="kbd hover:bg-slate-400 focus:bg-slate-400 uppercase font-light"
                      onClick={() => sort("wonSets")}
                    >
                      sortuj ▼
                    </button>
                  </div>
                </th>
                <th className="text-center">
                  Sety przegrane
                  <div className="flex justify-center w-full py-1">
                    <button
                      className="kbd hover:bg-slate-400 focus:bg-slate-400 uppercase font-light"
                      onClick={() => sort("lostSets")}
                    >
                      sortuj ▼
                    </button>
                  </div>
                </th>
                <th className="text-center">
                  +/-
                  <div className="flex justify-center w-full py-1">
                    <button
                      className="kbd hover:bg-slate-400 focus:bg-slate-400 uppercase font-light"
                      onClick={() => sort("setsDifference")}
                    >
                      sortuj ▼
                    </button>
                  </div>
                </th>
                <th className="text-center border-l-2 border-slate-400">
                  Punkty zdobyte
                  <div className="flex justify-center w-full py-1">
                    <button
                      className="kbd hover:bg-slate-400 focus:bg-slate-400 uppercase font-light"
                      onClick={() => sort("pointsWon")}
                    >
                      sortuj ▼
                    </button>
                  </div>
                </th>
                <th className="text-center">
                  Punkty przegrane
                  <div className="flex justify-center w-full py-1">
                    <button
                      className="kbd hover:bg-slate-400 focus:bg-slate-400 uppercase font-light"
                      onClick={() => sort("pointsLost")}
                    >
                      sortuj ▼
                    </button>
                  </div>
                </th>
                <th className="text-center">
                  +/-
                  <div className="flex justify-center w-full py-1">
                    <button
                      className="kbd hover:bg-slate-400 focus:bg-slate-400 uppercase font-light"
                      onClick={() => sort("pointsDifference")}
                    >
                      sortuj ▼
                    </button>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {table.map((player, i) => (
                <tr key={i}>
                  <th className="text-center">{i + 1}</th>
                  <th className="text-center sticky left-2 z-20">{player.playerName}</th>
                  <th className="text-center">{player.leaguePoints}</th>
                  <th className="text-center">{player.wonPercentage} %</th>
                  <th className="text-center">{player.games}</th>
                  <th className="text-center border-l-2 border-slate-400">
                    {player.wonSets}
                  </th>
                  <th className="text-center">{player.lostSets}</th>
                  <th className="text-center">{player.setsDifference}</th>
                  <th className="text-center border-l-2 border-slate-400">
                    {player.pointsWon}
                  </th>
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
