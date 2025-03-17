import { Module } from '@nestjs/common';
import { AnuModule } from './anu/anu.module';

@Module({
  imports: [AnuModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
