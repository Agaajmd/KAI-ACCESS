export const dynamic = "force-dynamic";

import { KeretaType, ScheduleType } from "../types"
import { axiosInstance } from "@/helper/api"
import Schedule from "./Schedule"
import { getServerCookie } from "@/helper/server-cookie"
import AddSchedule from "./addSchedule"

/** get data jadwal */
const getJadwal = async (): Promise<ScheduleType[]> => {
    try {
        const url = `/schedule`
        const TOKEN = await getServerCookie(`token`)
        /**hit endpoint */
        const response: any = await axiosInstance.get(url, {
            headers: { Authorization: `Bearer ${TOKEN}` }
        })
        if (response.data.success === true) return response.data.data
        return []
    } catch (error) {
        console.log(error)
        return []
    }
}

const getKereta = async (): Promise<KeretaType[]> => {
    try {
        /** get token from cookie */
        const TOKEN = await getServerCookie(`token`)
        const url = `/train`
        /** hit endpoint */
        const response: any = await axiosInstance.get(url, {
            headers: {
                authorization: `Bearer ${TOKEN}`
            }
        })

        if (response.data.success == true) {
            return response.data.data
        }
        return []
    } catch (error) {
        console.log(error);
        return []
    }
}

const JadwalPage = async () => {
    const dataJadwal = await getJadwal()
    const dataKereta = await getKereta()
    return (
        <div className="w-full p-8 bg-gray-100 min-h-screen flex justify-center">
            <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-5xl">
                <h1 className="text-3xl font-bold text-gray-800">Data Jadwal</h1>
                <p className="text-md text-gray-600">Halaman ini memuat daftar jadwal kereta yang tersedia</p>

                <div className="mb-6 flex justify-end">
                    <AddSchedule trains={dataKereta} />
                </div>

                <div className="my-4 space-y-4">
                    {dataJadwal.map((jadwal, index) => (
                        <Schedule key={`keyJadwal-${index}`} item={jadwal} />
                    ))}
                </div>
            </div>
        </div>

    )
}
export default JadwalPage