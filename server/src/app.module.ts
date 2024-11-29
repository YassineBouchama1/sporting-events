import { InjectModel, MongooseModule } from '@nestjs/mongoose';
import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { configuration } from 'config/app.config';
import { EventModule } from './event/event.module';
import { User, UserSchema } from './user/schemas/user.schema';
import { Model } from 'mongoose';
import { RoleTypes } from './common/types/user.enum';
import * as bcrypt from 'bcrypt';

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
      useFactory: async (configService: ConfigService) => {
        const uri = configService.get<string>('database.url');
        if (!uri) {
          throw new Error('Database URL is not configured');
        } 
        return {
          uri, // Add any additional mongoose options if needed
          connectionFactory: (connection) => {
            connection.on('connected', () => {
              console.log('MongoDB connected successfully');
            });
            connection.on('error', (error) => {
              console.error('MongoDB connection error:', error);
            });
            return connection;
          },
        };
      },
      inject: [ConfigService],
    }),


    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),


    // THIS : JWT setup using the JWT config
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const secret = configService.get<string>('jwt.secret');
        if (!secret) {
          throw new Error('JWT secret is not configured');
        }
        return {
          secret,
          signOptions: {
            expiresIn: configService.get<string>('jwt.expiresIn', '24h'),
          },
        };
      },
      global: true,
      inject: [ConfigService],
    }),

    UserModule,
    AuthModule,
    EventModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})



export class AppModule implements OnApplicationBootstrap {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async onApplicationBootstrap() {
   
    try {
      // check if admin exists
      const adminExists = await this.userModel.findOne({
        role: RoleTypes.Admin,
      });

      if (!adminExists) {
        const hashedPassword = await bcrypt.hash('admin123', 10);

        const adminUser = new this.userModel({
          name: 'Admin',
          email: 'admin@admin.com',
          password: hashedPassword,
          role: RoleTypes.Admin,
        });

        await adminUser.save();
        console.log('Admin user created successfully');
        console.log('Email: admin@admin.com');
        console.log('Password: admin123');
      } else {
        console.log('ℹ️ Admin user already exists');
      }
    } catch (error) {
      console.error('Error creating admin user:', error);
    }
  }
}