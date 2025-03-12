export const dynamic = "force-dynamic";
import { GerbongType } from "@/app/karyawan/types"
import AddSeat from "./addSeat"
import DropGerbong from "./deleteGerbong"
import EditGerbong from "./editGerbong"
import Seat from "./Seat"

type props = {
    item: GerbongType
}

const Gerbong = (myProp: props) => {
    return (
        <div className="w-full my-4 bg-white rounded-lg shadow-lg p-5">
            <div className="mb-4">
                <small className="text-xs text-sky-600 font-semibold">Nama Gerbong</small>
                <h2 className="text-lg font-bold text-gray-900">{myProp.item.name}</h2>
                <p className="text-gray-700">Jumlah Kursi: {myProp.item.seat_count}</p>
            </div>
            <div className="w-full my-3">
                <div className="mb-3 flex justify-end">
                </div>
                {myProp.item.seats.length === 0 ? (
                    <div className="bg-sky-200 p-4 rounded-md text-center text-gray-700">
                        Gerbong ini belum memiliki kursi
                    </div>
                ) : (
                    <div className="flex flex-wrap gap-3">
                        {myProp.item.seats.map((seat, index) => (
                            <Seat key={`keySeat-${index}`} item={seat} />
                        ))}
                    </div>
                )}
            </div>
            <div className="flex justify-end gap-3 mt-4">
                <AddSeat wagon_id={myProp.item.id} />
                <EditGerbong item={myProp.item} />
                <DropGerbong item={myProp.item} />
            </div>
        </div>
    )
}
export default Gerbong