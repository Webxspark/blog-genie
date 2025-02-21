import {Outlet} from "react-router-dom";
import AdminAside from "@/components/internals/admin-aside.tsx";
import AdminNav from "@/components/internals/admin-nav.tsx";
import {useAdminStore, User} from "@/contexts/app-store.ts";
import {useEffect, useRef, useState} from "react";
import {APP_CONFIG} from "@/constants/app.config.ts";
import PreLoader from "@/components/internals/pre-loader.tsx";
import {ROUTES} from "@/constants/routes.ts";

const AdminLayout = () => {
    const user = useAdminStore(state => state.user)
    const setUser = useAdminStore(state => state.setUser)
    const isAuthChecked = useAdminStore(state => state.isAuthChecked)
    const setIsAuthChecked = useAdminStore(state => state.setIsAuthChecked)
    const error = useAdminStore(state => state.error)
    const setError = useAdminStore(state => state.setError)
    const isMounted = useRef(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (!isMounted.current) {
            isMounted.current = true
            setLoading(true)
            const user = localStorage.getItem(APP_CONFIG.app_code + '_user')
            if (user) {
                const parsedUser: User = JSON.parse(user)
                setUser(parsedUser)
                // validate user session
            } else {
                setError('You are not logged in!')
                window.location.href = (ROUTES.authentication.login)
            }
        }
    }, [setError, setUser])
    return (
        <div>
            <div className={'flex min-h-screen'}>
                <div className={'hidden p-6 bg-[#111111] text-white dark:bg-black lg:block min-w-16 border-r'}>
                    <AdminAside/>
                </div>
                <div className={'flex flex-col w-full'}>
                    <AdminNav/>
                    <div className={'p-4'}>
                        {
                            loading && <PreLoader className={'h-[50dvh]'}/> ||
                            (!error && isAuthChecked && user) && <Outlet/> ||
                            <div className={'text-center'}>
                                <h1 className={'text-2xl font-semibold'}>{error}</h1>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;