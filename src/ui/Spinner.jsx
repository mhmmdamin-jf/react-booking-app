import styled, { keyframes } from "styled-components";

const rotate = keyframes`
  to {
    transform: rotate(1turn)
  }
`;
const SpinnerPageBackground = styled.div`
  display: flex;
  background-color:white;
  opacity: 50;
  width: 100vh;
  height: 100vh;
  z-index: 10;
`
const Spinner = styled.div`
  margin: 4.8rem auto;

  width: 6.4rem;
  aspect-ratio: 1;
  border-radius: 50%;
  background: radial-gradient(farthest-side, var(--color-brand-600) 94%, #0000)
      top/10px 10px no-repeat,
    conic-gradient(#0000 30%, var(--color-brand-600));
  -webkit-mask: radial-gradient(farthest-side, #0000 calc(100% - 10px), #000 0);
  animation: ${rotate} 1.5s infinite linear;
`;
//eslint-disable-next-line
export default function SpinnerComponent({ fullPage }) {
  if (fullPage) {
    return <SpinnerPageBackground>
      <Spinner />
    </SpinnerPageBackground>
  }
  return <Spinner />
}
