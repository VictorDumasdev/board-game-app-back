import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './all-exceptions.filter';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const { httpAdapter } = app.get(HttpAdapterHost);
    app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
    
    app.enableCors();//possible to make this accessible from certain IP see https://youtu.be/8_X0nSrzrCw?si=6TeqPmB9dHsxTXxU&t=8041
    app.setGlobalPrefix('api');
    await app.listen(3000);
}
bootstrap();
