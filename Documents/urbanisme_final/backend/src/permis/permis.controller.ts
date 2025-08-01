import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PermisService } from './permis.service';
import { CreatePermiDto } from './dto/create-permi.dto';
import { UpdatePermiDto } from './dto/update-permi.dto';

@Controller('permis')
export class PermisController {
  constructor(private readonly permisService: PermisService) {}

  @Post()
  create(@Body() createPermiDto: CreatePermiDto) {
    return this.permisService.create(createPermiDto);
  }

  @Get()
  async findAll() {
    return await this.permisService.findAllWithUsers()
  }

  @Get('/nombre_permi')
  async getPermi(){
    return await this.permisService.getPermi()
  }

  @Get('statut/:statut')
  async getPermiByStatut(@Param('statut') statut: string) {
    return this.permisService.getStatusPermi(statut);
  }

  @Patch('updatestatut/:id')
  update(@Param('id') id: string, @Body() updatePermiDto: UpdatePermiDto) {
    return this.permisService.update(+id, updatePermiDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.permisService.remove(+id);
  }
}
