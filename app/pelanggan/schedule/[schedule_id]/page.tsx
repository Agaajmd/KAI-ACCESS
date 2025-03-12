export const dynamic = "force-dynamic";

import { KeretaType, ScheduleType } from "@/app/karyawan/types";
import { axiosInstance } from "@/helper/api";
import { getServerCookie } from "@/helper/server-cookie";
import Booking from "./booking";

const showTime = (date: string) => {
    return new Date(date).toLocaleString("id-ID", {
        year: "numeric",
        month: "long",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
    });
};

const getTrainBySchedule = async (schedule_id: number): Promise<KeretaType | null> => {
    try {
        const TOKEN = await getServerCookie("token");
        const response = await axiosInstance.get(`/schedule/train/${schedule_id}`, {
            headers: { Authorization: `Bearer ${TOKEN}` }
        });
        return response.data.success ? response.data.data : null;
    } catch (error) {
        console.error(error);
        return null;
    }
};

const getScheduleDetail = async (schedule_id: number): Promise<ScheduleType | null> => {
    try {
        const TOKEN = await getServerCookie("token");
        const response = await axiosInstance.get(`/schedule/${schedule_id}`, {
            headers: { Authorization: `Bearer ${TOKEN}` }
        });
        return response.data.success ? response.data.data : null;
    } catch (error) {
        console.error(error);
        return null;
    }
};

type Props = {
    params: Promise<{
        schedule_id: number;
    }>
}

    const KeretaDetailPage = async (myProp: Props) => {
        const schedule_id = Number((await myProp.params).schedule_id)
        const detailSchedule = await getScheduleDetail(schedule_id)
        const detailKereta = await getTrainBySchedule(schedule_id)

    return (
        <div className="w-full p-5 bg-white shadow-md rounded-lg ">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Detail Keberangkatan Kereta</h1>
            <div className="bg-gray-100 p-4 rounded-lg">
                <table className="w-full text-left text-gray-700">
                    <tbody>
                        <tr>
                            <td className="font-semibold">
                            Stasiun Keberangkatan
                            </td>
                            <td>: {detailSchedule?.departured_location}</td>
                        </tr>
                        <tr>
                            <td className="font-semibold">
                                Waktu Keberangkatan</td>
                            <td>: {showTime(detailSchedule?.departured_time || "")}</td>
                        </tr>
                        <tr>
                            <td className="font-semibold">
                                Stasiun Tujuan</td>
                            <td>: {detailSchedule?.arrived_location}</td>
                        </tr>
                        <tr>
                            <td className="font-semibold">
                                Waktu Kedatangan</td>
                            <td>: {showTime(detailSchedule?.arrived_time || "")}</td>
                        </tr>
                        <tr>
                            <td className="font-semibold">
                                Nama Kereta</td>
                            <td>: {detailKereta?.name}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <Booking schedule_id={schedule_id} wagons={detailKereta?.wagons || []} />
        </div>
    );
};

export default KeretaDetailPage;