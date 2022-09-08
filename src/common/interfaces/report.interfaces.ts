import { INivel1, INivel2, INivel3, INivel4 } from "@interfaces";

interface ICommonBD{
    _id: string;
    updatedAt: Date | null;
    createdAt: Date;
    __v: number;
}

type INivel1BD = INivel1 & ICommonBD;
type INivel2BD = INivel2 & ICommonBD;
type INivel3BD = INivel3 & ICommonBD;
type INivel4BD = INivel4 & ICommonBD;

export interface IContaminanteDataResponse {
    _id: string;
    name: string;
    value: number;
    measureUnit: string;
    nivel1: INivel1BD[];
    nivel2: INivel2BD[];
    nivel3: INivel3BD[];
    nivel4: INivel4BD[];
    updatedAt: Date | null;
    createdAt: Date;
    __v: number;
}

export interface IValidateLineError {
    code: number;
    message: string;
}