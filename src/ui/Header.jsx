import { styled } from "styled-components"
import LogoutButton from "../features/authentication/LogoutButton"
import { BiMoon, BiSun } from "react-icons/bi"
import Avatar from "./Avatar"
import { useUser } from "../features/authentication/useUser"
import { useThemeSwitch } from "../theme-switch/ThemeContext"
import Button from "./Button"
function Header() {
      const StyledDiv = styled.div`
            padding: 10px;
            display: flex;
            align-items: center;
            gap: 10px;
            justify-content: end;
            margin-inline-end: 20px;
      `
      const data = useUser();
      const { switchTheme, theme } = useThemeSwitch();

      return (
            <StyledDiv>
                  <LogoutButton />
                  <Button variations="none" onClick={switchTheme}>
                        {theme === "light-mode" ? <BiMoon /> : <BiSun />}
                  </Button>
                  <Avatar photo={data?.user?.image} name={data?.user?.user_metadata?.name} />
            </StyledDiv>
      )
}

export default Header