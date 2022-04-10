import { Variety, Note, PlantHistory } from '@/common/types';
import Moment from 'moment';
import { IPlantResource } from '@/resources/IPlantResource';
import { IPlantParam } from '@/resources/IPlantParam';
import { Percent } from '@/common/utils';

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
    if (this.startCurringDate || this.collectedDate || !this.startFloweringDate) {
      return false;
    }
    return Moment().isAfter(this.startFloweringDate);
  }

  public isDrying(): boolean {
    if (this.isFlowering() || this.isCurring() || this.isGrowing()) {
      return false;
    }
    if (!this.collectedDate) {
      return false;
    }
    return !this.isFlowering();
  }

  public isCurring(): boolean {
    return !!this.startCurringDate;
  }

  public floweringPercent(): number {
    const days = Moment().diff(this.startFloweringDate, 'days');
    if (days > 0 && this.variety) {
      const val = Percent(days, this.variety.floTime);
      if (val > 100) {
        return 100;
      }
      return val;
    }
    return 0;
  }

  public curringPercent(): number {
    if (!this.startCurringDate) {
      return 0;
    }
    const diff = Moment().diff(this.startCurringDate, 'days');

    const currentPercent = Percent(diff, 60);
    if (currentPercent > 100) {
      return 100;
    }
    return currentPercent;
  }
}

export default PlantResource;
