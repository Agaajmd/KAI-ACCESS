"use client"

import Modal from "@/components/Modal"
import { axiosInstance } from "@/helper/api"
import { getCookie } from "@/helper/client-cookie"
import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"
import DatePicker from "react-datepicker"
import { toast, ToastContainer } from "react-toastify"
import { ScheduleType } from "../types"

type props = {
    item: ScheduleType
}

const EditSchedule = (myProp: props) => {
    const router = useRouter()
    const [show, setShow] = useState<boolean>(false)

    const [departured_location, setDepaturedLocation] = useState<string>("")
    const [arrived_location, setArrivedLocation] = useState<string>("")
    const [departured_time, setDepaturedTime] = useState<Date>(new Date())
    const [arrived_time, setArrivedTime] = useState<Date>(new Date())
    const [price, setPrice] = useState<number>(0)

    const openModal = () => {
        setShow(true)
        setDepaturedLocation(myProp.item.departured_location)
        setArrivedLocation(myProp.item.arrived_location)
        setDepaturedTime(new Date(myProp.item.departured_time))
        setArrivedTime(new Date(myProp.item.arrived_time))
        setPrice(myProp.item.price)
    }

    const closeModal = () => {
        setShow(false)
    }

    const handleSubmit = async (e: FormEvent) => {
        try {
            e.preventDefault()
            const url = `/schedule/${myProp.item.id}`
            const requestData = {
                departured_location, arrived_location, departured_time, arrived_time, price
            }
            const TOKEN = getCookie(`token`)
            const response: any = await axiosInstance.put(url, requestData, {
                headers: {
                    Authorization: `Bearer ${TOKEN}`
                }
            })
            const message = response.data.message
            if (response.data.success === true) {
                setShow(false)
                toast(message, {
                    containerId: `toastEdit-${myProp.item.id}`,
                    type: `success`
                })
                setTimeout(() => router.refresh(), 1000)
            } else {
                toast(message, {
                    containerId: `toastEdit-${myProp.item.id}`,
                    type: `warning`
                })
            }
        } catch (error) {
            console.log(error);
            toast(`something wrong`, {
                containerId: `toastEdit-${myProp.item.id}`,
                type: "error"
            })
        }
    }

    return (
        <div>
            <ToastContainer containerId={`toastEdit-${myProp.item.id}`} />
            <button className="px-4 py-2 rounded-md text-white bg-sky-600 hover:bg-sky-500"
                type="button"
                onClick={() => openModal()}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                </svg>
            </button>
            <Modal isShow={show}>
                <form onSubmit={handleSubmit}>
                    {/* modal header */}
                    <div className="w-full p-3 rounded-t-lg">
                        <h1 className="font-semibold text-lg">
                            Edit Data Jadwal Kereta
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
                            <DatePicker
                                id={`depatured_time`}
                                className="w-full p-1 outline-none hover:border-b-sky-500"
                                selected={new Date(departured_time)}
                                dateFormat={`dd MMMM yyyy HH:mm`}
                                onChange={date => setDepaturedTime(date || new Date())}
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
export default EditSchedule