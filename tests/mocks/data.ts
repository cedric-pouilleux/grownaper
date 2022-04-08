import { Breeder, Variety } from '@/common/types';
import PlantResource from '@/resources/PlantResource';

const breeder: Breeder = {
  _id: '624600ac67f855c1b7fd439e',
  title: 'Titre breeder',
  country: 'France',
  link: 'www.test.com',
};

const variety: Variety = {
  _id: '62477f7012079400a5927a3a',
  title: 'Titre Variety',
  slug: 'titre-variety-aaaa-feminized-#2',
  feminized: true,
  automatic: false,
  phenotype: 1,
  floTime: 70,
  breeder,
};

const plant = new PlantResource({
  _id: '624a51b7f6c46593423c08b0',
  name: 'Living violet',
  createdAt: new Date('2022-04-04T02:02:31.546+00:00'),
  qrcode: 'url/ds23fv2354gbq517h32t',
  startGrowingDate: new Date('2022-04-12T00:00:00.000+00:00'),
  startFloweringDate: undefined,
  collectedDate: undefined,
  startCurringDate: undefined,
  weight: undefined,
  variety,
  notes: undefined,
  history: undefined,
});

export {
  breeder as BreederFixture,
  variety as VarietyFixture,
  plant as PlantFixture,
};
