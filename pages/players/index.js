import { useState } from "react";
import Footer from "../components/Footer";
import Navigation from "../components/Navigation";
import { supabase } from "@/lib/supabaseClient";

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
