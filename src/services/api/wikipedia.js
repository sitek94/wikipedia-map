import ky from 'ky'

const client = ky.create({
  prefixUrl: 'https://en.wikipedia.org/w/api.php?',
  headers: {
    'content-type': 'application/json',
  },
})

const defaultParams = {
  origin: '*',
  action: 'query',
  format: 'json',
}

const wikipedia = {
  getArticles({ coord, radius = 10000, limit = 50 } = {}) {
    if (!coord) {
      console.error('Wikipedia API: no coord passed to getArticles')
    }

    const params = {
      list: 'geosearch',
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
  getArticleInfo({ pageid }) {
    if (!pageid) {
      console.error('Wikipedia API: no pageid passed to getArticle')
    }

    const params = {
      prop: 'info',
      inprop: 'url',
    }

    return client
      .get('', {
        searchParams: {
          ...defaultParams,
          ...params,
          pageids: pageid,
        },
      })
      .json()
  },
}

export default wikipedia
