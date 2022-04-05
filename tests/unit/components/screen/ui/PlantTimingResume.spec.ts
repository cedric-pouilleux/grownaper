import { mount } from '@vue/test-utils';
import PlantTimingResume from '@/components/screen/ui/PlantTimingResume.vue';
import ElementPlus from 'element-plus';

function isNotValid(wrapper: any) {
  expect(wrapper.vm.leaveDay).toBeNull();
  expect(wrapper.vm.cutDate).toBeNull();
  expect(wrapper.vm.averageCutDate).toBeNull();
  expect(wrapper.vm.percent).toBeNull();
  expect(wrapper.vm.percentText).toBeNull();
  expect(wrapper.find('.plant-timing-resume__props-error').exists()).toBeTruthy();
  expect(wrapper.find('.plant-timing-resume__success').exists()).toBeFalsy();
  expect(wrapper.find('el-percent').exists()).toBeFalsy();
  expect(wrapper.html()).toContain('Problems with data, this component need startFloweringDate and floTime for work');
}

function getComponent(props: any): any {
  return mount(PlantTimingResume, {
    global: {
      plugins: [ElementPlus],
    },
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
    isNotValid(wrapper);
    expect(wrapper.vm.readableStartFloweringDate).toBeNull();
  });

  it('Computed when plant without flowering time and not collected', () => {
    const wrapper = getComponent({
      startFloweringDate: '2022-04-04T00:47:10.182+00:00',
      floTime: null,
      collected: false,
    });
    isNotValid(wrapper);
    expect(wrapper.vm.readableStartFloweringDate).toBe('04/04/2022');
    expect(wrapper.find('.el-progress').exists()).toBeFalsy();
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
    // expect(wrapper.html()).toBe('');
    expect(wrapper.find('.el-progress').exists()).toBeTruthy();
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
    expect(wrapper.find('.el-progress').exists()).toBeTruthy();
  });
});
