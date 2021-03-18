import ky from 'ky'

const client = ky.create({
  prefixUrl: 'https://en.wikipedia.org/w/api.php?',
  headers: {
    'content-type': 'application/json',
  },
})

const defaultParams = {
  origin: '*',
}

const wikipedia = {
  getArticles({ coord, radius = 10000, limit = 10 } = {}) {
    if (!coord) {
      console.error('Wikipedia API: no coord passed to getArticles')
    }

    const params = {
      action: 'query',
      list: 'geosearch',
      format: 'json',
      origin: '*',
    }

    return client
      .get('', {
        searchParams: {
          ...defaultParams,
          ...params,
          gscoord: coord.lat + '|' + coord.lng,
          gsradius: radius,
          gslimit: limit,
        },
      })
      .json()
  },
}

export default wikipedia
