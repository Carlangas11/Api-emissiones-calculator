import { HttpException, HttpStatus, Injectable, StreamableFile } from '@nestjs/common';
import type { Response } from 'express';
import { createReadStream } from 'fs';
import { join } from 'path';

@Injectable()
export class ResourceService {

    async getFile(id: string, res: Response): Promise<StreamableFile> {

        try{
            const file = createReadStream(join(process.cwd(), 'src', 'resource', `${id}`, `${id}.xlsx`), {});
            res.set({
                'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                'Content-Disposition': `attachment; filename="${id}.xlsx"`,
            });
            return new StreamableFile(file);

        } catch (error) {
            throw new HttpException('Invalid', HttpStatus.BAD_REQUEST);
        }
    }

}
