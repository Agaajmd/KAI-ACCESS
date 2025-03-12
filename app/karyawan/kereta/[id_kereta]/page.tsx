/**function to call detail kereta
 * that include gerbong dan kursi
 */
export const dynamic = "force-dynamic";
import { KeretaType } from "@/app/karyawan/types";
import Gerbong from "./Gerbong";
import AddGerbong from "./addGerbong";
import { getServerCookie } from "@/helper/server-cookie";
import { axiosInstance } from "@/helper/api";
const getDetailKereta = async (
    id_kereta: string
): Promise<KeretaType | null> => {
    try {
        /**get token from cookie */
        const TOKEN = await getServerCookie("token");
        const url = `/train/${id_kereta}`;
        /**hit endpoint */
        const response: any = await axiosInstance.get(url, {
            headers: {
                "Authorization": `Bearer ${TOKEN}`
            }
        })
        if (response.data.success === true) {
            return response.data.data
        }
        return null
    } catch (error) {
        console.log(error);
        return null
    }
}
type props = {
    params: Promise< {
        id_kereta: string
        // sesuai dengan nama foldernya
    }>
}
const DetailKeretaPage = async (
    myProps: props
) => {
    // get value of selected "id_kereta"
    const id_kereta =(await myProps.params).id_kereta
    // get data from backend
    const dataKereta = await getDetailKereta(id_kereta)

    return (
        <div className="w-full p-8 bg-gray-100 min-h-screen flex justify-center">
            <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-5xl">
                {
                    dataKereta === null ?
                        <div className="bg-yellow-100 rounded-md p-4 text-center">
                            <h1 className="text-lg font-semibold text-yellow-800">Informasi</h1>
                            <p className="text-sm text-slate-600">Data kereta tidak ditemukan</p>
                        </div> :
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">{dataKereta.name}</h1>
                            <p className="text-gray-700 mb-6">{dataKereta.descriptions}</p>

                            <h2 className="text-xl font-medium text-gray-800 mb-4">Daftar Gerbong:</h2>
                            <div className="mb-6 flex justify-end">
                                <AddGerbong id_kereta={Number(id_kereta)} />
                            </div>

                            <div className="space-y-6">
                                {dataKereta.wagons.map((gerbong, index) => (
                                    <Gerbong item={gerbong} key={`keyGerbong-${index}`} />
                                ))}
                            </div>
                        </div>
                }
            </div>
        </div>
    )
}
export default DetailKeretaPage