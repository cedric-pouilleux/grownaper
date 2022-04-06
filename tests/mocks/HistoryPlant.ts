import { PlantHistory } from '@/common/types';

const historyOne: PlantHistory = {
  date: '2022-04-06T00:14:42.872+00:00',
  action: 'ADD',
  message: 'Message content',
};

const historyTwo: PlantHistory = {
  date: '2022-04-06T00:14:42.872+00:00',
  action: 'ADD',
  message: 'Message content',
};

const historyTree: PlantHistory = {
  date: '2022-04-07T00:14:42.872+00:00',
  action: 'ADD',
  message: 'Message content',
};

const historyFour: PlantHistory = {
  date: '2022-04-08T00:14:42.872+00:00',
  action: 'ADD',
  message: 'Message content',
};

const expectResult = [
  {
    date: '2022-04-06T00:14:42.872+00:00',
    actions: [
      historyOne,
      historyTwo,
    ],
  },
  {
    date: '2022-04-07T00:14:42.872+00:00',
    actions: [historyTree],
  },
  {
    date: '2022-04-08T00:14:42.872+00:00',
    actions: [historyFour],
  },
];

export {
  historyOne,
  historyTwo,
  historyTree,
  historyFour,
  expectResult,
};
