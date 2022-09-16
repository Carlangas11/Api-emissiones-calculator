import { EErrorSource } from "../enum";

export interface IError {
    source: EErrorSource;
    line?: number;
    relatedID?: string;
    operation: string;
    description: string;
    debugData: object;
}
