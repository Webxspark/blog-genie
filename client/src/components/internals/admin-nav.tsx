import {APP_CONFIG} from "@/constants/app.config.ts";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import {IndianRupee, LogOut} from "lucide-react";

export const UserAvatar = () => {
    return <Avatar className={'cursor-pointer'}>
        <AvatarImage src="https://github.com/shadcn.png" alt="{{UserName}}"/>
        <AvatarFallback>Pfp</AvatarFallback>
    </Avatar>
}
const AdminNav = () => {
    return (
        <header
            className={'sticky top-0 flex items-center p-4 backdrop-blur-xl card-shadow z-[990] justify-between bg-white dark:bg-[#0a0a0a] xl:pe-8'}>
            <h1 className={'text-2xl font-semibold relative bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500'}>
                {APP_CONFIG.name}
            </h1>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <UserAvatar/>
                </DropdownMenuTrigger>
                <DropdownMenuContent className={'min-w-56 z-[999]'}>
                    <div className={'flex items-center gap-2 p-2'}>
                        <UserAvatar/>
                        <div className={'flex flex-col'}>
                            <h1 className={'font-semibold'}>{'Services ✨'}</h1>
                            <p className={'text-sm text-muted-foreground'}>{'services@webxspark.com'}</p>
                        </div>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                        <IndianRupee /> My Subscription
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                       <LogOut /> Logout
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </header>
    );
};

export default AdminNav;