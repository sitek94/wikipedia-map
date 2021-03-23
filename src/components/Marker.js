import styled from 'styled-components'
import theme from 'theme'

const Circle = styled.div`
  height: 30px;
  width: 30px;
  border-radius: 50%;
  background: ${theme.colors.sunset_orange};
  box-shadow: 0px 0px 5px ${theme.colors.orange_6};
  opacity: 0.7;
`

const Marker = Circle

export default Marker
