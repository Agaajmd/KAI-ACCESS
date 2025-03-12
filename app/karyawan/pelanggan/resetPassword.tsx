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

const ResetPassword = (myProp: Props) => {
    const [password, setPassword] = useState<string>("")
    const [confirmPassword, setConfirmPassword] = useState<string>("")
    const [show, setShow] = useState<boolean>(false)
    const router = useRouter()

    const openModal = () => {
        setShow(true)
        setPassword("")
        setConfirmPassword("")
    }

    const closeModal = () => {
        setShow(false)
    }

    const handleSubmit = async (e: FormEvent) => {
        try {
            e.preventDefault()
            if (password !== confirmPassword) {
                toast("Passwords do not match", { type: "warning" })
                return
            }
            const TOKEN = getCookie("token")
            const url = `/customer/${myProp.item.id}`
            const requestData = { password }
            const response: any = await axiosInstance.put(url, requestData, {
                headers: { authorization: `Bearer ${TOKEN}` }
            })
            const message = response.data.message
            if (response.data.success) {
                toast(message, { type: "success" })
                setShow(false)
                setTimeout(() => router.refresh(), 1000)
            } else {
                toast(message, { type: "warning" })
            }
        } catch (error) {
            console.log(error)
            toast("Something went wrong", { type: "error" })
        }
    }

    return (
        <div>
            <ToastContainer />
            <button type="button" onClick={openModal} className="px-4 py-2 bg-slate-600 hover:bg-slate-400 text-white rounded-lg shadow-md transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z" />
                </svg>

            </button>
            <Modal isShow={show}>
                <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-xl overflow-hidden">
                    <div className="w-full p-4 bg-red-600 text-white">
                        <h1 className="font-bold text-xl">Reset Password</h1>
                        <span className="text-sm text-red-200">Masukkan password baru</span>
                    </div>
                    <div className="w-full p-5 space-y-3">
                        <label className="block text-gray-700">Password Baru</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password Baru" required className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-red-500" />

                        <label className="block text-gray-700">Konfirmasi Password</label>
                        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Konfirmasi Password" required className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-red-500" />
                    </div>
                    <div className="w-full p-4 bg-gray-100 flex items-center justify-end gap-3 rounded-b-xl">
                        <button type="button" onClick={closeModal} className="px-5 py-2 rounded-lg bg-gray-600 hover:bg-gray-500 text-white shadow-md transition-all">Close</button>
                        <button type="submit" className="px-5 py-2 rounded-lg bg-red-700 hover:bg-red-600 text-white shadow-md transition-all">Reset</button>
                    </div>
                </form>
            </Modal>
        </div>
    )
}

export default ResetPassword