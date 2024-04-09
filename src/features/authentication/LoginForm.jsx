import { useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRowVertical from "../../ui/FormRowVertical";
import { useLogin } from "./useLogin";
import SpinnerMiniComponent from "../../ui/SpinnerMini";

function LoginForm() {
  const [email, setEmail] = useState("test@test.com");
  const { mutate: SignIn, isLoading: isSignIn } = useLogin();
  const [password, setPassword] = useState("amin2001");

  function handleSubmit(e) {
    e.preventDefault();
    SignIn({ email, password }, { onSettled: () => { setEmail(""); setPassword(""); } });
  }

  return (
    <Form onSubmit={e => handleSubmit(e)}>
      <FormRowVertical label="Email address">
        <Input
          type="email"
          id="email"
          disabled={isSignIn}
          // This makes this form better for password managers
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormRowVertical>
      <FormRowVertical label="Password">
        <Input
          type="password"
          id="password"
          disabled={isSignIn}
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button size="large">{isSignIn ? <SpinnerMiniComponent /> : <span>Login</span>}</Button>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;
