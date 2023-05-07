import { supabase } from "@/lib/supabaseClient";
// import { resultsTableHelper } from "../../../lib/resultsTableHelper";
import { useState } from "react";
import Link from "next/link";
import { resultsPetanque } from "@/lib/resultsPetanque";

export async function getServerSideProps() {
  const { data: scores } = await supabase.from("petanque").select("*");
  const { data: players } = await supabase.from("players").select("*");

  return {
    props: {
      players: players,
      scores: scores,
    },
  };
}

export default function Table(data) {
  console.log(data)
  const players = data.players;
  const scores = data.scores;

  const [table, setTable] = useState(
    resultsPetanque(players, scores)
      .sort((a, b) => a.leaguePoints - b.leaguePoints)
      .reverse()
  );

  function sort(value) {
    setTable(
      resultsPetanque(players, scores)
        .sort((a, b) => a[value] - b[value])
        .reverse()
    );
  }

  console.log(table);

  return (
    <>
    <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
            <li>
              <Link href="/">Strona główna</Link>
            </li>
            <li>
              <Link href="/petanque/table">Tabela</Link>
            </li>
            <li>
              <Link href="/petanque/scores">Wyniki</Link>
            </li>
            <li>
              <Link href="/petanque/players">Gracze</Link>
            </li>
            </ul>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex w-full justify-center">
          <ul className="menu menu-horizontal px-1">
            <li className="px-4">
              <Link href="/">Strona główna</Link>
            </li>
            <li className="px-4">
              <Link href="/petanque/table">Tabela</Link>
            </li>
            <li className="px-4">
              <Link href="/petanque/scores">Wyniki</Link>
            </li>
            <li className="px-4">
              <Link href="/petanque/players">Gracze</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="h-screen bg-cover bg-no-repeat bg-center bg-petanque flex">
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
                  Wygrane za 1pkt
                  <div className="flex justify-center w-full py-1">
                    <button
                      className="kbd hover:bg-slate-400 focus:bg-slate-400 uppercase font-light"
                      onClick={() => sort("wins_for_1")}
                    >
                      sortuj ▼
                    </button>
                  </div>
                </th>
                <th className="text-center">
                  Wygrane za 2pkt
                  <div className="flex justify-center w-full py-1">
                    <button
                      className="kbd hover:bg-slate-400 focus:bg-slate-400 uppercase font-light"
                      onClick={() => sort("wins_for_2")}
                    >
                      sortuj ▼
                    </button>
                  </div>
                </th>
                <th className="text-center">
                  Wygrane za 3pkt
                  <div className="flex justify-center w-full py-1">
                    <button
                      className="kbd hover:bg-slate-400 focus:bg-slate-400 uppercase font-light"
                      onClick={() => sort("wins_for_3")}
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
                    {player.wins_for_1}
                  </th>
                  <th className="text-center">{player.wins_for_2}</th>
                  <th className="text-center">{player.wins_for_3}</th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
