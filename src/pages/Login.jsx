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
  useColorModeValue,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/auth.service';

const LOGIN_ERROR_STATES = {
  NONE: null,
  INVALID_CREDENTIALS: 'Invalid credentials. Please try again.',
  SERVER_ERROR: 'Server error. Please try again later.',
};

export default function Login() {
  const navigate = useNavigate();
  const [isError, setIsError] = useState(LOGIN_ERROR_STATES.NONE);
  const [isLoading, setIsLoading] = useState(true);

  const LoginForm = () => {
    const [emailInput, setEmailInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [rememberMe, setRememberMe] = useState();

    useEffect(() => {
      const token = AuthService.getToken();
      if (!token) {
        setIsSessionValidated(true);
      }
      AuthService.validate()
        .then(res => {
          if (res.status === 200) {
            navigate('/chat/1');
          }
          setIsSessionValidated(true);
        })
        .catch(err => {
          if (err.status === 401) {
            setInvalidSession(true);
          }
          setIsSessionValidated(true);
        });
    }, []);

    function handleLogin() {
      AuthService.login(emailInput, passwordInput)
        .then(res => {
          if (res.status === 200) {
            navigate('/chat/1');
          }
        })
        .catch(() => {
          setIsError(true);
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
            <Checkbox onChange={e => setRememberMe(e.target.checked)}>
              {'Remember me'}
            </Checkbox>
            <Link color={'teal.400'}>Forgot password?</Link>
          </Stack>
          {isError ? <Text color={'red'}>Please log in first</Text> : null}
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
