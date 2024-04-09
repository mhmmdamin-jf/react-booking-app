import styled from "styled-components"

const StyledDiv = styled.div`
display: flex;
align-items: center;
gap: 5px;
padding:10px ;
border-radius: 10px;
border: 20px;
box-shadow: 0px 10px 20px 1px var(--color-grey-200);
cursor: pointer;
`
const Profile = styled.img`
      border-radius: 100%;
      width: 20px;
      height: 20px;
`
//eslint-disable-next-line
function Avatar({ photo, name }) {
      if (name) {
            return (
                  <StyledDiv>
                        <Profile src={photo || 'default-user.jpg'} />
                        <h5>{name}</h5>
                  </StyledDiv>
            )
      }
}

export default Avatar
