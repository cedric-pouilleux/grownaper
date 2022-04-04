import { shallowMount } from '@vue/test-utils';
import PlantTimingResume from '@/components/screen/ui/PlantTimingResume.vue';
import { createTestingPinia } from '@pinia/testing';
import ElementPlus from 'element-plus';

const globalComponent = {
  plugins: [
    createTestingPinia(),
    ElementPlus,
  ],
};

function isNotValid(vm: any) {
  expect(vm.leaveDay).toBe(null);
  expect(vm.cutDate).toBe(null);
  expect(vm.averageCutDate).toBe(null);
  expect(vm.percent).toBe(null);
  expect(vm.percentText).toBe(null);
}

function getComponent(props: any) {
  return shallowMount(PlantTimingResume, {
    global: globalComponent,
    props,
  });
}

describe('PlantTimingResume.vue', () => {
  it('Computed when plant was not start flowering date', () => {
    const wrapper = getComponent({
      startFloweringDate: null,
      floTime: 70,
      collected: false,
    });
    isNotValid(wrapper.vm);
    expect(wrapper.vm.readableStartFloweringDate).toBe(null);
  });

  it('Computed when plant without flowering time and not collected', () => {
    const wrapper = getComponent({
      startFloweringDate: '2022-04-04T00:47:10.182+00:00',
      floTime: null,
      collected: false,
    });
    isNotValid(wrapper.vm);
    expect(wrapper.vm.readableStartFloweringDate).toBe('04/04/2022');
  });

  it('Computed behavior in current flowering state without collected', () => {
    const wrapper = getComponent({
      startFloweringDate: '2022-04-04T00:47:10.182+00:00',
      floTime: 70,
      collected: false,
    });
    expect(wrapper.vm.leaveDay).toBe(69);
    expect(wrapper.vm.cutDate).toBe('06/13/2022');
    expect(wrapper.vm.readableStartFloweringDate).toBe('04/04/2022');
    expect(wrapper.vm.averageCutDate).toBe('06/23/2022');
    expect(wrapper.vm.percent).toBe(1);
    expect(wrapper.vm.percentText).toBe('1 / 70 days');
  });

  it('Computed when plant was depassed flowering date and was collected', () => {
    const wrapper = getComponent({
      startFloweringDate: '2022-01-04T00:47:10.182+00:00',
      floTime: 70,
      collected: '2022-03-04T00:47:10.182+00:00',
    });
    expect(wrapper.vm.leaveDay).toBe(0);
    expect(wrapper.vm.cutDate).toBe('03/15/2022');
    expect(wrapper.vm.readableStartFloweringDate).toBe('01/04/2022');
    expect(wrapper.vm.averageCutDate).toBe('03/25/2022');
    expect(wrapper.vm.percent).toBe(100);
    expect(wrapper.vm.percentText).toBe('Collected');
    expect(wrapper.vm.readableCollected).toBe('Friday, March 4th 2022');
  });
});
