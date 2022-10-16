import { Controller, Get } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { HealthCheckService, HttpHealthIndicator, HealthCheck, MongooseHealthIndicator } from '@nestjs/terminus';
import { Connection } from 'mongoose';

@Controller('health')
export class HealthController {
    constructor(
        private health: HealthCheckService,
        private http: HttpHealthIndicator,
        private mongoose: MongooseHealthIndicator,
    ) { }

    @Get('frontend')
    @HealthCheck()
    checkFront() {
        return this.health.check([
            () => this.http.pingCheck('ZeroCompanyFrontEndCheck', 'https://frontend-app-sg7rj.ondigitalocean.app'),
        ]);
    }

    @Get('backend')
    @HealthCheck()
    checkBack() {
        return this.health.check([
            () => this.http.pingCheck('ZeroCompanyBackEndCheck', 'https://backend-app-fq2j9.ondigitalocean.app'),
        ]);
    }

    @Get('db')
    @HealthCheck()
    checkDB() {
        return this.health.check([
            async () =>
                this.mongoose.pingCheck('ZeroCompanyMongoDB')
        ]);
    }

    @Get('about')
    about() {
        return {
            "title": process.env.TITLE,
            "version": process.env.VERSION,
            "description": process.env.DESCRIPTION,
        }

    }
}