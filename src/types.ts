type Variety = {
  _id: string,
  title: string,
  slug: string,
  // eslint-disable-next-line no-use-before-define
  breeder: Breeder[],
}

type Breeder = {
  _id: string,
  title: string,
  picture?: string,
  link?: string,
  varieties: Variety[]
}

type Plant = {
  _id: string,
  createdAt: Date,
  qrcode: string,
  variety: Variety,
  breeder: Breeder
}

export {
  Plant,
  Variety,
  Breeder,
};
