import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/modules/user.module';
import { AuthModule } from './modules/auth/modules/auth.module';
import { typeOrmConfig } from './config/database.config';
import { AuthMiddleware } from './modules/auth/middlewares/auth.middleware';
import { ConfigModule } from '@nestjs/config';
import { NotificationModule } from './modules/notifications/modules/notification.module';
import { ReviewModule } from './modules/reviewes/modules/review.module';
import { WebsocketGateway } from './modules/notifications/gateway/notification.gateway';
import { PropertyModule } from './modules/properties/modules/property.module';
import { RentalModule } from './modules/rentals/modules/rental.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
    NotificationModule,
    UsersModule,
    ReviewModule,
    WebsocketGateway,
    PropertyModule,
    RentalModule
  ],

})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(AuthMiddleware)
    .exclude(
      { path: 'api/webhooks/stripe', method: RequestMethod.ALL }, // ✅ Exclude webhook
      { path: 'uploads', method: RequestMethod.ALL}
    )
    .forRoutes(
      { path: 'users', method: RequestMethod.ALL },
      { path: 'notifications', method: RequestMethod.ALL },
      { path: 'properties', method: RequestMethod.ALL },
      { path: 'reviews', method: RequestMethod.ALL },
      { path: 'rentals', method: RequestMethod.ALL },
    );
  }
}