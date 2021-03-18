import styled from 'styled-components'
import { Layout as AntLayout, Typography } from 'antd'

const { Header, Content: AntContent, Footer: AntFooter } = AntLayout
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
  min-height: 100vh;
  background-color: #ddd;
`

const Logo = styled.h1`
  color: #fff;
`
const Content = styled(AntContent)`
  padding: 24px;
`

const Footer = styled(AntFooter)`
  text-align: center;
`
