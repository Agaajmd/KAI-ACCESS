// file ini digunakan untuk inisiasi dan cconfigurasi axios
// axios -> untuk komunikasi dengan backend
import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    headers: {
        "Content-Type": "application/json",
        "APP-KEY": process.env.NEXT_PUBLIC_APP_KEY
    }
})