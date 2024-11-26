import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { configuration } from 'config/app.config';
import { EventModule } from './event/event.module';
import { ParticipantModule } from './participant/participant.module';
import { Participant, ParticipantSchema } from './participant/schemas/participant.schema';
import { EventSchema } from './event/schemas/event.schema';


@Module({
  imports: [
    //Config Module setup with both configurations
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      cache: true,
    }),

    // MongoDB connection using the database config
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('database.url'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
      inject: [ConfigService],
    }),

    // THIS : JWT setup using the JWT config
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('jwt.secret'),
        signOptions: {
          expiresIn: configService.get<string>('jwt.expiresIn'),
        },
      }),
      global: true,
      inject: [ConfigService],
    }),

    
    
    UserModule,
    AuthModule,
    EventModule,
    ParticipantModule,


  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
