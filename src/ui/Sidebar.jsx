import { HiOutlineHome, HiOutlineCalendar, HiOutlineHomeModern, HiOutlineUsers, HiOutlineCog6Tooth } from 'react-icons/hi2'
import { styled } from 'styled-components'
import Logo from './Logo'
import { NavList, Link } from './MainNav'

function Sidebar() {
      const StyledDiv = styled.div`
            display: grid;
            grid-row: 1/-1;
      `
      return (
            <StyledDiv>
                  <Logo />
                  <NavList>
                        <Link to='/dashboard'>
                              <HiOutlineHome />
                              <p>Home</p>
                        </Link>
                        <Link to='/bookings'>
                              <HiOutlineCalendar />
                              <p>Bookinks</p>
                        </Link>
                        <Link to='/cabins'>
                              <HiOutlineHomeModern />
                              <p>Cabins</p>
                        </Link>
                        <Link to='/users'>
                              <HiOutlineUsers />
                              <p>Users</p>
                        </Link>
                        <Link to='/settings'>
                              <HiOutlineCog6Tooth />
                              <p>Settings</p>
                        </Link>
                  </NavList>
            </StyledDiv>
      )
}


export default Sidebar