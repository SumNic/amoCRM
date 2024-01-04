import { Module } from '@nestjs/common';
import { LeadsService } from './leads.service';

@Module({
  exports: [LeadsService],
  providers: [LeadsService]
})
export class LeadsModule {}
