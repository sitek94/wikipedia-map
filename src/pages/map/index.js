import Layout, { Header, Content } from 'components/Layout'
import Sidebar from 'components/Sidebar'

import { MapMediator } from './mediator'
import Logo from './components/Logo'
import SearchBox from './components/SearchBox'
import GoogleMap from './components/GoogleMap'
import ArticleModal from './components/ArticleModal'
import SavedArticlesList from './components/SavedArticlesList'
import { Hidden } from '@material-ui/core'

export default function MapPage() {
  return (
    <Layout>
      <Header>
        <Hidden smDown>
          <Logo />
        </Hidden>

        <SearchBox />
      </Header>

      <Sidebar>
        <SavedArticlesList />
      </Sidebar>

      <Content>
        <MapMediator />
        <GoogleMap />
        <ArticleModal />
      </Content>
    </Layout>
  )
}
