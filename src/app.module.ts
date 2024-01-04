import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ContactsController } from './contacts/contacts.controller';
import { ContactsModule } from './contacts/contacts.module';
import { ContactsService } from './contacts/contacts.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { LeadsController } from './leads/leads.controller';
import { LeadsModule } from './leads/leads.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env'
    }),
    JwtModule,
    ContactsModule,
    AuthModule,
    LeadsModule
  ],
  controllers: [ContactsController, AuthController, LeadsController],
  providers: [ContactsService, AuthService],
})
export class AppModule {}
