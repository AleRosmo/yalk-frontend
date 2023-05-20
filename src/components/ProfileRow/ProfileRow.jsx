// This component must
import { Flex, IconButton, Text } from '@chakra-ui/react';
import { BiLogOut } from 'react-icons/bi';
import AuthService from '../../services/auth.service';
import AvatarHover from '../AvatarHover/AvatarHover';
function ProfileRow({ profile }) {
  return (
    <Flex
      w={'full'}
      p="10px"
      align={'center'}
      justify={'space-between'}
      bg={'gray.700'}
      rounded={'15px'}
    >
      {profile !== null ? (
        <>
          <AvatarHover src={profile.avatarUrl} />
          <Text color="white">{profile.displayName}</Text>
          <IconButton
            variant="ghost"
            icon={<BiLogOut size="20" />}
            // onClick={async () => {
            //   await AuthService.logout();
            //   window.location.replace('/login');
            // }}
          />
        </>
      ) : null}
    </Flex>
  );
}

export default ProfileRow;
