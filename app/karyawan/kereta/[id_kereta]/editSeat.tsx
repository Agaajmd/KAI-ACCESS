"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import Modal from "@/components/Modal";
import { toast, ToastContainer } from "react-toastify";
import { KursiType } from "@/app/karyawan/types";
import { getCookie } from "@/helper/client-cookie";
import { axiosInstance } from "@/helper/api";

type Props = {
    item: KursiType
};

const EditSeat = (myProp: Props) => {
    const [seatNumber, setSeatNumber] = useState<string>(myProp.item.seat_number);
    const [show, setShow] = useState<boolean>(false);
    const router = useRouter();

    const openModal = () => {
        setShow(true);
        setSeatNumber(myProp.item.seat_number); // Set nilai kursi saat modal dibuka
    };

    const closeModal = () => {
        setShow(false);
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const TOKEN = getCookie("token");
            const url = `/train/wagon/seat/${myProp.item.id}`; // Perbaikan endpoint
            const requestData = { seat_number: seatNumber };

            const response = await axiosInstance.put(url, requestData, {
                headers: { Authorization: `Bearer ${TOKEN}` }, // "Bearer" harus benar
            });

            const data = response.data as { success: boolean; message: string };
            toast(data.message, {
                containerId: `toastEdit-${myProp.item.id}`,
                type: data.success ? "success" : "warning",
            });

            if (data.success) {
                setShow(false);
                setTimeout(() => router.refresh(), 1000);
            }
        } catch (error) {
            console.error(error);
            toast("Something went wrong", {
                containerId: `toastEdit-${myProp.item.id}`,
                type: "error",
            });
        }
    };

    return (
        <div>
            <ToastContainer containerId={`toastEdit-${myProp.item.id}`} />
            <button
                type="button"
                onClick={openModal}
                className="px-7 py-1 bg-sky-600 hover:bg-sky-500 text-white rounded-md"
            ><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                </svg>

            </button>

            <Modal isShow={show}>
                <form onSubmit={handleSubmit}>
                    {/* Modal Header */}
                    <div className="w-full p-3 rounded-t-lg">
                        <h1 className="font-semibold text-lg">Edit Kursi</h1>
                        <span className="text-sm text-slate-500">Pastikan data sudah benar</span>
                    </div>

                    {/* Modal Body */}
                    <div className="w-full p-3">
                        <label className="block mb-2 text-sm font-semibold text-sky-600">Nomor Kursi</label>
                        <input
                            type="text"
                            value={seatNumber}
                            onChange={(e) => setSeatNumber(e.target.value)}
                            required
                            className="w-full p-2 border rounded-md"
                        />
                    </div>

                    {/* Modal Footer */}
                    <div className="w-full p-3 rounded-b-lg flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={closeModal}
                            className="px-4 py-2 rounded-md bg-gray-500 hover:bg-gray-400 text-white"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-500 text-white"
                        >
                            Simpan
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default EditSeat;
