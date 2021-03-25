import styled from 'styled-components'
import { Layout as AntLayout } from 'antd'

import theme from 'theme'
import Header from 'components/Header'

const { Content, Footer: AntFooter } = AntLayout

export default function Page({ children }) {
  return (
    <Layout>
      <Header />
      <Content>{children}</Content>
      <Footer>By Maciek Sitkowski during Netguru College in March 2021</Footer>
    </Layout>
  )
}

const Layout = styled(AntLayout)`
  height: 100vh;
  background-color: ${theme.colors.gray_3};
`

const Footer = styled(AntFooter)`
  text-align: center;
  color: ${theme.colors.primary};
  background: ${theme.colors.secondary};
`
