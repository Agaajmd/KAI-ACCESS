export const dynamic = "force-dynamic";
import { KeretaType } from "@/app/karyawan/types"
import AddKereta from "./addKereta"
import { axiosInstance } from "@/helper/api"
import { getServerCookie } from "@/helper/server-cookie"
import Train from "./Train"

// function to get all data kereta  
const getKereta = async (): Promise<KeretaType[]> => {
    try {
        // get topken from cookie
        const TOKEN = await getServerCookie(`token`)
        const url = `/train`
        // hit endpoint
        const response: any =
            await axiosInstance
                .get(url, {
                    headers: {
                        authorization: `Bearer ${TOKEN}`
                    }
                })
        if (response.data.success == true) {
            return response.data.data
        }
        return []
    } catch (error) {
        console.log(error)
        return []
    }
}

const KeretaPage = async () => {
    // call function to load "data kereta"
    // from backend

    const dataKereta = await getKereta()
    return (
        <div className="w-full p-8 bg-gray-100 min-h-screen flex justify-center">
            <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-5xl">
                <h1 className="text-3xl font-bold text-gray-800">Data Kereta</h1>
                <p className="text-gray-600">Halaman ini memuat daftar kereta api yang tersedia</p>
                <div className="mb-6 flex justify-end">
                    <AddKereta />
                </div>
                <div className="my-4 space-y-4">
                    {dataKereta.map((kereta, index) => (
                        <Train key={`kereta-${index}`} item={kereta} />
                    ))}
                </div>
            </div>
        </div>
    )

}
export default KeretaPage