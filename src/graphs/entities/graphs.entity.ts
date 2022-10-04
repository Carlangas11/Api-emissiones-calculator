import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { IsArray, IsMongoId, IsOptional, IsString, IsIn, MaxLength, ArrayNotEmpty, ArrayMaxSize, ArrayUnique } from 'class-validator';


//////////////////////// request graficos below ////////////////////////
@InputType()
export class GenerateGraphsRequest {

    @Field()
    @IsMongoId({ message: 'El id del reporte no es válido' })
    idReport: string;

    @Field(() => [Number], { nullable: true })
    @IsOptional()
    @IsArray({ message: 'alcances no es valido. Type: array[number]' })
    @IsIn([1, 2, 3], {
        message: 'El alcance solicitado no es valido. numbers: 1,2,3 ',
        each: true,
    })
    @ArrayNotEmpty()
    @ArrayMaxSize(2, {
        message: 'El numero de alcances solicitados no es valido.  max_length: 2',
    })
    @ArrayUnique()

    alcances?: number[];
}
//////////////////////// request graficos adobe ////////////////////////

//////////////////////// response graficos below ////////////////////////
@ObjectType()
export class TotalEmissionsDTO {

    @Field()
    @IsString()
    emisionTotal: number;

    @Field()
    @IsString()
    unidadMedida: string;
}

@ObjectType()
export class EmisionesPorClasificacionDTO {

    @Field()
    @IsString()
    nombre: string;

    @Field()
    @IsString()
    valor: number;

    @Field()
    @IsString()
    unidadMedida: string;
}

@ObjectType()
export class AlcanceDTO {

    @Field()
    totalPorAlcance: TotalEmissionsDTO;

    @Field(() => [EmisionesPorClasificacionDTO])
    emisionesPorUnidad: EmisionesPorClasificacionDTO[];

    @Field(() => [EmisionesPorClasificacionDTO])
    emisionesPorNivel2: EmisionesPorClasificacionDTO[];

    @Field(() => [EmisionesPorClasificacionDTO])
    emisionesPorNivel3: EmisionesPorClasificacionDTO[];
}

@ObjectType()
export class EmisionesPorAlcanceDTO {
    @Field(() => AlcanceDTO, { nullable: true })
    @IsOptional()
    alcance1?: AlcanceDTO;

    @Field(() => AlcanceDTO, { nullable: true })
    @IsOptional()
    alcance2?: AlcanceDTO;

    @Field(() => AlcanceDTO, { nullable: true })
    @IsOptional()
    alcance3?: AlcanceDTO;
}

@ObjectType()
export class GenerateGraphsResponse {

    @Field(() => TotalEmissionsDTO)
    totalEmissions: TotalEmissionsDTO;

    @Field(() => EmisionesPorAlcanceDTO)
    totalEmissionsByAlcance: EmisionesPorAlcanceDTO;
}

//////////////////////// response graficos adobe ////////////////////////