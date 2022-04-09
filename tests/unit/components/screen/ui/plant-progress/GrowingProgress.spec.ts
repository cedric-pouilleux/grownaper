import { mount } from '@vue/test-utils';
import GrowingProgress from '@/components/screen/ui/plant-progress/GrowingProgress.vue';
import ElementPlus from 'element-plus';
import PlantResource from '@/resources/PlantResource';
import Moment from 'moment';
import {
  growingPlantFixture,
  creatingPlantFixture,
  floweringPlantFixture,
} from '../../../../../mocks/PlantsMocks';

function prepareMount(plant: PlantResource) {
  return mount(GrowingProgress, {
    global: {
      plugins: [ElementPlus],
    },
    props: {
      plant,
    },
  });
}

describe('Plant growing progress', () => {
  it('Not started plant render', async () => {
    const wrapper = prepareMount(creatingPlantFixture);
    wrapper.vm.currentDate = Moment('2022-04-01');
    await wrapper.vm.$nextTick();
    expect(wrapper.text()).toEqual('Growing date not selected');
    expect(wrapper.vm.status).toBe('');
    expect(wrapper.vm.percent).toBe(0);
  });

  it('Started plant today', async () => {
    const wrapper = prepareMount(growingPlantFixture);
    wrapper.vm.currentDate = Moment(growingPlantFixture.startGrowingDate);
    await wrapper.vm.$nextTick();
    expect(wrapper.text()).toEqual('Growing start today');
    expect(wrapper.vm.status).toBe('');
    expect(wrapper.vm.percent).toBe(100);
  });

  it('Test growing plant render', async () => {
    const wrapper = prepareMount(growingPlantFixture);
    wrapper.vm.currentDate = Moment('2022-04-01');
    await wrapper.vm.$nextTick();
    expect(wrapper.text()).toEqual('Growing start since 85 days');
    expect(wrapper.vm.status).toBe('');
    expect(wrapper.vm.percent).toBe(100);
  });

  it('Test flowering plant render', async () => {
    const wrapper = prepareMount(floweringPlantFixture);
    wrapper.vm.currentDate = Moment('2022-04-01');
    await wrapper.vm.$nextTick();
    expect(wrapper.text()).toEqual('Growing complete, total 85 days');
    expect(wrapper.vm.status).toBe('success');
    expect(wrapper.vm.percent).toBe(100);
  });
});
