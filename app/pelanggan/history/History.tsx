export const dynamic = "force-dynamic";
import { PurchaseDetail, ScheduleType } from "@/app/karyawan/types";

const showTime = (date: string) => {
    return new Date(date).toLocaleString("id-ID", {
        year: "numeric",
        month: "long",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
    });
};
interface History {
    id: number;
    purchase_date: string;
    customer_id: number;
    schedule_id: number;
    createdAt: string;
    updatedAt: string;
    purchases_details: PurchaseDetail[]
    schedule_details: ScheduleType
}

interface Props {
    item: History
}

const History = (props: Props) => {
    return (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 w-full transition-all duration-300 hover:shadow-2xl hover:border-sky-200 mb-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
                <InfoSection
                    title="TGL ORDER"
                    content={showTime(props.item.purchase_date)}
                />
                <InfoSection
                    title="Stasiun Awal"
                    content={props.item.schedule_details.departured_location}
                    subContent={showTime(props.item.schedule_details.departured_time)}
                />
                <InfoSection
                    title="Stasiun Akhir"
                    content={props.item.schedule_details.arrived_location}
                    subContent={showTime(props.item.schedule_details.arrived_time)}
                />
                <InfoSection
                    title="Nama Kereta"
                    content={props.item.schedule_details.train_details?.name || "-"}
                />
            </div>

            <div className="space-y-10">
                <h1 className="text-2xl font-bold text-sky-800 mb-4 tracking-wide border-b-2 border-sky-200 pb-2">
                    🚆 List Penumpang
                </h1>
                <div className="overflow-x-auto rounded-xl border border-sky-200 shadow-md bg-sky-50/30">
                    <table className="w-full text-sm text-gray-700">
                        <thead className="bg-sky-300/30">
                            <tr>
                                <th className="text-sky-800 text-base font-semibold py-4 px-5 text-left tracking-wide uppercase">
                                    Nama
                                </th>
                                <th className="text-sky-800 text-base font-semibold py-4 px-5 text-left tracking-wide uppercase">
                                    NIK
                                </th>
                                <th className="text-sky-800 text-base font-semibold py-4 px-5 text-left tracking-wide uppercase">
                                    Nomor
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-sky-100">
                            {props.item.purchases_details.map((item, index) => (
                                <tr
                                    key={index}
                                    className="hover:bg-sky-100/40 transition-colors duration-200 rounded-lg"
                                >
                                    <td className="py-5 px-5 text-gray-900 font-semibold">
                                        {item.passanger_name}
                                    </td>
                                    <td className="py-5 px-5 text-gray-900 font-semibold">
                                        {item.passanger_id}
                                    </td>
                                    <td className="py-5 px-5 text-gray-900 font-semibold">
                                        {item.seat_number}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    )
}

const InfoSection = ({ title, content, subContent }: {
    title: string;
    content: string;
    subContent?: string;
}) => (
    <div className="space-y-3 bg-sky-200/30 p-5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-sky-300">
        <div className="font-bold text-sky-900 text-lg tracking-wide uppercase">
            {title}
        </div>
        <div className="font-semibold text-gray-900 text-base leading-relaxed">
            {content}
        </div>
        {subContent && (
            <div className="font-medium text-gray-700 text-sm italic">
                {subContent}
            </div>
        )}
    </div>
);
export default History;