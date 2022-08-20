import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { nivel1, nivel2, nivel3, nivel4, contaminantes } from 'src/common/bd/huellaChileDB';
import { IContaminante, INivel2, INivel3, INivel4 } from 'src/common/bd/interfaces';
import { setTimeout } from 'timers';

// import { FindUserInput, UserInput, UpdateUserInput } from './input/users.input';
import { Nivel1, Nivel2, Nivel3, Nivel4, Contaminante } from './schema';


@Injectable()
export class NivelesService {
    constructor(
        @InjectModel(Nivel1.name)
        private nivel1Model: Model<Nivel1>,
        @InjectModel(Nivel2.name)
        private nivel2Model: Model<Nivel2>,
        @InjectModel(Nivel3.name)
        private nivel3Model: Model<Nivel3>,
        @InjectModel(Nivel4.name)
        private nivel4Model: Model<Nivel4>,
        @InjectModel(Contaminante.name)
        private contaminanteModel: Model<Contaminante>,
    ) { }

    private readonly logger = new Logger('NivelesService');

    async seed(lvl: string): Promise<string> {

        switch (lvl) {
            case '1':
                return await this.seedLvl1();
            case '2':
                return await this.seedLvl2();
            case '3':
                return await this.seedLvl3();
            case '4':
                return await this.seedLvl4();
            case 'contaminantes':
                return await this.seedContaminantes();
            default:
                throw new BadRequestException('Nivel no valido');
        }
    }
    async seedLvl1(): Promise<string> {
        this.logger.log('Seeding started');
        this.logger.log(`Seeding nivel1, ${nivel1.length} items`);
        try {
            await this.nivel1Model.deleteMany({});
            await this.nivel1Model.insertMany(nivel1);
            this.logger.log(`Finished nivel1`);
        } catch (error) {
            throw new InternalServerErrorException('Error al crear semilla nivel1');
        }
        return 'Seed nivel1 working ...';
    }
    async seedLvl2(): Promise<string> {
        this.logger.log('Seeding started');
        this.logger.log(`Seeding nivel2, ${nivel2.length} items`);
        const nivel2Related: INivel2[] = [];
        nivel2.forEach(async (registro) => {
            const nivel1 = await this.nivel1Model.findOne({ name: registro.nivel1 });
            if (nivel1) {
                registro.nivel1 = nivel1._id;
                nivel2Related.push(registro);
            }
        });
        try {
            setTimeout(async () => {
                await this.nivel2Model.deleteMany({});
                await this.nivel2Model.insertMany(nivel2Related);
                this.logger.log(`Finished nivel2`);
            }, 1500);
        } catch (error) {
            throw new InternalServerErrorException('Error al crear semilla nivel2');
        }
        return 'Seed nivel2 working ...';
    }
    async seedLvl3(): Promise<string> {
        this.logger.log('Seeding started');
        this.logger.log(`Seeding nivel3, ${nivel3.length} items`);

        const nivel3Related: INivel3[] = [];
        nivel3.forEach(async (registro) => {
            const nivel2 = await this.nivel2Model.findOne({ name: registro.nivel2 });
            if (nivel2) {
                registro.nivel2 = nivel2._id;
                nivel3Related.push(registro);
            }
        });
        try {
            setTimeout(async () => {
                await this.nivel3Model.deleteMany({});
                await this.nivel3Model.insertMany(nivel3Related);
                this.logger.log(`Finished nivel3`);
                return 'Seed nivel3 executed successfully';
            }, 3500);
        } catch (error) {
            throw new InternalServerErrorException('Error al crear semilla nivel3');
        }
        return 'Seed nivel3 working ...';
    }
    async seedLvl4(): Promise<string> {
        this.logger.log('Seeding started');
        this.logger.log(`Seeding nivel4, ${nivel4.length} items`);

        const nivel4Related: INivel4[] = [];
        nivel4.forEach(async (registro) => {
            const nivel2 = await this.nivel2Model.findOne({ name: registro.nivel2 });
            if (nivel2) {
                registro.nivel2 = nivel2._id;
            }
            const nivel3 = await this.nivel3Model.findOne({ name: registro.nivel3 });
            if (nivel3) {
                registro.nivel3 = nivel3._id;
            }
            nivel4Related.push(registro);
        });
        try {
            setTimeout(async () => {
                await this.nivel4Model.deleteMany({});
                await this.nivel4Model.insertMany(nivel4Related);
                this.logger.log(`Finished nivel4`);
            }, 6000);
        } catch (error) {
            throw new InternalServerErrorException('Error al crear semilla nivel4');
        }
        return 'Seed nivel4 working ...';
    }
    async seedContaminantes(): Promise<string> {
        this.logger.log('Seeding started');
        this.logger.log(`Seeding Contaminantes, ${contaminantes.length} items`);
        const contaminantesRelated: IContaminante[] = [];
        contaminantes.forEach(async (registro) => {
            const nivel2 = await this.nivel2Model.findOne({ name: registro.nivel2 });
            if (nivel2) {
                registro.nivel2 = nivel2._id;
            }
            const nivel3 = await this.nivel3Model.findOne({ name: registro.nivel3 });
            if (nivel3) {
                registro.nivel3 = nivel3._id;
            }
            const nivel4 = await this.nivel4Model.findOne({ name: registro.nivel4 });
            if (nivel4) {
                registro.nivel4 = nivel4._id;
            }
            contaminantesRelated.push(registro);
        });
        try {
            setTimeout(async () => {
                await this.contaminanteModel.deleteMany({});
                await this.contaminanteModel.insertMany(contaminantesRelated);
                this.logger.log(`Finished Contaminantes`);
            }, 13000);
        } catch (error) {
            throw new InternalServerErrorException('Error al crear semilla contaminante');
        }
        return 'Seed contaminantes working ...';
    }
}