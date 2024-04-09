import { css, styled } from "styled-components";

const Row = styled.div`
display: flex;
      ${props =>
            props.type === 'vertical' &&
            css`
            flex-direction: column;
            justify-content:${(props) => { props.justifyContent || "space-between" }};
            align-items:  ${(props) => { props.alignItems }};
            gap:1.4rem
      `};
      ${props =>
            props.type === 'horizontal' &&
            css`            
            align-items: center;
            justify-content: ${(props) => props.justifyContent};
            align-items: ${(props) => { props.alignItems || "center" }};
            gap: 1.2rem;
      `}
`

Row.defaultProps = {
      direction: 'horizontal'
}

export default Row;