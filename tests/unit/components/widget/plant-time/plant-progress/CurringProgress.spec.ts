import { mount } from '@vue/test-utils';
import CurringProgress from '@/components/widget/plant-time/plant-progress/CurringProgress.vue';
import ElementPlus from 'element-plus';
import PlantResource from '@/resources/PlantResource';
import Moment from 'moment';
import { creatingPlantFixture, curringPlantFixture } from '../../../../../mocks/PlantsMocks';

function prepareMount(plant: PlantResource) {
  return mount(CurringProgress, {
    global: {
      plugins: [ElementPlus],
    },
    props: {
      plant,
    },
  });
}

describe('Plant curring progress', () => {
  it('Curring not started', async () => {
    const wrapper = prepareMount(creatingPlantFixture);
    wrapper.vm.currentDate = Moment('2022-04-01');
    await wrapper.vm.$nextTick();
    expect(wrapper.text()).toEqual('');
    expect(wrapper.vm.isVisible).toBeFalsy();
  });

  it('Curring is started', async () => {
    const wrapper = prepareMount(curringPlantFixture);
    wrapper.vm.currentDate = Moment('2022-04-22');
    await wrapper.vm.$nextTick();
    expect(wrapper.text()).toEqual('Curring 30 / 60 days');
    expect(wrapper.vm.status).toBe('');
    expect(wrapper.vm.percent).toBe(50);
  });

  it('Curring is finish', async () => {
    const wrapper = prepareMount(curringPlantFixture);
    wrapper.vm.currentDate = Moment('2022-06-01');
    await wrapper.vm.$nextTick();
    expect(wrapper.text()).toEqual('Curring completed in 60 days');
    expect(wrapper.vm.status).toBe('');
    expect(wrapper.vm.percent).toBe(100);
  });
});
