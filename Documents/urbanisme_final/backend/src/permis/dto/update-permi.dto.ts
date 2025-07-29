import { PartialType } from '@nestjs/mapped-types';
import { CreatePermiDto } from './create-permi.dto';

export class UpdatePermiDto extends PartialType(CreatePermiDto) {}
