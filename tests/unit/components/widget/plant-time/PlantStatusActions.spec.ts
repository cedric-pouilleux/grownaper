import { mount } from '@vue/test-utils';
import PlantStatusActions from '@/components/widget/plant-time/PlantStatusActions.vue';
import ElementPlus from 'element-plus';
import PlantResource from '@/resources/PlantResource';
import Moment from 'moment';
import { createTestingPinia } from '@pinia/testing';
import i18n from '@/i18n/config';
import {
  creatingPlantFixture, curringPlantFixture,
  floweringPlantFixture,
  growingPlantFixture,
} from '../../../../mocks/PlantsMocks';

function prepareMount(plant: PlantResource) {
  return mount(PlantStatusActions, {
    global: {
      plugins: [ElementPlus, createTestingPinia(), i18n],
    },
    props: {
      plant,
    },
  });
}

describe('Plant status actions', () => {
  it('Should display start growing btn and start flowering if not started with no dates', async () => {
    const wrapper = prepareMount(creatingPlantFixture);
    wrapper.vm.currentDate = Moment('2022-04-01');
    await wrapper.vm.$nextTick();
    expect(wrapper.find("[data-testid='growing']").exists()).toBeTruthy();
    expect(wrapper.find("[data-testid='flowering']").exists()).toBeTruthy();
  });

  it('Should display start flowering if not started with dates 1 month later', async () => {
    const wrapper = prepareMount(growingPlantFixture);
    wrapper.vm.currentDate = Moment('2022-02-01');
    await wrapper.vm.$nextTick();
    expect(wrapper.find("[data-testid='growing']").exists()).toBeFalsy();
    expect(wrapper.find("[data-testid='flowering']").exists()).toBeTruthy();
  });

  it('With growing start but not flowering', async () => {
    const wrapper = prepareMount(growingPlantFixture);
    wrapper.vm.currentDate = Moment('2022-01-15');
    await wrapper.vm.$nextTick();
    expect(wrapper.find("[data-testid='growing']").exists()).toBeFalsy();
    expect(wrapper.find("[data-testid='flowering']").exists()).toBeTruthy();
  });

  it('Should not display flowering btn if flowering started', async () => {
    const wrapper = prepareMount(floweringPlantFixture);
    wrapper.vm.currentDate = Moment('2022-01-30');
    await wrapper.vm.$nextTick();
    // expect(wrapper.find("[data-testid='collect']").exists()).toBeTruthy();
    expect(wrapper.find("[data-testid='growing']").exists()).toBeFalsy();
    expect(wrapper.find("[data-testid='flowering']").exists()).toBeFalsy();
    expect(wrapper.find("[data-testid='curring']").exists()).toBeFalsy();
  });

  it('Should not display btn on curring state', async () => {
    const wrapper = prepareMount(curringPlantFixture);
    wrapper.vm.currentDate = Moment('2022-02-30');
    await wrapper.vm.$nextTick();
    expect(wrapper.find("[data-testid='collect']").exists()).toBeFalsy();
    expect(wrapper.find("[data-testid='growing']").exists()).toBeFalsy();
    expect(wrapper.find("[data-testid='flowering']").exists()).toBeFalsy();
    expect(wrapper.find("[data-testid='curring']").exists()).toBeFalsy();
  });
});
