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

interface Plant {
  _id: string,
  name: string,
  createdAt: string,
  qrcode: string,
  variety?: Variety,
  breeder?: Breeder
  notes: Note[]
}

interface FeederProduct {
  _id: string,
  title: string,
  slug: string,
  description: string | null,
  picture: string | null,
  link: string | null,
  // eslint-disable-next-line no-use-before-define
  feeder: string | null
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
};
