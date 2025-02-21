import {wxpFetch} from "@/lib/utils.ts";
import {IGeneral, ILoginResp} from "@/share/responses";

export function login(email: string, password: string): Promise<ILoginResp> {
    return wxpFetch('/auth/login', 'POST', JSON.stringify({email, password}))
}

export function signup(username: string, email:string, password: string): Promise<IGeneral> {
    return wxpFetch('/auth/register', "POST", JSON.stringify({username, email, password}))
}