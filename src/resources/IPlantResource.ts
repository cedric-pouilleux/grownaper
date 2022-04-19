import {
  FeederProduct, Note, PlantHistory, Variety,
} from '@/common/types';

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
  products?: FeederProduct[],
  isGrowing(): boolean,
  isFlowering(): boolean,
  isCurring(): boolean,
  isDrying(): boolean,
  floweringPercent(): number,
  curringPercent(): number,
  getFloweringProductsDoses(day: Date):string[],
  getEndDay(): string | null
}
