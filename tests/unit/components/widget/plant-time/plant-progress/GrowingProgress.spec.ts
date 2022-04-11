import { mount } from '@vue/test-utils';
import GrowingProgress from '@/components/widget/plant-time/plant-progress/GrowingProgress.vue';
import ElementPlus from 'element-plus';
import PlantResource from '@/resources/PlantResource';
import Moment from 'moment';
import i18n from '@/i18n/config';

import {
  growingPlantFixture,
  creatingPlantFixture,
  floweringPlantFixture, floweringPlantSameDateFixture,
} from '../../../../../mocks/PlantsMocks';

function prepareMount(plant: PlantResource) {
  return mount(GrowingProgress, {
    global: {
      plugins: [ElementPlus, i18n],
    },
    props: {
      plant,
    },
  });
}

describe('Plant growing progress', () => {
  it('Without selected growing date input', async () => {
    const wrapper = prepareMount(creatingPlantFixture);
    wrapper.vm.currentDate = Moment('2022-04-01');
    await wrapper.vm.$nextTick();
    expect(wrapper.text()).toEqual('Growing date not selected');
    expect(wrapper.vm.status).toBe('');
    expect(wrapper.vm.percent).toBe(0);
  });

  it('With select growing date but not started', async () => {
    const wrapper = prepareMount(growingPlantFixture);
    wrapper.vm.currentDate = Moment('2022-01-03');
    await wrapper.vm.$nextTick();
    expect(wrapper.text()).toEqual('Growing start in 1 day');
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

  it('Not visible when start growing date is the same has start flowering date', async () => {
    const wrapper = prepareMount(floweringPlantSameDateFixture);
    wrapper.vm.currentDate = Moment(growingPlantFixture.startGrowingDate);
    await wrapper.vm.$nextTick();
    expect(wrapper.text()).toEqual('');
    expect(wrapper.vm.isVisible).toBeFalsy();
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
    wrapper.vm.currentDate = Moment('2022-01-20');
    await wrapper.vm.$nextTick();
    // expect(wrapper.vm.expiredDays).toBe(14);
    expect(wrapper.text()).toEqual('Growing complete on 14 days');
    expect(wrapper.vm.status).toBe('success');
    expect(wrapper.vm.percent).toBe(100);
  });
});
