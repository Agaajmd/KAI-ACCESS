export const dynamic = "force-dynamic";
import { User } from "@/app/karyawan/types";
import DropUser from "./deleteAdmin";
import EditUser from "./editAdmin";
import ResetPassword from "./resetPassword";

interface Props {
    item: User
}

const Users = ({ item }: Props) => {
    return (
        <div className="w-full flex flex-wrap bg-white shadow-md rounded-lg p-4 border border-gray-200 mb-4 transition-all duration-300 hover:shadow-2xl hover:border-sky-200">
            <div className="w-full md:w-4/12 p-2 flex flex-col">
                <small className="text-xs font-semibold text-gray-500 uppercase">Nama</small>
                <span className="text-lg font-medium text-gray-900">{item.name}</span>
            </div>
            <div className="w-full md:w-4/12 p-2 flex flex-col">
                <small className="text-xs font-semibold text-gray-500 uppercase">Username</small>
                <span className="text-lg font-medium text-gray-900">{item.user_details.username}</span>
            </div>
            <div className="w-full md:w-4/12 p-2 flex flex-col">
                <small className="text-xs font-semibold text-gray-500 uppercase">Opsi</small>
                <div className="flex gap-2 items-center mt-4">
                    <EditUser item={item} />
                    <DropUser item={item} />
                    <ResetPassword item={item} />
                </div>
            </div>
        </div>
    );
};

export default Users;
