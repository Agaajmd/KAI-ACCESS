"use client"

import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"
import Modal from "@/components/Modal"
import { toast, ToastContainer } from "react-toastify"
import { getCookie } from "@/helper/client-cookie"
import { axiosInstance } from "@/helper/api"
import { User } from "../types"

type Props = {
    item: User
}

const EditPelanggan = (myProp: Props) => {
    const [nik, setNik] = useState<string>("")
    const [name, setName] = useState<string>("")
    const [address, setAddress] = useState<string>("")
    const [phone, setPhone] = useState<string>("")
    const [show, setShow] = useState<boolean>(false)
    const router = useRouter()

    const openModal = () => {
        setShow(true)
        setNik(myProp.item.nik)
        setName(myProp.item.name)
        setAddress(myProp.item.address)
        setPhone(myProp.item.phone)
    }

    const closeModal = () => {
        setShow(false)
    }

    const handleSubmit = async (e: FormEvent) => {
        try {
            e.preventDefault()
            const TOKEN = getCookie("token")
            const url = `/customer/${myProp.item.id}`
            const requestData = {
                nik,
                name,
                address,
                phone,
            }
            const response: any = await axiosInstance.put(url, requestData, {
                headers: {
                    authorization: `Bearer ${TOKEN}`
                }
            })
            const message = response.data.message
            if (response.data.success) {
                toast(message, {
                    containerId: `toastEdit-${myProp.item.id}`,
                    type: "success"
                })
                setShow(false)
                setTimeout(() => router.refresh(), 1000)
            } else {
                toast(message, {
                    containerId: `toastEdit-${myProp.item.id}`,
                    type: "warning"
                })
            }
        } catch (error) {
            console.log(error)
            toast("Something went wrong", {
                containerId: `toastEdit-${myProp.item.id}`,
                type: "error"
            })
        }
    }

    return (
        <div>
            <ToastContainer containerId={`toastEdit-${myProp.item.id}`} />
            <button type="button" onClick={openModal} className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-lg shadow-md transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                </svg>
            </button>
            <Modal isShow={show}>
                <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-xl overflow-hidden">
                    <div className="w-full p-4 bg-sky-600 text-white">
                        <h1 className="font-bold text-xl">Edit User</h1>
                        <span className="text-sm text-sky-200">Pastikan data yang diisi sudah benar</span>
                    </div>
                    <div className="w-full p-5 space-y-3">
                        <label className="block text-gray-700">NIK</label>
                        <input type="number" value={nik} onChange={(e) => setNik(e.target.value)} placeholder="NIK" required className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-sky-500" />

                        <label className="block text-gray-700">NAMA</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nama" required className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-sky-500" />

                        <label className="block text-gray-700">ALAMAT</label>
                        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Alamat" required className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-sky-500" />

                        <label className="block text-gray-700">NOMOR TELEPON</label>
                        <input type="number" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Nomor Telepon" required className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-sky-500" />
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

export default EditPelanggan