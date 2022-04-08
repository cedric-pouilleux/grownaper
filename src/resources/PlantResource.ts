import { Variety, Note, PlantHistory } from '@/common/types';
import Moment from 'moment';
import { IPlantResource } from '@/resources/IPlantResource';
import { IPlantParam } from '@/resources/IPlantParam';

class PlantResource implements IPlantResource {
  _id: string | undefined = undefined;

  name: string | undefined = undefined;

  createdAt: Date | undefined = undefined;

  qrcode: string | undefined = undefined;

  startFloweringDate: Date | undefined = undefined;

  startCurringDate: Date | undefined = undefined;

  startGrowingDate: Date | undefined = undefined;

  collectedDate: Date | undefined = undefined;

  variety: Variety | undefined = undefined;

  weight: number | undefined = undefined;

  notes: Note[] | undefined = undefined;

  history: PlantHistory[] | undefined = undefined;

  constructor(params: IPlantParam) {
    this._id = params._id;
    this.name = params.name;
    this.createdAt = params.createdAt;
    this.qrcode = params.qrcode;
    this.startFloweringDate = params.startFloweringDate;
    this.startCurringDate = params.startCurringDate;
    this.startGrowingDate = params.startGrowingDate;
    this.collectedDate = params.collectedDate;
    this.variety = params.variety;
    this.weight = params.weight;
    this.notes = params.notes;
    this.history = params.history;
  }

  public isGrowing(): boolean {
    if (!this.startGrowingDate) {
      return false;
    }
    if (!this.startFloweringDate) {
      return true;
    }
    return Moment().isBetween(
      this.startGrowingDate,
      this.startFloweringDate,
    );
  }

  public isFlowering(): boolean {
    return Moment().isBetween(
      this.startGrowingDate,
      this.startFloweringDate,
    );
  }

  public isDrying(): boolean {
    if (!this.startFloweringDate && this.collectedDate) {
      return false;
    }
    return Moment().isAfter(this.startFloweringDate);
  }

  public isCurring(): boolean {
    return !!this.startCurringDate;
  }

  public canGrow(): boolean {
    return !this.isGrowing()
      && !this.isFlowering()
      && !this.isDrying()
      && !this.isCurring();
  }
}

export default PlantResource;
