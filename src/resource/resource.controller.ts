import { Controller, Get, Param, Res, StreamableFile, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@src/auth/guards';

import { ResourceService } from './resource.service';
import type { Response } from 'express';

@Controller('resource')
export class ResourceController {

    constructor(private resourceService: ResourceService) { }

    @UseGuards(JwtAuthGuard)
    @Get('getFile/:id')
    async getFile(
        @Param('id') id: string,
        @Res({ passthrough: true }) res: Response,
    ): Promise<StreamableFile> {
        return await this.resourceService.getFile(id, res);
    }
}
