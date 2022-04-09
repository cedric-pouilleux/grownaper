import { mount } from '@vue/test-utils';
import FloweringProgress from '@/components/screen/ui/time-reading/plant-progress/FloweringProgress.vue';
import ElementPlus from 'element-plus';
import PlantResource from '@/resources/PlantResource';
import Moment from 'moment';
import {
  creatingPlantFixture,
  floweringPlantFixture, dryingPlantFixture,
} from '../../../../../mocks/PlantsMocks';

function prepareMount(plant: PlantResource) {
  return mount(FloweringProgress, {
    global: {
      plugins: [ElementPlus],
    },
    props: {
      plant,
    },
  });
}

describe('Plant flowering progress', () => {
  it('Not selected flowering date plant render', async () => {
    const wrapper = prepareMount(creatingPlantFixture);
    wrapper.vm.currentDate = Moment('2022-04-01');
    await wrapper.vm.$nextTick();
    expect(wrapper.text()).toEqual('Flowering date not selected');
    expect(wrapper.vm.status).toBe('');
    expect(wrapper.vm.percent).toBe(0);
  });

  it('Start flowering today', async () => {
    const wrapper = prepareMount(floweringPlantFixture);
    wrapper.vm.currentDate = Moment('2022-01-10');
    await wrapper.vm.$nextTick();
    expect(wrapper.text()).toEqual('Flowering start tomorrow');
    expect(wrapper.vm.status).toBe('');
    expect(wrapper.vm.percent).toBe(0);
  });

  it('Test current flowering plant render', async () => {
    const wrapper = prepareMount(floweringPlantFixture);
    wrapper.vm.currentDate = Moment('2022-03-01');
    await wrapper.vm.$nextTick();
    expect(wrapper.text()).toEqual('Flowering 50 / 70 days');
    expect(wrapper.vm.status).toBe('');
    expect(wrapper.vm.percent).toBe(70);
  });

  it('Test current drying plant render', async () => {
    const wrapper = prepareMount(dryingPlantFixture);
    wrapper.vm.currentDate = Moment('2022-03-01');
    await wrapper.vm.$nextTick();
    expect(wrapper.text()).toEqual('Flowering complete 64 / 70');
    expect(wrapper.vm.status).toBe('success');
    expect(wrapper.vm.percent).toBe(100);
  });
});
