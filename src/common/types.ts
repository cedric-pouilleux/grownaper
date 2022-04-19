export type HistoryType = 'SIMPLE' | 'IMPORTANT' | 'SERVICE';
export type FeederProductType = 'ALL' | 'FLOWERING' | 'GROWING';
export type historyDisplayMode = 'PER_DAYS' | 'ALL';
export type UserRolesType = 'ADMIN' | 'USER';

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
  dosageMin?: number,
  dosageMax?: number,
  type: FeederProductType,
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
  IUser,
};
