import { css, styled } from "styled-components";

const Heading = styled.h1`
      ${props =>
            props.as === 'h1' && css`
         font-size:3rem ;
         font-weight: 700;
      `
      };
       ${props =>
            props.as === 'h2' && css`
            font-size: 2.2rem;
            font-weight: 700;
      `
      };
       ${props =>
            props.as === 'h3' && css`
            font-size: 2rem;
            font-weight: 500;
      `
      };
      text-transform:capitalize;
`

export default Heading;

Heading.defaultProps = {
      as: "h1"
}