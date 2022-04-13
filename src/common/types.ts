import Moment from 'moment';

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

type HistoryType = 'SIMPLE' | 'IMPORTANT' | 'SERVICE';

type PlantHistory = {
  date: Date | string,
  action: HistoryType,
  message: string
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
type UserRolesType = 'ADMIN' | 'USER';

interface IUser {
  createdAt?: Date,
  roles: UserRolesType[],
  googleId: string,
  displayName: string,
  emails: [],
  photos: []
}

export {
  Variety,
  Breeder,
  Feeder,
  Note,
  FeederProduct,
  PlantHistory,
  HistoryType,
  historyDisplayMode,
  IUser,
};
