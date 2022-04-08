import { Note, PlantHistory, Variety } from '@/common/types';

export type IPlantParam = {
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
}
