import {Outlet} from "react-router-dom";
import AdminAside from "@/components/internals/admin-aside.tsx";
import AdminNav from "@/components/internals/admin-nav.tsx";

const AdminLayout = () => {
    return (
        <div>
            <div className={'flex min-h-screen'}>
                <div className={'hidden p-6 bg-[#111111] text-white dark:bg-black lg:block min-w-16 border-r'}>
                    <AdminAside/>
                </div>
                <div className={'flex flex-col w-full'}>
                    <AdminNav/>
                    <div className={'p-4'}><Outlet/></div>
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;