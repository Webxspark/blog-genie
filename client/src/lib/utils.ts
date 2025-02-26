import {clsx, type ClassValue} from "clsx"
import {twMerge} from "tailwind-merge"
import {APP_CONFIG} from "@/constants/app.config.ts";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export async function wxpFetch(url: string, method: string, body?: string, token?: string) {
    const fetchObj = {
        method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token || ""}`,
        },

    } as RequestInit
    if (method === "POST" || method === "PUT") {
        fetchObj.body = body || ""
    }
    const res = await fetch(`${APP_CONFIG.API_ENDPOINT}${url}`, fetchObj)
    // validate response
    // if (res.status !== 200) {
    //     const resp = await res.json()
    //     console.error(resp)
    //     // throw new Error(resp.msg || "Something went wrong :( [D-500]")
    //     return await res.json()
    // }
    // return await res.json()
    const response = await res.json()
    return {
        status: res.status,
        ...response
    }
}