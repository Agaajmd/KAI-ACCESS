"use client"

import { KursiType } from "@/app/karyawan/types";
import Modal from "@/components/Modal";
import { FormEvent, useState } from "react";

type SeatBook = {
    passanger_id: string;
    passanger_name: string;
    seat_number: string;
};

type Props = {
    item: KursiType;
    onSave: (item: SeatBook) => void;
};

const Seat = ({ item, onSave }: Props) => {
    const [show, setShow] = useState(false);
    const [passangerId, setPassangerId] = useState("");
    const [passangerName, setPassangerName] = useState("");

    const openModal = () => {
        setShow(true);
        setPassangerId("");
        setPassangerName("");
    };

    const closeModal = () => setShow(false);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setShow(false);
        onSave({ passanger_id: passangerId, passanger_name: passangerName, seat_number: item.seat_number });
    };

    return (
        <div>
            <button
                type="button"
                onClick={openModal}
                disabled={item.used}
                className="size-12 flex items-center justify-center font-semibold rounded-lg bg-sky-500 disabled:bg-gray-400 text-white shadow-md hover:bg-sky-600 transition-all ">
                {item.seat_number}
            </button>

            <Modal isShow={show}>
                <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6">
                    <div className="mb-4">
                        <h1 className="text-xl font-semibold text-gray-800">Identitas Penumpang</h1>
                        <p className="text-sm text-gray-500">Pastikan data yang diisi sudah benar</p>
                    </div>
                    <div className="mb-4">
                        <label className="text-sm font-semibold text-gray-600">Nomor Kursi</label>
                        <p className="text-lg font-bold text-gray-800">{item.seat_number}</p>
                    </div>
                    <div className="mb-4">
                        <label className="text-sm font-semibold text-gray-600">NIK Penumpang</label>
                        <input
                            type="number"
                            required
                            value={passangerId}
                            onChange={(e) => setPassangerId(e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-800 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="text-sm font-semibold text-gray-600">Nama Penumpang</label>
                        <input
                            type="text"
                            required
                            value={passangerName}
                            onChange={(e) => setPassangerName(e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-800 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                        />
                    </div>
                    <div className="flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={closeModal}
                            className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-md transition-all">
                            Close
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-md transition-all">
                            Save
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default Seat;
