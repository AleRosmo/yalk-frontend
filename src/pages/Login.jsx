import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  Text,
  color,
  useColorModeValue,
} from '@chakra-ui/react';
import React, { useLayoutEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { default as AuthService } from '../services/auth.service';

export default function Login() {
  const [invalidSession, setInvalidSession] = useState();
  const navigate = useNavigate();

  const LoginForm = () => {
    const [emailInput, setEmailInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [rememberMe, setRememberMe] = useState();

    useLayoutEffect(() => {
      const token = AuthService.getToken();
      if (!token) {
        setInvalidSession(false);
      }
      AuthService.validate()
        .then(res => {
          if (res.status === 200) {
            navigate('/chat/1');
          }
        })
        .catch(err => {
          if (err.status === 401) {
            setInvalidSession(true);
          }
        });
    });

    async function handleLogin() {
      const redirectUrl = await AuthService.login(emailInput, passwordInput)
        .then(res => {
          if (res.status === 200) {
            navigate('/chat/1');
          }
        })
        .catch(() => {
          setInvalidSession(true);
        });
    }

    return (
      <Stack spacing={4}>
        <FormControl id="email">
          <FormLabel>Email address</FormLabel>
          <Input
            color={'gray.200'}
            bgColor={'gray.600'}
            type="email"
            onChange={e => setEmailInput(e.target.value)}
          />
        </FormControl>
        <FormControl id="password">
          <FormLabel>Password</FormLabel>
          <Input
            color={'gray.200'}
            bgColor={'gray.600'}
            type="password"
            onChange={e => setPasswordInput(e.target.value)}
          />
        </FormControl>
        <Stack spacing={10}>
          <Stack
            direction={{
              base: 'column',
              sm: 'row',
            }}
            align={'start'}
            justify={'space-between'}
          >
            <Checkbox onChange={e => setRememberMe(e.target.value)}>
              {'Remember me'}
            </Checkbox>
            <Link color={'teal.400'}>Forgot password?</Link>
          </Stack>
          {invalidSession ? <Text>Not logged in</Text> : null}
          <Button
            bg={'teal.400'}
            color={'white'}
            _hover={{
              bg: 'teal.300',
            }}
            onClick={() => handleLogin()}
          >
            Sign in
          </Button>
        </Stack>
      </Stack>
    );
  };

  return (
    // In this flex we need the use the hook useColorModeValue
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={'gray.800'}
      color={'teal'}
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <LoginHeader />
        <Box rounded={'lg'} bg={'gray.700'} boxShadow={'lg'} p={8}>
          <LoginForm />
        </Box>
      </Stack>
    </Flex>
  );
}

const LoginHeader = () => (
  <Stack align={'center'}>
    <Heading fontSize={'4xl'}>{'Ÿalk!'}</Heading>
    <Text fontSize={'lg'}>
      {'palle '}
      <Link color={'teal.400'}>{'floscissime'}</Link>
      {' ✌️ ma davvero tanto raga un botto devo spaziare'}
    </Text>
  </Stack>
);
