
export interface IWikkiSummary {
    title: string;
    description: string;
    thumbnail: string;
    contentLink: string;
}

export interface IWikkiSummaryResponse {
    status: boolean;
    data: IWikkiSummary
}