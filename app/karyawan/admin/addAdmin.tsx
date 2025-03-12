"use client"

import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"
import Modal from "@/components/Modal"
import { toast, ToastContainer } from "react-toastify"
import { getCookie } from "@/helper/client-cookie"
import { axiosInstance } from "@/helper/api"
const AddUser = () => {
    const [nik, setNik] = useState<string>("")
    const [name, setName] = useState<string>("")
    const [address, setAddress] = useState<string>("")
    const [phone, setPhone] = useState<string>("")
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [, setRole] = useState<string>("")
    const [show, setShow] = useState<boolean>(false)
    const router = useRouter()

    const openModal = () => {
        setShow(true)
        setNik("")
        setName("")
        setAddress("")
        setPhone("")
        setUsername("")
        setPassword("")
        setRole("")
    }

    const closeModal = () => {
        setShow(false)
    }

    const handleSubmit = async (e: FormEvent) => {
        try {
            e.preventDefault()
            const TOKEN = getCookie(`token`)
            const url = `employee/register`
            const requestData = {
                nik,
                name,
                address,
                phone,
                username,
                password,
            }


            const response: any = await axiosInstance.post(url, requestData, {
                headers: {
                    authorization: `Bearer ${TOKEN}`
                }
            })

            const message = response.data.message
            if (response.data.success) {
                toast(message, { containerId: `toastAdd`, type: "success" })
                setShow(false)
                setTimeout(() => router.refresh(), 1000)
            } else {
                toast(message, { containerId: `toastAdd`, type: "warning" })
            }
        } catch (error) {
            console.log(error)
            toast(`Something went wrong`, { containerId: `toastAdd`, type: `error` })
        }
    }

    return (
        <div>
            <ToastContainer containerId={`toastAdd`} />
            <button type="button" onClick={() => openModal()} className="px-5 py-2.5 rounded-lg bg-lime-600 hover:bg-lime-500 text-white shadow-md transition-all">
                Tambah Admin
            </button>
            <Modal isShow={show}>
                <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-xl overflow-hidden">
                    <div className="w-full p-4 bg-lime-600 text-white">
                        <h1 className="font-bold text-xl">Tambah Admin</h1>
                        <span className="text-sm text-lime-200">Pastikan data yang diisi sudah benar</span>
                    </div>
                    <div className="w-full p-5 space-y-3">
                        <label className="block text-gray-700">USERNAME</label>
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-lime-500" />

                        <label className="block text-gray-700">PASSWORD</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-lime-500" />

                        <label className="block text-gray-700">NIK</label>
                        <input type="number" value={nik} onChange={(e) => setNik(e.target.value)} placeholder="NIK" required className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-lime-500" />

                        <label className="block text-gray-700">NAMA</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nama" required className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-lime-500" />

                        <label className="block text-gray-700">ALAMAT</label>
                        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Alamat" required className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-lime-500" />

                        <label className="block text-gray-700">NOMOR TELEPON</label>
                        <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Nomor Telepon" required className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-lime-500" />
                    </div>
                    <div className="w-full p-4 bg-gray-100 flex items-center justify-end gap-3 rounded-b-xl">
                        <button type="button" onClick={closeModal} className="px-5 py-2 rounded-lg bg-gray-600 hover:bg-gray-500 text-white shadow-md transition-all">Close</button>
                        <button type="submit" className="px-5 py-2 rounded-lg bg-sky-700 hover:bg-sky-600 text-white shadow-md transition-all">Save</button>
                    </div>
                </form>
            </Modal>
        </div>
    )
}
export default AddUser
