import { Module } from '@nestjs/common';
import { AnuController } from './anu.controller';
import { AnuService } from './anu.service';

@Module({
  controllers: [AnuController],
  providers: [AnuService]
})
export class AnuModule {}
