export interface IGeneral {
    action?: string;
    msg: string,
    status?: number
}

export interface ILoginResp extends IGeneral {
    access_token: string,
    refresh_token: string
}