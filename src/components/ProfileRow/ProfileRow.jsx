// This component must
import { Flex, IconButton, Text } from '@chakra-ui/react';
import { useCallback } from 'react';
import { BiLogOut } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import AvatarHover from '../AvatarHover/AvatarHover';


function ProfileRow({ profile, variant, hasControls, logout }) {
  const navigate = useNavigate();

const handleLogout = useCallback(() => {
  logout();
  navigate('/login');
});


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
          <AvatarHover profile={profile} />
          <Text flexGrow={1} align={'center'} color="white">
            {profile.displayName}
          </Text>
          {hasControls ? (
            <IconButton
              variant="ghost"
              icon={<BiLogOut size="20" />}
              onClick={() => handleLogout()}
            />
          ) : null}
        </Flex>
      ) : null}
    </Flex>
  );
}

export default ProfileRow;
