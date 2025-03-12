"use client"

import Link from "next/link"
import DropKereta from "./deleteKereta"
import EditKereta from "./editKereta"
import { KeretaType } from "@/app/karyawan/types"

type props = {
    item: KeretaType
}
const Train = (myProp: props) => {
    return (
        <div className="w-full flex flex-wrap p-4 my-4  border shadow-lg rounded-xl transition-all duration-300 hover:shadow-2xl hover:border-sky-200">
            <div className="w-full md:w-4/12 p-2 flex flex-col">
                <small className="text-sm font-medium">
                    Nama Kereta
                </small>
                <span className="text-base text-sky-600 hover:underline">
                    <Link href={`/karyawan/kereta/${myProp.item.id}`}>
                        {myProp.item.name}
                    </Link>
                </span>
            </div>
            <div className="w-full md:w-4/12 p-2 flex flex-col">
                <small className="text-sm font-medium">
                    Deskripsi Kereta
                </small>
                <span>
                    {myProp.item.descriptions}
                </span>
            </div>
            <div className="w-full md:w-2/12 p-2 flex flex-col">
                <small className="text-sm font-medium">
                    Tipe Kereta
                </small>
                <span>
                    {myProp.item.type}
                </span>
            </div>
            <div className="w-full md:w-2/12 p-2 flex flex-col">
                <small className="text-sm font-medium">
                    Opsi
                </small>
                <div className="flex gap-2 items-center">
                    <EditKereta kereta={myProp.item} />
                    <DropKereta kereta={myProp.item} />
                </div>

            </div>
        </div>
    )
}
export default Train