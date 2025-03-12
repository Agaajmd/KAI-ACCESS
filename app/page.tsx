"use client"

import { FormEvent, useState } from "react"
import { toast, ToastContainer } from "react-toastify"
import { axiosInstance } from "@/helper/api"
import { useRouter } from "next/navigation"
import { storeCookie } from "@/helper/client-cookie"

const LoginPage = () => {
  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  const router = useRouter()
  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault()

      const response: any = await axiosInstance.post('/auth', {
        username,
        password
      })

      if (response.data.success === false) {
        return toast(response.data.message, {
          type: 'warning',
          containerId: 'toastLogin'
        })
      }

      storeCookie('token', response.data.token)

      toast(response.data.message, {
        containerId: 'toastLogin',
        type: 'success',
      })

      if (response.data.role === 'ADMIN') {
        setTimeout(() => router.replace('/karyawan/kereta'), 1000)
      } else {
        setTimeout(
          () => router.replace(`/pelanggan/schedule`),
          1000
        )
      }

    } catch (error) {
      console.log(error)
      toast('some thing went wrong', {
        containerId: 'toastLogin',
        type: 'error',
      })
    }
  }
  return (
    <div className="flex justify-center items-center w-screen h-screen bg-gradient-to-r from-blue-500 to-purple-700">
      <ToastContainer containerId="toastLogin" position="top-center" autoClose={3000} />
      <form onSubmit={handleSubmit} className="w-96 p-8 bg-white shadow-2xl rounded-2xl border border-gray-200">
        <h1 className="text-3xl font-bold text-center text-purple-700 mb-6">Welcome Back</h1>

        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-purple-400 focus:outline-none"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-purple-400 focus:outline-none"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 text-white bg-purple-600 hover:bg-purple-500 rounded-lg transition-all shadow-md hover:shadow-lg"
        >
          Login
        </button>
      </form>
    </div>


  )
}
export default LoginPage