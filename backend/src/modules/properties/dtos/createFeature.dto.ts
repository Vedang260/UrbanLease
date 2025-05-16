import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { FeatureType } from 'src/common/enums/featureType.enums';

export class CreateFeatureDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(FeatureType)
  type: FeatureType;

  @IsOptional()
  details?: Record<string, any>;
}
