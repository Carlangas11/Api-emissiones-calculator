import { Field, ObjectType } from "@nestjs/graphql";
import { IsArray, isIn, IsIn, IsMongoId, IsOptional } from "class-validator";

@ObjectType()
export class GenerateGraphsRequest {

    @Field()
    @IsMongoId({ message: 'El id del reporte no es válido' })
    idReport: string;

    @Field()
    @IsOptional()
    @IsArray()
    @IsIn(
        [[1, 2], [2, 3], [1, 3], [1], [2], [3], [2, 1], [3, 2], [3, 1]],
        { message: 'El tipo de alcances solicitados no es valido. Type: array[number] | numbers: 1,2,3 | max_length: 2 | for all data, dont add alcances property' }
    )
    alcances?: number[];

}

@ObjectType()
export class GenerateGraphsResponse {


}