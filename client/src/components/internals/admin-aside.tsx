import Logo from "@/assets/Logo.tsx";
import {Link, useLocation} from "react-router-dom";
import {ROUTES} from "@/constants/routes.ts";
import {asideRec} from "@/constants/aside.tsx";
import {cn} from "@/lib/utils.ts";

const AdminAside = () => {
    const {pathname} = useLocation()
    return (
        <div className={'h-full'}>
            <Link className={'flex items-center justify-center'} to={ROUTES.dashboard.home}>
                <Logo/>
            </Link>
            <div className={'flex justify-center min-h-[200px] h-[80dvh] flex-col gap-6'}>
                {
                    asideRec.map((item, index) => {
                        const isActive = pathname === item.to
                        return (<div key={index}>
                            <Link to={item.to}
                                  className={'group w-full flex cursor-pointer flex-col items-center gap-1.5 pb-1.5'}
                            >
                            <span
                                className={cn(
                                    'rounded-3xl bg-gray-0/0 px-4 py-2 text-white transition-colors duration-200 group-hover:bg-[#1f1f1f]  group-hover:bg-gray-[#1f1f1f]',
                                    isActive ? 'bg-[#1f1f1f]' : ''
                                )}>
                            <item.icon className={'size-5'}/>
                            </span>
                                <span className={'text-sm'}>
                                {item.title}
                            </span>
                            </Link>
                        </div>)
                    })
                }
            </div>
        </div>
    );
};

export default AdminAside;