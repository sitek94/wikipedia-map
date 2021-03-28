import Page from 'components/Page'
import GoogleMap from 'components/GoogleMap'
import ArticleModal from 'components/ArticleModal'
import { MapMediator } from './mediator'

export default function MapPage() {
  return (
    <Page>
      <MapMediator />
      <GoogleMap />
      <ArticleModal />
    </Page>
  )
}
