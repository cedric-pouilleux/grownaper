import { mount } from '@vue/test-utils';
import ElementPlus from 'element-plus';
import PlantResource from '@/resources/PlantResource';
import { createTestingPinia } from '@pinia/testing';
import i18n from '@/i18n/config';
import PlantTimeline from '@/components/widget/plant-timeline/PlantTimeline.vue';
import Moment from 'moment';
import { productsPlantFixture } from '../../../../mocks/PlantsMocks';

function prepareMount(plant: PlantResource) {
  return mount(PlantTimeline, {
    global: {
      plugins: [ElementPlus, createTestingPinia(), i18n],
    },
    props: {
      plant,
    },
  });
}

describe('Plant timeline', () => {
  it('Generate calendar', async () => {
    const wrapper = prepareMount(productsPlantFixture);
    wrapper.vm.currentDate = Moment('2022-04-01');
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.getDays).toStrictEqual(['test']);
  });
});
