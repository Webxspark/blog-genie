import {wxpFetch} from "@/lib/utils.ts";
import {IAgentListFetchResp, IGeneral, ILoginResp} from "@/share/responses";

export function login(email: string, password: string): Promise<ILoginResp> {
    return wxpFetch('/auth/login', 'POST', JSON.stringify({email, password}))
}

export function signup(username: string, email:string, password: string): Promise<IGeneral> {
    return wxpFetch('/auth/register', "POST", JSON.stringify({username, email, password}))
}

export function ping(token: string): Promise<IGeneral> {
    return wxpFetch('/sudo/ping', 'GET', "", token)
}

export function refreshToken(token: string): Promise<IGeneral & {access_token: string}> {
    return wxpFetch('/auth/refresh', 'POST', "", token)
}

export function createNewAgent(data:string, token: string): Promise<IGeneral> {
    return wxpFetch('/sudo/agents', 'POST', data, token)
}

export function fetchAgents(token: string): Promise<IAgentListFetchResp> {
    return wxpFetch('/sudo/agents', 'GET', "", token)
}