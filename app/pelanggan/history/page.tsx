export const dynamic = "force-dynamic";
import { axiosInstance } from '@/helper/api'
import React from 'react'
import History from './History'
import { HistoryType } from '@/app/karyawan/types'
import { getServerCookie } from '@/helper/server-cookie'
import FilterHistory from './FilterHistory'

type Props = {
    searchParams: {
        start_date?: string,
        end_date?: string,
    }
}

const GetDataHistory = async (start_date?: string, end_date?: string): Promise<HistoryType[]> => {
    try {
        const token = await getServerCookie('token')
        const response: any = await axiosInstance.get(`/purchase/customer?start_date=${start_date}&end_date=${end_date}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        if (!response.data.success) return []

        return response.data.data
    } catch (error) {
        console.log(error)
        return []
    }
}

const page = async (myProp: Props) => {
    const start_date = myProp.searchParams.start_date || ""
    const end_date = myProp.searchParams.end_date || ""
    const historyData = await GetDataHistory(start_date, end_date)

    return (
        <div className='mx-3'>
            <h1 className='text-left text-2xl font-bold p-3'>History Pemesanan</h1>
            <FilterHistory start_date={start_date}
                end_date={ end_date} />
            <div className='flex flex-col p-3'>
                {
                    historyData.map((item, index) => (
                        <History key={index} item={item} />
                    ))
                }
            </div>
        </div>
    )
}

export default page