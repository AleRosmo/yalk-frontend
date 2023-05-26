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
  Spinner,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { useAuthService } from '../context/AuthServiceContext';

const LOGIN_ERROR_STATES = {
  NONE: null,
  LOGIN_FIRST: 'Login first',
  INVALID_CREDENTIALS: 'Invalid credentials. Please try again.',
  SESSION_EXPIRED: 'Session expired. Please login again.',
  SERVER_ERROR: 'Server error. Please try again later.',
};

export default function Login() {
  const navigate = useNavigate();
  const loaderData = useLoaderData(); // For errors
  const [isError, setIsError] = useState(() => getErrorMessage(loaderData));
  const [isLoading, setIsLoading] = useState(true); // For Full page loading

  const { websocketUrl, login, logout, validate } = useAuthService();

  // Higher order function to handle input changes, it takes
  // 'setter' as an argument, which is the "setSomething" state
  // function, when used in onChange event in an input field we pass
  // as argument the setter function, which will have the element
  // from where handleInputChanged is called from.
  function handleInputChange(setter) {
    return e => setter(e.target.value);
  }

  console.log(loaderData);

  // Higher order function to to handler login, when called
  // attempts to login with the credentials provided in handleLogin()
  const handleLogin = (email, password) => () => {
    setIsLoading(true);
    login(email, password)
      .then(res => {
        if (res.status === 200) {
          navigate('/chat/1');
        }
      })
      .catch(err => {
        const errorMessage = getErrorMessage(err);
        setIsError(errorMessage);
        setIsLoading(false);
      });
  };

  // if (isLoading) {
  //   return <div>Loading...</div>; // Replace this with your loading component
  // }

  return (
    <LoginForm
      error={isError}
      handleInputChange={handleInputChange}
      handleLogin={handleLogin}
    />
  );
}

function LoginForm({ error, handleInputChange, handleLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  return (
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
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                color={'gray.200'}
                bgColor={'gray.600'}
                type="email"
                onChange={handleInputChange(setEmail)}
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                color={'gray.200'}
                bgColor={'gray.600'}
                type="password"
                onChange={handleInputChange(setPassword)}
              />
            </FormControl>
            <Stack spacing={10}>
              <Checkbox onChange={e => setRememberMe(e.target.checked)}>
                Remember me
              </Checkbox>
              <Link color={'teal.400'}>Forgot password?</Link>
              {error && <Text color={'red'}>{error}</Text>}
              <Button
                bg={'teal.400'}
                color={'white'}
                _hover={{ bg: 'teal.300' }}
                isDisabled={isLoading}
                onClick={handleLogin(email, password)}
              >
                {isLoading ? <Spinner /> : 'Sign in'}
              </Button>
            </Stack>
          </Stack>
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

const getErrorMessage = err => {
  switch (err.response.status) {
    case 400: // Bad Request
      return LOGIN_ERROR_STATES.INVALID_CREDENTIALS;
    case 401: // Unauthorized
      return LOGIN_ERROR_STATES.SESSION_EXPIRED;
    case 405:
      return 'What the fuck are you doing?';
    // case 412: // Precondition Failed
    //   return LOGIN_ERROR_STATES.LOGIN_FIRST;
    case 500: // Internal Server Error
      return LOGIN_ERROR_STATES.SERVER_ERROR;
    default:
      return null;
  }
};
