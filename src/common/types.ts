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
  date: Date,
  content: string
}

type HistoryType = 'ADD' | 'EDIT' | 'START_FLO';

type History = {
  date: Date,
  type: HistoryType,
  message: string
}

interface Plant {
  _id: string,
  name: string,
  createdAt: string,
  qrcode: string,
  startFloweringDate?: Date,
  variety?: Variety,
  notes: Note[],
  history: History[]
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

export {
  Plant,
  Variety,
  Breeder,
  Feeder,
  Note,
  FeederProduct,
  History,
  HistoryType,
};
