import styled from "styled-components";
import LoginForm from "../features/authentication/LoginForm";

export const AuthLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 68rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
`;

function Login() {
  return <AuthLayout>
    <LoginForm />
  </AuthLayout>;
}

export default Login;
