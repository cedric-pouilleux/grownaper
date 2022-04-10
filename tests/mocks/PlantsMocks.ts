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

/**
 * Plant state by entries date
 */
const createdAt = new Date('2022-01-01');
const startGrowingDate = new Date('2022-01-05');
const startFloweringDate = new Date('2022-01-10');
const collectedDate = new Date('2022-03-15');
const startCurringDate = new Date('2022-03-22');
const plantBase = {
  _id: '624a51b7f6c46593423c08b0',
  name: 'Living violet',
  qrcode: 'url/ds23fv2354gbq517h32t',
  startGrowingDate: undefined,
  startFloweringDate: undefined,
  collectedDate: undefined,
  startCurringDate: undefined,
  weight: undefined,
  variety,
  notes: undefined,
  history: undefined,
};

const creatingPlant = new PlantResource({
  ...plantBase,
  createdAt,
});

const growingPlant = new PlantResource({
  ...plantBase,
  createdAt,
  startGrowingDate,
});

const floweringPlant = new PlantResource({
  ...plantBase,
  createdAt,
  startGrowingDate,
  startFloweringDate,
});

const floweringPlantSameDate = new PlantResource({
  ...plantBase,
  createdAt,
  startGrowingDate,
  startFloweringDate: startGrowingDate,
});

const dryingPlant = new PlantResource({
  ...plantBase,
  createdAt,
  startGrowingDate,
  startFloweringDate,
  collectedDate,
});

const curringPlant = new PlantResource({
  ...plantBase,
  createdAt,
  startGrowingDate,
  startFloweringDate,
  collectedDate,
  startCurringDate,
});

export {
  breeder as BreederFixture,
  variety as VarietyFixture,
  creatingPlant as creatingPlantFixture,
  growingPlant as growingPlantFixture,
  floweringPlant as floweringPlantFixture,
  dryingPlant as dryingPlantFixture,
  curringPlant as curringPlantFixture,
  floweringPlantSameDate as floweringPlantSameDateFixture,
};
