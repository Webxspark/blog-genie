export interface IGeneral {
    action?: string;
    msg: string,
    status?: number
}

export interface ILoginResp extends IGeneral {
    access_token: string,
    refresh_token: string
}

export interface IAgentListFetchResp extends IGeneral {
    data: {
        blogcat: string,
        blogdesc: string,
        cdescription: string,
        cname: string,
        cniche: string,
        id: number,
        instructions: string,
        name: string,
        postfreq: number,
        tag: string,
        user: string,
    }[]
}