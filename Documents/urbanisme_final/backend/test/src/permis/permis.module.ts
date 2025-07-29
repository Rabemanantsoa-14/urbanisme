import { Module } from '@nestjs/common';
import { PermisService } from './permis.service';
import { PermisController } from './permis.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permi } from './entities/permi.entity';

@Module({
  imports:[
    ConfigModule,
    TypeOrmModule.forFeature([Permi])
  ],
  controllers: [PermisController],
  providers: [PermisService],
})
export class PermisModule {}
