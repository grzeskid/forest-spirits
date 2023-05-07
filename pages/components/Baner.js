import Link from "next/link"

export default function Baner () {
    return (
        <>
        <div className="container mx-auto h-screen flex justify-between items-center">

                <Link href="/table-tenis/table" className="h-5/6 w-full mx-1">
                    <div className="h-5/6 w-full mx-1 bg-cover bg-no-repeat bg-center bg-my-img flex rounded-3xl">
                        <h1 className="italic mx-auto mt-5 text-4xl font-black text-white text-center">Table Tenis</h1>
                    </div>
                </Link>

                <Link href="/petanque/table" className="h-5/6 w-full mx-1">
                    <div className="h-5/6 w-full mx-1 bg-cover bg-no-repeat bg-center bg-petanque flex rounded-3xl">
                        <h1 className="italic mx-auto mt-5 text-4xl font-black text-white text-center">Petanque</h1>
                    </div>
                </Link>

        </div>

        </>
    )
}