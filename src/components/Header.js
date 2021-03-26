import * as React from 'react'
import styled from 'styled-components'
import { Layout } from 'antd'

import theme from 'theme'
import ThemeToggler from 'components/ThemeToggler'
import SidebarToggler from 'components/SidebarToggler'
import SearchBoxBase from 'components/SearchBox'

const { Header: AntHeader } = Layout

export default function Header({ children }) {
  return (
    <Wrapper>
      <SidebarToggler />
      <Logo>Wikipedia Map</Logo>
      <SearchBox />
      <ThemeToggler />
    </Wrapper>
  )
}

const Wrapper = styled(AntHeader)`
  display: flex;
  align-items: center;
  padding: 0 20px;
  background: ${theme.colors.secondary};
`

const Logo = styled.h1`
  color: ${theme.colors.primary};
  margin: 0 20px;
`

const SearchBox = styled(SearchBoxBase)`
  width: 300px;
  margin-right: auto;
`
