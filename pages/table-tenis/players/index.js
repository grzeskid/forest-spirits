import { useState } from "react";
import Footer from "../../components/Footer";
import Navigation from "../../components/Navigation";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";

export async function getServerSideProps() {
  const { data: players } = await supabase.from('players').select('*');

  return {
    props: {
      players: players
    }
  }
}

export default function Players(data) {
  const [player, setPlayer] = useState();

  const handleInputs = (e) => {
    const {name, value} = e.target
    setPlayer(prev => {
      return {
        ...prev,
        [name]: value,
      }
    })
  
  }
  
  async function submitPlayer() {
    if (!player || !player.name || !player.surname) {
      return
    }
    else (
      await supabase
      .from('players')
      .insert(player)
  
    )
    alert("dodano gracza")
    setTimeout(() => {
      location.reload()
    }, 1000)

  }
  const players = data.players

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
              <Link href="/table-tenis/table">Tabela</Link>
            </li>
            <li>
              <Link href="/table-tenis/scores">Wyniki</Link>
            </li>
            <li>
              <Link href="/table-tenis/players">Gracze</Link>
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
              <Link href="/table-tenis/table">Tabela</Link>
            </li>
            <li className="px-4">
              <Link href="/table-tenis/scores">Wyniki</Link>
            </li>
            <li className="px-4">
              <Link href="/table-tenis/players">Gracze</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="h-screen bg-cover bg-no-repeat bg-center bg-my-img">
        <div className="drawer drawer-end">
          <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            {/* <!-- Page content here --> */}

            <div className="overflow-x-auto">
              <table className="table table-zebra w-6/12 mx-auto my-8 opacity-80">
                {/* head */}
                <thead>
                  <tr>
                    <th>Imię i nazwisko</th>
                    <th>Nick</th>
                  </tr>
                </thead>
                <tbody>
                  {/* row 1 */}
                  {players.map((el, i) => (
                    <tr key={i}>
                      <td>{el.name} {el.surname}</td>
                      <td>{el.nick}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="container flex justify-center m-auto">
              <label
                htmlFor="my-drawer-4"
                className="drawer-button btn opacity-80 bg-gray-500"
              >
                Dodaj gracza
              </label>
            </div>
          </div>
          <div className="drawer-side">
            <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
            <ul className="menu p-4 w-80 bg-base-100 text-base-content">
              {/* <!-- Sidebar content here --> */}
              <li className="py-10">
                Imię
              <input onChange={(e) => handleInputs(e)} type="text" name="name" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
              </li>
              <li className="my-10">
                Nazwisko
              <input onChange={(e) => handleInputs(e)} type="text" name="surname" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
              </li>
              <li className="my-10">
                Nick
              <input onChange={(e) => handleInputs(e)} type="text" name="nick" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
              </li>
              <button onClick={submitPlayer} className="btn">Zapisz</button>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
