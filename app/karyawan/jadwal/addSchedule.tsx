"use client"

import Modal from "@/components/Modal"
import { axiosInstance } from "@/helper/api"
import { getCookie } from "@/helper/client-cookie"
import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"
import DatePicker from "react-datepicker"
import { toast, ToastContainer } from "react-toastify"
import { KeretaType } from "../types"


type props = {
    trains: KeretaType[]
}

const AddSchedule = (myProp: props) => {
    const router = useRouter()
    const [show, setShow] = useState<boolean>(false)

    const [departured_location, setDepaturedLocation] = useState<string>("")
    const [arrived_location, setArrivedLocation] = useState<string>("")
    const [departured_time, setDepaturedTime] = useState<Date>(new Date())
    const [arrived_time, setArrivedTime] = useState<Date>(new Date())
    const [train_id, setTrainId] = useState<number>(0)
    const [price, setPrice] = useState<number>(0)

    const openModal = () => {
        setShow(true)
        setDepaturedLocation("")
        setArrivedLocation("")
        setDepaturedTime(new Date())
        setArrivedTime(new Date())
        setTrainId(0)
        setPrice(0)
    }

    const closeModal = () => {
        setShow(false)
    }

    const handleSubmit = async (e: FormEvent) => {
        try {
            e.preventDefault()
            const url = `/schedule`
            const requestData = {
                departured_location, arrived_location, departured_time, arrived_time, price, train_id
            }
            const TOKEN = getCookie(`token`)
            const response: any = await axiosInstance.post(url, requestData, {
                headers: {
                    Authorization: `Bearer ${TOKEN}`
                }
            })
            const message = response.data.message
            if (response.data.success === true) {
                setShow(false)
                toast(message, {
                    containerId: `toastAddJadwal`,
                    type: `success`
                })
                setTimeout(() => router.refresh(), 1000)
            } else {
                toast(message, {
                    containerId: `toastAddJadwal`,
                    type: `warning`
                })
            }
        } catch (error) {
            console.log(error);
            toast(`something wrong`, {
                containerId: `toastAddJadwal`,
                type: "error"
            })
        }
    }

    return (
        <div>
            <ToastContainer containerId={`toastAddJadwal`} />
            <button className="px-5 py-2.5 rounded-lg bg-lime-600 hover:bg-lime-500 text-white shadow-md transition-all"
                type="button"
                onClick={() => openModal()}>
                Tambah Jadwal
            </button>
            <Modal isShow={show}>
                <form onSubmit={handleSubmit}>
                    {/* modal header */}
                    <div className="w-full p-3 rounded-t-lg">
                        <h1 className="font-semibold text-lg">
                            Tambah Data Jadwal Kereta
                        </h1>
                        <span className="text-sm text-slate-500">
                            Pastikan data yang diisi sudah benar
                        </span>
                    </div>
                    {/* modal body */}
                    <div className="w-full p-3">
                        <div className="my-2 border rounded-md px-2">
                            <small className="text-xs font-semibold text-sky-500">
                                Berangkat dari
                            </small>
                            <input type="text" id={`depatured_location`}
                                value={departured_location}
                                onChange={e => setDepaturedLocation(e.target.value)}
                                className="w-full p-1 outline-none hover:border-b-sky-500"
                                required={true} />
                        </div>
                        <div className="my-2 border rounded-md px-2">
                            <small className="text-xs font-semibold text-sky-500">
                                Waktu keberangkat
                            </small>
                            <br />
                            <DatePicker className="p-1 w-full outline-none focus:border-sky-600 focus:border-b text-black" id="departured-time"
                                showTimeInput
                                selected={new Date(departured_time)}
                                dateFormat={`dd-MMMM-yyyy HH:mm`}
                                onChange={(date) => setDepaturedTime(date || new Date())}
                            />
                        </div>
                        <div className="my-2 border rounded-md px-2">
                            <small className="text-xs font-semibold text-sky-500">
                                Tiba dari
                            </small>
                            <input type="text" id={`arrived_location`}
                                value={arrived_location}
                                onChange={e => setArrivedLocation(e.target.value)}
                                className="w-full p-1 outline-none hover:border-b-sky-500"
                                required={true} />
                        </div>
                        <div className="my-2 border rounded-md px-2">
                            <small className="text-xs font-semibold text-sky-500">
                                Waktu kedatangan
                            </small>
                            <br />
                            <DatePicker className="p-1 w-full outline-none focus:border-sky-600 focus:border-b text-black" id="departured-time"
                                showTimeInput
                                selected={new Date(arrived_time)}
                                dateFormat={`dd-MMMM-yyyy HH:mm`}
                                onChange={(date) => setArrivedTime(date || new Date())} />
                        </div>
                        <div className="my-2 border rounded-md px-2">
                            <small className="text-xs font-semibold text-sky-500">
                                Price
                            </small>
                            <input type="number" id={`price`}
                                value={price.toString()}
                                onChange={e => setPrice(Number(e.target.value))}
                                className="w-full p-1 outline-none hover:border-b-sky-500"
                                required={true} />
                        </div>
                        <div className="my-2 border rounded-md px-2">
                            <small className="text-xs font-semibold text-sky-500">
                                Jenis Kereta
                            </small>
                            <select id={`train_id`}
                                value={train_id.toString()}
                                onChange={e => setTrainId(Number(e.target.value))}
                                className="w-full p-1 outline-none border hover:border-b-sky-500"
                                required={true}
                            >
                                <option value="">Pilih Jenis Kereta</option>
                                {
                                    myProp.trains.map((kereta, index) => (
                                        <option value={kereta.id}
                                            key={`optionKereta-${index}`}>
                                            {kereta.name}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>
                    {/* modal footer */}
                    <div className="w-full p-4 bg-gray-100 flex items-center justify-end gap-3 rounded-b-xl">
                        <button type="button" onClick={closeModal} className="px-5 py-2 rounded-lg bg-gray-600 hover:bg-gray-500 text-white shadow-md transition-all">Close</button>
                        <button type="submit" className="px-5 py-2 rounded-lg bg-sky-700 hover:bg-sky-600 text-white shadow-md transition-all">Save</button>
                    </div>
                </form>
            </Modal>
        </div>
    )
}
export default AddSchedule