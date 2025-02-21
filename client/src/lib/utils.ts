import {clsx, type ClassValue} from "clsx"
import {twMerge} from "tailwind-merge"
import {APP_CONFIG} from "@/constants/app.config.ts";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export async function wxpFetch(url: string, method: string, body: string, token?: string) {
    const res = await fetch(`${APP_CONFIG.API_ENDPOINT}${url}`, {
        method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token || ""}`,
        },
        body: body,
    })
    // validate response
    if (res.status !== 200) {
        const resp = await res.json()
        console.error(resp)
        throw new Error(resp.msg || "Something went wrong :( [D-500]")
    }
    return await res.json()
}