import { mount, shallowMount } from '@vue/test-utils';
import PlantHistoryResume from '@/components/widget/plant-history/PlantHistoryResume.vue';
import ElementPlus from 'element-plus';
import {
  expectResult,
  historyFour,
  historyOne,
  historyTree,
  historyTwo,
} from '../../../../mocks/HistoryPlant';

describe('PlantHistoryResume', () => {
  it('Sorted computed sorted equal to expected result', () => {
    const wrapper = shallowMount(PlantHistoryResume, {
      global: {
        plugins: [ElementPlus],
      },
      props: {
        history: [
          historyOne,
          historyTwo,
          historyTree,
          historyFour,
        ],
      },
    });
    expect(wrapper.vm.historiesByDate).toEqual(expectResult);
  });
});
