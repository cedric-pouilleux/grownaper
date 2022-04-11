import { mount } from '@vue/test-utils';
import DryingProgress from '@/components/widget/plant-time/plant-progress/DryingProgress.vue';
import ElementPlus from 'element-plus';
import PlantResource from '@/resources/PlantResource';
import Moment from 'moment';
import i18n from '@/i18n/config';
import {
  curringPlantFixture,
  dryingPlantFixture, floweringPlantFixture,
} from '../../../../../mocks/PlantsMocks';

function prepareMount(plant: PlantResource) {
  return mount(DryingProgress, {
    global: {
      plugins: [ElementPlus, i18n],
    },
    props: {
      plant,
    },
  });
}

describe('Plant curring progress', () => {
  it('Dying not started', async () => {
    const wrapper = prepareMount(floweringPlantFixture);
    wrapper.vm.currentDate = Moment('2022-04-01');
    await wrapper.vm.$nextTick();
    expect(wrapper.text()).toEqual('');
    expect(wrapper.vm.isVisible).toBeFalsy();
  });

  it('Dying start today', async () => {
    const wrapper = prepareMount(dryingPlantFixture);
    wrapper.vm.currentDate = Moment(dryingPlantFixture.collectedDate);
    await wrapper.vm.$nextTick();
    expect(wrapper.text()).toEqual('Start drying today');
    expect(wrapper.vm.status).toBe('success');
    expect(wrapper.vm.percent).toBe(100);
  });

  it('Dying started', async () => {
    const wrapper = prepareMount(dryingPlantFixture);
    wrapper.vm.currentDate = Moment('2022-03-25');
    await wrapper.vm.$nextTick();
    expect(wrapper.text()).toEqual('Drying 9 days');
    expect(wrapper.vm.status).toBe('success');
    expect(wrapper.vm.percent).toBe(100);
  });

  it('Dying finish', async () => {
    const wrapper = prepareMount(curringPlantFixture);
    wrapper.vm.currentDate = Moment('2022-05-01');
    await wrapper.vm.$nextTick();
    expect(wrapper.text()).toEqual('Drying complete on 7 days');
    expect(wrapper.vm.status).toBe('success');
    expect(wrapper.vm.percent).toBe(100);
  });
});
