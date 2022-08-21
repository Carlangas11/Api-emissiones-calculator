import { createUnionType } from "@nestjs/graphql";
import { nivel1Model, nivel2Model, nivel3Model, nivel4Model, contaminanteModel } from '.';

export const ResultUnion = createUnionType({
    name: 'ResultUnion',
    types: () => [nivel1Model, nivel2Model, nivel3Model, nivel4Model, contaminanteModel] as const,
    resolveType({ _doc }) {
        switch (checkModel(_doc)) {
            case 'nivel1':
                return nivel1Model;
            case 'nivel2':
                return nivel2Model;
            case 'nivel3':
                return nivel3Model;
            case 'nivel4':
                return nivel4Model;
            case 'contaminante':
                return contaminanteModel;
            default:
                return null;
        }
    }
});


const checkModel = (value: object): string => {

    if(Object.keys(value).length === 5)
        return 'nivel1';
    if(Object.keys(value).length === 6 && Object.keys(value).includes('nivel1'))
        return 'nivel2';
    if(Object.keys(value).length === 6 && Object.keys(value).includes('nivel2'))
        return 'nivel3';
    if(Object.keys(value).length === 7)
        return 'nivel4';
    if(Object.keys(value).length === 10)
        return 'contaminante';


    return 'undetected';
}