import {
    CallHandler,
    ExecutionContext,
    Injectable,
    Logger,
    NestInterceptor,
} from '@nestjs/common';
import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
    constructor(private readonly logger: LoggerService) { }

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> | any {

        let originalUrl, method, statusCode, responseStr = undefined

        if (context.getType() === 'http') {
            const req = context.switchToHttp().getRequest();
            const res = context.switchToHttp().getResponse();
            originalUrl = req.originalUrl;
            method = req.method;
            statusCode = res.statusCode;
            responseStr = `${method} ${originalUrl}|Res-Code:${statusCode}`;
        }

        if (context.getType<GqlContextType>() === 'graphql') {
            const ctx = GqlExecutionContext.create(context);
            const info = ctx.getInfo();
            originalUrl = info.fieldName;
            method = info.operation.operation;
            responseStr = `${method} ${originalUrl}`
        }

        return next.handle().pipe(
            map((data) => {
                this.logger.log(
                    responseStr + `|Res-Body: ${JSON.stringify(data)}`,
                    'Response',
                );
                return data;
            }),
        );
    }
}