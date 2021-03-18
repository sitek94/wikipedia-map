import styled from 'styled-components'
import { Layout as AntLayout, Typography } from 'antd'

const { Header, Content, Footer: AntFooter } = AntLayout
const { Text } = Typography

export default function Page({ children }) {
  return (
    <Layout>
      <Header>
        <Logo>Wikipedia Map</Logo>
      </Header>
      <Content>{children}</Content>
      <Footer>
        <Text>By Maciek Sitkowski during Netguru College in March 2021</Text>
      </Footer>
    </Layout>
  )
}

const Layout = styled(AntLayout)`
  height: 100vh;
  background-color: #ddd;
`

const Logo = styled.h1`
  color: #fff;
`

const Footer = styled(AntFooter)`
  text-align: center;
`
