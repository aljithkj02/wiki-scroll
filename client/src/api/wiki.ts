import { api } from "."
import { IWikkiSummaryResponse } from "./types/wikki-summary";

export const getRandomWiki = async () => {
    try {
        const res = await api.get<IWikkiSummaryResponse>('random');
        
        return res.data;
    } catch (error) {
        console.log((error as Error).message)
        return null;
    }
}