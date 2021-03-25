import Page from 'components/Page'
import GoogleMap from 'components/GoogleMap'
import { MapMediator } from './mediator'
import ArticleModal from 'components/ArticleModal'

export default function MapPage() {
  return (
    <Page>
      <MapMediator />
      <GoogleMap />
      <ArticleModal />
    </Page>
  )
}
