type Variety = {
  _id?: string,
  title: string,
  feminized: boolean,
  automatic: boolean,
  slug?: string
}

type Breeder = {
  _id?: string,
  title: string,
  picture?: string,
  country?: string,
  link?: string
}

type Plant = {
  _id?: string,
  name: string,
  createdAt: string,
  qrcode: string,
  variety?: Variety,
  breeder?: Breeder
}

export {
  Plant,
  Variety,
  Breeder,
};
