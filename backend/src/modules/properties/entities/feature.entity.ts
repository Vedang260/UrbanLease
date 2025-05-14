import { FeatureType } from "src/common/enums/featureType.enums";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'features' })
export class Feature{
    
  @PrimaryGeneratedColumn('uuid')
  featureId: string;

  @Column()
  name: string; // e.g., "WiFi", "Parking", "Water Supply"

  @Column({
    type: 'enum',
    enum: FeatureType
  })
  type: FeatureType; 

  @Column({ type: 'jsonb', nullable: true, default: {} })
  details: Record<string, any>; // e.g., {"type": "24x7"} for Water Supply, empty for amenities

  @CreateDateColumn()
  createdAt: Date;
}