import { IsOptional, IsString } from 'class-validator'

export class EditMeDto {
  @IsString()
  @IsOptional()
  name?: string

  @IsString()
  @IsOptional()
  phone?: string
}
