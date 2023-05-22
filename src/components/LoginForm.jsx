import React from 'react';
export function LoginForm({ invalidSession, handleLogin }) {
  
  const [emailText, setEmailText] = useState(email);
  const [usernameText, setUsernameText] = useState(username);
  const [passwordText, setPasswordText] = useState(password);
  return (
    <>
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
    </>
  );
}
