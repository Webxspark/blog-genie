import {
    ChartGantt,
    // House, LinkIcon, Settings
    Zap
} from "lucide-react";
import {ROUTES} from "@/constants/routes.ts";

export const asideRec = [
    // {
    //     title: "Dashboard",
    //     icon: House,
    //     to: ROUTES.dashboard.home
    // },
    {
        title: "Agent",
        icon: Zap,
        to: ROUTES.dashboard.home
    },
    // {
    //     title: "Connections",
    //     icon: LinkIcon,
    //     to: ROUTES.dashboard.connections
    // },
    {
        title: "Timeline",
        icon: ChartGantt,
        to: ROUTES.dashboard.timeline
    },
    // {
    //     title: "Settings",
    //     icon: Settings,
    //     to: ROUTES.dashboard.instructions
    // }
]