import styled from 'styled-components'
import theme from 'theme'
import { Layout as AntLayout } from 'antd'

import ThemeToggler from 'components/ThemeToggler'

const { Header: AntHeader, Content, Footer: AntFooter } = AntLayout

export default function Page({ children }) {
  return (
    <Layout>
      <Header>
        <Logo>Wikipedia Map</Logo>
        <ThemeToggler />
      </Header>
      <Content>{children}</Content>
      <Footer>By Maciek Sitkowski during Netguru College in March 2021</Footer>
    </Layout>
  )
}

const Layout = styled(AntLayout)`
  height: 100vh;
  background-color: ${theme.colors.gray_3};
`

const Header = styled(AntHeader)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${theme.colors.secondary};
`

const Logo = styled.h1`
  color: ${theme.colors.primary};
  margin-bottom: 0;
`

const Footer = styled(AntFooter)`
  text-align: center;
  color: ${theme.colors.primary};
  background: ${theme.colors.secondary};
`
