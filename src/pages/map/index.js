import Page from 'components/Page'
import GoogleMap from 'components/GoogleMap'
import { MapMediator } from './mediator'
import ArticleModal from 'components/ArticleModal'
import HistorySidebar from './HistorySidebar'

export default function MapPage() {
  return (
    <Page>
      <HistorySidebar />
      <MapMediator />
      <GoogleMap />
      <ArticleModal />
    </Page>
  )
}
