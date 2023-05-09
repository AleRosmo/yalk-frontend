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
import AuthService from '../services/auth.service';

export default function Login() {
  const [emailInput, setEmailInput] = useState();
  const [passwordInput, setPasswordInput] = useState();
  const [rememberMe, setRememberMe] = useState();

  const LoginForm = () => (
    <Stack spacing={4}>
      <FormControl id="email">
        <FormLabel>Email address</FormLabel>
        <Input
          color={'gray.200'}
          bgColor={'gray.600'}
          type="email"
          onChange={setEmailInput}
        />
      </FormControl>
      <FormControl id="password">
        <FormLabel>Password</FormLabel>
        <Input
          color={'gray.200'}
          bgColor={'gray.600'}
          type="password"
          onChange={setPasswordInput}
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
          <Checkbox onChange={setRememberMe}>{'Remember me'}</Checkbox>
          <Link color={'teal.400'}>Forgot password?</Link>
        </Stack>
        <Button
          bg={'teal.400'}
          color={'white'}
          _hover={{
            bg: 'teal.300',
          }}
          onClick={() => AuthService.login(emailInput, passwordInput)}
        >
          Sign in
        </Button>
      </Stack>
    </Stack>
  );

  useLayoutEffect(() => {
    // Here the login check before
    // Possbily loader of react router?
  });

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
