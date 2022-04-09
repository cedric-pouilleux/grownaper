import { Note, PlantHistory, Variety } from '@/common/types';

export interface IPlantResource {
  _id?: string,
  name?: string,
  createdAt?: Date,
  qrcode?: string,
  startFloweringDate?: Date,
  startCurringDate?: Date,
  startGrowingDate?: Date,
  collectedDate?: Date,
  floweringStarted?: boolean,
  variety?: Variety,
  weight?: number,
  notes?: Note[],
  history?: PlantHistory[],
  isGrowing(): boolean,
  isFlowering(): boolean,
  isCurring(): boolean,
  isDrying(): boolean,
}
