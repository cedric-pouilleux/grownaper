interface Variety {
  _id?: string,
  title: string,
  feminized: boolean,
  automatic: boolean,
  slug?: string,
  floTime: number
}

interface Breeder {
  _id: string,
  title: string,
  picture?: File,
  country?: string,
  link?: string
}

interface Plant {
  _id: string,
  name: string,
  createdAt: string,
  qrcode: string,
  variety?: Variety,
  breeder?: Breeder
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
  FeederProduct,
};
