import { Module } from '@nestjs/common';
import { LeadsModule } from 'src/leads/leads.module';
import { ContactsService } from './contacts.service';

@Module({
  imports: [LeadsModule],
  providers: [ContactsService]
})
export class ContactsModule {}
