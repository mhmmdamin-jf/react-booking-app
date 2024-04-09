import styled from "styled-components";
import { useThemeSwitch } from "../theme-switch/ThemeContext"
const StyledLogo = styled.div`
  text-align: center;
  margin-block: 5rem;
`;

const Img = styled.img`
  height: 9.6rem;
  width: auto;
`;

function Logo() {
  const { theme } = useThemeSwitch();
  return (
    <StyledLogo>
      <Img src={`../../public/Imgs/${theme === "light-mode" ? "logo-light" : "logo-dark"}.png`} alt="Logo" />
    </StyledLogo>
  );
}

export default Logo;
