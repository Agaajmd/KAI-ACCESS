export const dynamic = "force-dynamic";
import { KursiType } from "@/app/karyawan/types";
import EditSeat from "./editSeat";
import DeleteSeat from "./deleteSeat";

type Props = {
    item: KursiType
};

const Seat = ({ item }: Props) => {
    return (
        <div>
            <div className="flex flex-col items-center gap-2">
                <div className="size-20 rounded-md flex items-center justify-center bg-sky-700">
                    <span className="text-white font-semibold">
                        {item.seat_number}
                    </span>
                </div>
                <EditSeat item={item} />
                <DeleteSeat seat={item} />
            </div>
        </div>
    );
};

export default Seat;
