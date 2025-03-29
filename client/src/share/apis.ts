import {wxpFetch} from "@/lib/utils.ts";
import {IAgentListFetchResp, IGeneral, ILoginResp, ITimelinePosts} from "@/share/responses";

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

export function fetchTimelines(token: string): Promise<IGeneral & {data: ITimelinePosts}>{
    return wxpFetch('/sudo/timelines', 'GET', "", token)
}

export function createNewTimeline(agent: string, token: string): Promise<IGeneral> {
    return wxpFetch('/sudo/new-timeline', 'POST', JSON.stringify({agent_tag: agent}), token)
}

export function deleteTimeline(token: string, timelineId: number): Promise<IGeneral> {
    return wxpFetch(`/sudo/timelines/${timelineId}`, 'DELETE', "", token)
}