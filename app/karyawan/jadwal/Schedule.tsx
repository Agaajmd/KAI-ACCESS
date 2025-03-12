export const dynamic = "force-dynamic";
import { ScheduleType } from "../types"
import DeleteSchedule from "./deleteSchedule"
import EditSchedule from "./editSchedule"

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
        <div className="w-full border rounded-xl shadow-lg bg-white p-4 my-4 transition-all duration-300 hover:shadow-2xl hover:border-sky-200">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                <div className="p-4 border-r md:border-r-2 border-gray-300">
                    <small className="text-sm font-semibold text-sky-700 uppercase">Berangkat Dari</small>
                    <p className="text-lg font-bold">{myProps.item.departured_location}</p>
                    <small className="text-sm font-semibold text-sky-700 uppercase">Waktu Keberangkatan</small>
                    <p className="text-md font-medium text-gray-700">{showType(myProps.item.departured_time)}</p>
                </div>

                <div className="p-4 border-r md:border-r-2 border-gray-300">
                    <small className="text-sm font-semibold text-sky-700 uppercase">Tiba Di</small>
                    <p className="text-lg font-bold">{myProps.item.arrived_location}</p>
                    <small className="text-sm font-semibold text-sky-700 uppercase">Waktu Kedatangan</small>
                    <p className="text-md font-medium text-gray-700">{showType(myProps.item.arrived_time)}</p>
                </div>

                <div className="p-4 border-r md:border-r-2 border-gray-300">
                    <small className="text-sm font-semibold text-sky-700 uppercase">Unit Kereta</small>
                    <p className="text-lg font-bold">{myProps.item.train_details.name}</p>
                    <small className="text-sm font-semibold text-sky-700 uppercase">Harga</small>
                    <p className="text-md font-medium text-green-600">{myProps.item.price.toLocaleString(`en-US`, { style: `currency`, currency: `IDR` })}</p>
                </div>

                <div className="p-4 flex flex-col justify-center items-center">
                    <small className="text-sm font-medium text-gray-600">Opsi</small>
                    <div className="flex gap-3 mt-2">
                        <EditSchedule item={myProps.item} />
                        <DeleteSchedule schedule={myProps.item} />
                    </div>
                </div>
            </div>
        </div>

    )
}
export default Schedule