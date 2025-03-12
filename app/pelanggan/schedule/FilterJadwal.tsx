"use client"

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type props = {
    departuredLocation: string;
    arrivedLocation: string;
};

const FilterJadwal = ({ departuredLocation, arrivedLocation }: props) => {
    const [departured_location, setDeparturedLocation] = useState<string>("");
    const [arrived_location, setArrivedLocation] = useState<string>("");
    const router = useRouter();

    const handleSearch = () => {
        if (departured_location !== "" && arrived_location !== "") {
            router.push(`/pelanggan/schedule?departured_location=${departured_location}&arrived_location=${arrived_location}`);
        }
    };

    useEffect(() => {
        setDeparturedLocation(departuredLocation);
        setArrivedLocation(arrivedLocation);
    }, [departuredLocation, arrivedLocation]);

    return (
        <div className="bg-gradient-to-r from-blue-500 to-indigo-800 shadow-lg rounded-lg p-8 max-w-full mx-auto text-white">
            <div className="flex flex-col md:flex-row gap-6 w-full">
                <div className="flex-1">
                    <label htmlFor="departured_location" className="block font-semibold mb-2 text-lg">Stasiun Asal</label>
                    <input
                        type="text"
                        id="departured_location"
                        className="w-full border p-4 rounded-md text-gray-900 focus:ring focus:ring-yellow-300 text-lg"
                        value={departured_location}
                        onChange={(e) => setDeparturedLocation(e.target.value)}
                        placeholder="Masukkan stasiun asal"
                    />
                </div>
                <div className="flex-1">
                    <label htmlFor="arrived_location" className="block font-semibold mb-2 text-lg">Stasiun Tujuan</label>
                    <input
                        type="text"
                        id="arrived_location"
                        className="w-full border p-4 rounded-md text-gray-900 focus:ring focus:ring-yellow-300 text-lg"
                        value={arrived_location}
                        onChange={(e) => setArrivedLocation(e.target.value)}
                        placeholder="Masukkan stasiun tujuan"
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

export default FilterJadwal;
