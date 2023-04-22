import AvatarHover from './AvatarHover';

export default {
  title: 'Avatar Hover',
  component: AvatarHover,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

export const Primary = {
    args: {}
}

export const Main = () => <AvatarHover />;
