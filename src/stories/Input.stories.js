import Input from './Input';

export default {
  title: 'Components/Input',
  component: Input,
  argTypes: { setModal: { action: 'setModal' } },
};

const Template = (args) => <Input {...args} />;

export const Blue = Template.bind({});
Blue.args = {
  label: '질환명을 입력해 주세요.',
  backgroundColor: 'white',
  buttonColor: '#007be9',
};
