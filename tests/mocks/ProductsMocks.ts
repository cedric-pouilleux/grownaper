import type { FeederProduct } from '@/common/types';

export const BioGrowProduct: FeederProduct = {
  _id: '001',
  title: 'Bio bizz',
  slug: 'bio-bizz',
  type: 'GROWING',
  dosageMin: 1,
  dosageMax: 1,
};

export const BioFloProduct: FeederProduct = {
  _id: '002',
  title: 'Bio flo',
  slug: 'bio-flo',
  type: 'FLOWERING',
  dosageMin: 1,
  dosageMax: 5,
};

export const BioAllProduct: FeederProduct = {
  _id: '003',
  title: 'Bio all',
  slug: 'bio-all',
  type: 'ALL',
  dosageMin: 1,
  dosageMax: 2,
};
