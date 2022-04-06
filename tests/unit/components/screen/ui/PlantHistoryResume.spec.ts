import { mount } from '@vue/test-utils';
import PlantHistoryResume from '@/components/screen/ui/PlantHistoryResume.vue';
import ElementPlus from 'element-plus';
import {
  expectResult,
  historyFour,
  historyOne,
  historyTree,
  historyTwo,
} from '../../../../mocks/HistoryPlant';

function getComponent(): any {
  return mount(PlantHistoryResume, {
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
}

describe('PlantHistoryResume', () => {
  it('Sorted computed sorted equal to expected result', () => {
    const wrapper = getComponent();
    expect(wrapper.vm.sorted).toEqual(expectResult);
  });
});
