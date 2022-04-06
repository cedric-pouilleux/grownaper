interface Breeder {
  _id: string,
  title: string,
  picture?: File,
  country?: string,
  link?: string
}

interface Variety {
  _id: string,
  title: string,
  slug: string,
  feminized: boolean,
  automatic: boolean,
  phenotype: number,
  floTime: number,
  breeder: Breeder
}

interface Note {
  createdAt: Date,
  content: string
}

type HistoryType = 'ADD' | 'EDIT' | 'START_FLO';

type PlantHistory = {
  date: Date | string,
  action: HistoryType,
  message: string
}

interface Plant {
  _id: string,
  name: string,
  createdAt: Date,
  qrcode: string,
  startFloweringDate?: Date,
  startCurringDate?: Date,
  floweringStarted: boolean,
  collected?: Date,
  variety?: Variety,
  notes: Note[],
  history: PlantHistory[]
}

interface FeederProduct {
  _id: string,
  title: string,
  slug: string,
  description?: string,
  picture?: File,
  link?: string,
  // eslint-disable-next-line no-use-before-define
  feeder?: Feeder
}

interface Feeder {
  _id: string,
  title: string,
  slug: string,
  description?: string,
  picture?: File,
  link?: string,
  products?: FeederProduct[]
}

type historyDisplayMode = 'PER_DAYS' | 'ALL';

export {
  Plant,
  Variety,
  Breeder,
  Feeder,
  Note,
  FeederProduct,
  PlantHistory,
  HistoryType,
  historyDisplayMode,
};
