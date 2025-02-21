"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

type props = {

    start_date: string
    end_date: string
}
const FilterHistory = (myProps: props) => {

    const [start_date, setStartDate] = useState<string>("")
    const [end_date, setEndDate] = useState<string>("")
    const router = useRouter()

    const handleSearch = () => {
        if (start_date !== "" && end_date !== "") {
            router.push(`/pelanggan/history?start_date=${start_date}&end_date=${end_date}`)
        }
    }

    // useEffect digunakan untuk update data saat komponen ini dimuat ulang 
    useEffect(() => {
        setStartDate(myProps.start_date)
        setEndDate(myProps.end_date)
    }, [myProps])

    return (
        <div className="bg-gradient-to-r from-blue-500 to-indigo-800 shadow-lg rounded-lg p-8  max-w-full mx-auto text-white">
            <div className="flex flex-col md:flex-row gap-6 w-full">
                <div className="flex-1">
                    <label className="block font-semibold mb-2 text-lg">tanggal Awal</label>
                    <input
                        type="date"
                        id={`start_date`}
                        className="w-full border p-4 rounded-md text-gray-900 focus:ring focus:ring-yellow-300 text-lg"
                        value={start_date}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                </div>
                <div className="flex-1">
                    <label className="block font-semibold mb-2 text-lg">Tanggal Akhir</label>
                    <input
                        type="date"
                        id={`end_date`}
                        className="w-full border p-4 rounded-md text-gray-900 focus:ring focus:ring-yellow-300 text-lg"
                        value={end_date}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </div>
            </div>
            <button
                type="button"
                onClick={handleSearch}
                className="w-full mt-6 px-8 py-4 rounded-md bg-white hover:bg-gray-200 text-gray-900 font-semibold text-lg transition flex items-center justify-center">
                🔍 Cari Jadwal
            </button>
        </div>
    );
};

export default FilterHistory
