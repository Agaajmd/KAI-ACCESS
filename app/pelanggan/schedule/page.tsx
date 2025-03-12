export const dynamic = "force-dynamic";
import { ScheduleType } from "@/app/karyawan/types";
import FilterJadwal from "./FilterJadwal"
import { axiosInstance } from "@/helper/api";
import { getServerCookie } from "@/helper/server-cookie";
import Schedule from "./Schedule";

const getJadwal = async (departured_location: string, arrived_location: string): Promise<ScheduleType[]> => {
    try {
        const url = `/schedule?departured_location=${departured_location}&arrived_location=${arrived_location}`
        const TOKEN = await getServerCookie(`token`);

        const response: any = await axiosInstance.get(url, {
            headers: { authorization: `Bearer ${TOKEN}` },
        });
        console.log(`url: ${url}`);
        
        if (response.data.success === true) {
            return response.data.data;
        }

        return [];
    } catch (error) {
        console.log(error);
        return [];
    }
};

type props = {
    searchParams: Promise<{
        departured_location?: string
        arrived_location?: string
    }>
}

const JadwalPage = async (myProps: props) => {
    const departured_location = (await myProps.searchParams).departured_location?.toString() || ""
    const arrived_location = (await myProps.searchParams).arrived_location?.toString() || ""
    const dataJadwal = await getJadwal(departured_location, arrived_location)
    console.log(departured_location, arrived_location);


    return (
        <div className="w-full p-3 bg-white">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-800 w-full rounded-md shadow-md">
                <h1 className="text-white p-3 text-xl font-bold">
                    Pemesanan Tiket Kereta Api
                </h1>

                <FilterJadwal
                    departuredLocation={departured_location}
                    arrivedLocation={arrived_location}
                />
            </div>

            {
                departured_location !== "" &&
                arrived_location !== "" &&
                <div className="my-3">
                    {
                        dataJadwal.length == 0 ?
                            <div className="w-full p-3 rounded-md bg-orange-200">
                                Maaf, jadwal tidak tersedia
                            </div> :
                            <div>
                                {
                                    dataJadwal.map((jadwal, index) => (
                                        <Schedule key={`keyJadwal-${index}`} item={jadwal} />
                                    ))
                                }
                            </div>
                    }
                </div>
            }
        </div>
    )
}

export default JadwalPage