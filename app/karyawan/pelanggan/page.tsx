// page.tsx
export const dynamic = "force-dynamic";
import { axiosInstance } from "@/helper/api";
import AddPelanggan from "./addPelanggan";
import Pelanggan from "./pelanggan";
import { getServerCookie } from "@/helper/server-cookie";
import { User } from "../types";

const getPelanggan = async (): Promise<User[]> => {
    try {
        // get topken from cookie
        const TOKEN = await getServerCookie(`token`)
        const url = `/customer`
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

const UsersPage = async () => {
    const usersData = await getPelanggan();
    return (
        <div className="w-full p-8 bg-gray-100 min-h-screen flex justify-center">
            <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-5xl">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Data Pelanggan</h1>
                <p className="text-gray-700 mb-6">Halaman ini memuat daftar Admin yang terdaftar</p>
                <div className="mb-6 flex justify-end">
                    <AddPelanggan />
                </div>
                <div className="space-y-6">
                    {usersData.map((user, index) => (
                        <Pelanggan key={`user-${index}`} item={user} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UsersPage
