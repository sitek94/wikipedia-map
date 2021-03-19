import Page from 'components/Page'
import GoogleMap from 'components/GoogleMap'
import { MapMediator } from './mediator'

export default function Map() {
  return (
    <Page>
      <MapMediator />
      <GoogleMap />
    </Page>
  )
}
