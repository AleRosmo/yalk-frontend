// This component must
import { Flex, HStack, IconButton, Text } from '@chakra-ui/react';
import { BiLogOut } from 'react-icons/bi';
import AvatarHover from '../AvatarHover/AvatarHover';
function ProfileRow({ profile, variant, hasControls }) {
  return (
    <Flex
      w={'full'}
      p="10px"
      align={'center'}
      justify={'space-between'}
      background={'gray.800'}
      rounded={variant === 'rounded' ? '15px' : 'none'}
    >
      {profile !== null ? (
        <Flex w={'full'} align={'center'}>
          <AvatarHover src={profile.avatarUrl} />
          <Text flexGrow={1} align={'center'} color="white">
            {profile.displayName}
          </Text>
          {hasControls ? (
            <IconButton variant="ghost" icon={<BiLogOut size="20" />} />
          ) : null}
        </Flex>
      ) : null}
    </Flex>
  );
}

export default ProfileRow;
