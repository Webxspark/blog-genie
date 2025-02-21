import {Link, Outlet} from "react-router-dom";
import {Bot} from "lucide-react";
import {APP_CONFIG} from "@/constants/app.config.ts";
import {ROUTES} from "@/constants/routes.ts";
import authBG from "@/assets/auth-bg.png";
import {useEffect, useRef} from "react";

const AuthenticationLayout = () => {
    const isMounted = useRef(false)

    useEffect(() => {
        if (!isMounted.current) {
            isMounted.current = true
            if (localStorage.getItem(APP_CONFIG.app_code + '_user')) {
                window.location.href = (ROUTES.dashboard.home)
            }
        }
    }, []);
    return (
        <div className="grid min-h-svh lg:grid-cols-2">
            <div className="flex flex-col gap-4 p-6 md:p-10">
                <div className="flex justify-center gap-2 md:justify-start">
                    <Link to={ROUTES.home} className="flex items-center gap-2 font-medium">
                        <div
                            className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
                            <Bot className="size-4"/>
                        </div>
                        {APP_CONFIG.name}
                    </Link>
                </div>
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-xs">
                        <Outlet/>
                    </div>
                </div>
            </div>
            <div className="relative hidden bg-muted lg:block">
                <img
                    src={authBG}
                    alt="Image"
                    className="absolute inset-0 h-full w-full object-cover"
                />
            </div>
        </div>
    );
};

export default AuthenticationLayout;