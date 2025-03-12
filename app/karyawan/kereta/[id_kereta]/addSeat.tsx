"use client"

import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"
import { toast, ToastContainer } from "react-toastify"
import Modal from "@/components/Modal"
import { getCookie } from "@/helper/client-cookie"
import { axiosInstance } from "@/helper/api"


type props = {
    wagon_id: number
}
const AddSeat = (myProp: props) => {
    const [seat_number, SetSeat_number] = useState<string>("")
    const [show, setShow] = useState<boolean>(false)

    const router = useRouter()

    const openModal = () => {
        setShow(true)
        SetSeat_number("")
    }

    const closeModal = () => {
        setShow(false)
    }

    const handleSubmit = async (e: FormEvent) => {
        const wagon_id = myProp.wagon_id
        try {
            e.preventDefault()
            const TOKEN = getCookie(`token`)
            const url = `/train/wagon/seat`
            const requestData = {
                seat_number,
                wagon_id
            }

            const response: any = await axiosInstance.post(url, requestData, {
                headers: {
                    authorization: `Bearer ${TOKEN}`
                }
            })

            const message = response.data.message
            if (response.data.success === true) {
                setShow(false)
                toast(
                    message,
                    {
                        containerId: `toastAddKursi - ${myProp.wagon_id}`,
                        type: `success`
                    }
                )
                // refresh page
                setTimeout(() =>
                    router.refresh(), 1000
                )
            }
            else {
                toast(message,
                    {
                        containerId: `toastAddKursi - ${myProp.wagon_id}`,
                        type: `warning`
                    }
                )

            }

        } catch (error) {
            console.log(error);
            toast(
                `Some Thing Wong`,
                {
                    containerId: `toastAddKursi - ${myProp.wagon_id}`,
                    type: `error`
                }
            )

        }
    }

    return (

        <div>
            <ToastContainer containerId={`toastAddKursi - ${myProp.wagon_id}`} />
            <button type="button" onClick={() => openModal()} className="px-4 py-2 rounded-md bg-green-500 hover:bg-green-400 flex justify-center items-center">

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>

            </button>
            <Modal isShow={show}>
                <form onSubmit={handleSubmit}>
                    {/* modal header */}
                    <div className=" w-full p-3 rounded-t-lg">
                        <h1 className=" font-semibold text-lg">
                            Tambah Kursi
                        </h1>
                        <span className=" text-sm text-slate-500">
                            Pastikan Kursi Benar
                        </span>
                    </div>

                    {/* modal body */}
                    <div className=" w-full p-3">
                        <div className=" my-2 border rounded-md p-3">
                            <small className=" text-sm font-semibold text-sky-600">
                                Nomor Kursi
                            </small>
                            <input type="text" id={"seat_number"} value={seat_number} onChange={(e) => SetSeat_number(e.target.value)} required={true} className=" p-1 outline-none focus:border-b-sky-600 focus:border-b w-full" />
                        </div>

                    </div>

                    {/* modal footer */}
                    <div className=" w-full p-3 rounded-b-lg flex items-center justify-end gap-2">
                        <button type="button" onClick={() => closeModal()} className=" px-4 py-2 rounded-md bg-red-700 hover:bg-red-600 text-white">
                            Close
                        </button>
                        <button type="submit" className=" px-4 py-2 rounded-md bg-green-700 hover:bg-green-600 text-white">
                            Save
                        </button>

                    </div>
                </form>
            </Modal>
        </div>
    )
}


export default AddSeat