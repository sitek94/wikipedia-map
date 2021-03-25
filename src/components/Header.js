import styled from 'styled-components'
import { Layout } from 'antd'

import theme from 'theme'
import ThemeToggler from 'components/ThemeToggler'

const { Header: AntHeader } = Layout

export default function Header({ children }) {
  return (
    <Wrapper>
      <Logo>Wikipedia Map</Logo>
      <ThemeToggler />
    </Wrapper>
  )
}

const Wrapper = styled(AntHeader)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${theme.colors.secondary};
`

const Logo = styled.h1`
  color: ${theme.colors.primary};
  margin-bottom: 0;
`
