const articlesKey = 'articles'

function ArticlesDatabase() {
  let articles = getArticles()

  return {
    getArticles,
    refresh() {
      articles = getArticles()
    },
    isArticleSaved(pageid) {
      return articleExists(pageid)
    },
    setArticleAsSaved(pageid) {
      addArticle(pageid)
    },
    toggleArticle({ pageid, title, lat, lng }) {
      if (articleExists(pageid)) {
        removeArticle(pageid)
      } else {
        addArticle({ pageid, title, lat, lng })
      }
    },
  }

  function articleExists(pageid) {
    const index = articles.findIndex(a => a.pageid === pageid)
    return index !== -1
  }

  function getArticles() {
    try {
      const articles = localStorage.getItem(articlesKey)

      if (articles) {
        return JSON.parse(articles)
      } else {
        return []
      }
    } catch (error) {
      console.error('Error while reading articles from localStorage', error)
    }
  }

  function addArticle({ pageid, title, lat, lng }) {
    try {
      if (!articleExists(pageid)) {
        articles.push({ pageid, title, lat, lng })

        localStorage.setItem(articlesKey, JSON.stringify(articles))
      }
    } catch (error) {
      console.error('Error while adding article to localStorage', error)
    }
  }

  function removeArticle(pageid) {
    try {
      if (articleExists(pageid)) {
        const index = articles.findIndex(a => a.pageid === pageid)
        articles.splice(index, 1)

        localStorage.setItem(articlesKey, JSON.stringify(articles))
      }
    } catch (error) {
      console.error('Error while removing article from localStorage', error)
    }
  }
}

export default ArticlesDatabase()
