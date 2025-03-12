export const dynamic = "force-dynamic";
import { ScheduleType } from "@/app/karyawan/types"
import Link from "next/link"

type Props = {
    item: ScheduleType
}

const showType = (date: string) => {
    const currentDate = new Date(date)
    return currentDate
        .toLocaleTimeString(`id-ID`, {
            year: "numeric",
            month: "long",
            day: "2-digit"
        })
}
const Schedule = async (myProps: Props) => {
    return (
        <div className="flex flex-wrap w-full border rounded-lg shadow-lg my-4 p-4 bg-white transition-all duration-300 hover:shadow-2xl hover:border-sky-200">
            <div className="w-full md:w-3/12 p-3 flex flex-col border-r">
                <span className="text-xs font-semibold text-sky-700">Berangkat Dari</span>
                <strong className="text-lg text-gray-800">{myProps.item.departured_location}</strong>
                <span className="text-xs font-semibold text-sky-700 mt-2">Waktu Keberangkatan</span>
                <strong className="text-lg text-gray-800">{showType(myProps.item.departured_time)}</strong>
            </div>
            <div className="w-full md:w-3/12 p-3 flex flex-col border-r">
                <span className="text-xs font-semibold text-sky-700">Tiba Di</span>
                <strong className="text-lg text-gray-800">{myProps.item.arrived_location}</strong>
                <span className="text-xs font-semibold text-sky-700 mt-2">Waktu Kedatangan</span>
                <strong className="text-lg text-gray-800">{showType(myProps.item.arrived_time)}</strong>
            </div>
            <div className="w-full md:w-4/12 p-3 flex flex-col border-r">
                <span className="text-xs font-semibold text-sky-700">Unit Kereta</span>
                <strong className="text-lg text-gray-800">{myProps.item.train_details.name}</strong>
                <span className="text-xs font-semibold text-sky-700 mt-2">Harga</span>
                <strong className="text-lg text-green-600">{myProps.item.price.toLocaleString(`en-US`, { style: `currency`, currency: `IDR` })}</strong>
            </div>
            <div className="w-full md:w-2/12 p-3 flex flex-col justify-center items-center">
                <span className="text-sm font-medium text-gray-700">Opsi</span>
                <Link href={`/pelanggan/schedule/${myProps.item.id}`}>
                    <button className="px-5 py-2 mt-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-white shadow-md transition-all">
                        Pesan
                    </button>
                </Link>
            </div>
        </div>
    )
}
export default Schedule