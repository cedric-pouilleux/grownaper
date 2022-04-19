import {
  Variety, Note, PlantHistory, FeederProduct,
} from '@/common/types';
import Moment from 'moment';
import { IPlantResource } from '@/resources/IPlantResource';
import { IPlantParam } from '@/resources/IPlantParam';
import { Percent } from '@/common/utils';
import { READABLE_DATE } from '@/common/DateFormatConfig';

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

  products: FeederProduct[] | undefined = undefined;

  constructor(params: IPlantParam) {
    this._id = params._id;
    this.createdAt = params.createdAt;
    this.qrcode = params.qrcode;
    this.startFloweringDate = params.startFloweringDate;
    this.startCurringDate = params.startCurringDate;
    this.startGrowingDate = params.startGrowingDate;
    this.name = params.name;
    this.variety = params.variety;
    this.weight = params.weight;
    this.notes = params.notes;
    this.history = params.history;
    this.products = params.products;
    this.collectedDate = params.collectedDate;
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

  public isGrowingDay(day: Date | string): boolean {
    if (!this.startGrowingDate) {
      return false;
    }
    const start = Moment(this.startGrowingDate);
    const end = Moment(this.startFloweringDate || Moment());
    return Moment(day).isBetween(start, end);
  }

  public isFloweringDay(day: Date | string): boolean {
    if (!this.startFloweringDate) {
      return false;
    }
    const start = Moment(this.startFloweringDate);
    if (this.collectedDate) {
      return Moment(day).isBetween(start, Moment(this.collectedDate), undefined, '()');
    }
    const end = Moment(start).add(this.variety?.floTime, 'days');
    return Moment(day).isBetween(start, end, undefined, '[]');
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

  public getEndDay(): string | null {
    const floTime = this.variety?.floTime;
    if (!this.startFloweringDate && !floTime) {
      return null;
    }
    if (floTime && this.startFloweringDate) {
      const total = floTime + 7;
      return Moment(this.startFloweringDate).add(total, 'days').format(READABLE_DATE);
    }
    return null;
  }

  public getFloweringProductsDoses(day: Date): string[] {
    const arr: string[] = [];
    this.products?.forEach((item) => {
      if (item.dosageMax && item.dosageMin) {
        if (item.type === 'FLOWERING' || item.type === 'ALL') {
          const totalDays = this.variety?.floTime || 0;
          const max = item.dosageMax - item.dosageMin;
          if (max && totalDays) {
            const ratio = max / totalDays;
            const diff = Moment(day).diff(this.startFloweringDate, 'd', true);
            const result = diff * ratio;
            // here
            arr.push(`${result} ml/l - ${item.title}`);
          }
        }
      }
    });
    return arr;
  }
}

export default PlantResource;
