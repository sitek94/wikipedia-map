const articlesKey = 'articles'

function ArticlesDatabase() {
  let articles = getArticles()

  return {
    refresh() {
      articles = getArticles()
    },
    isArticleVisited(pageid) {
      return articles.includes(pageid)
    },
    setArticleAsVisited(pageid) {
      addArticle(pageid)
    },
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

  function addArticle(pageid) {
    try {
      articles.push(pageid)
      localStorage.setItem(articlesKey, JSON.stringify(articles))
    } catch (error) {
      console.error('Error while adding article to localStorage', error)
    }
  }
}

export default ArticlesDatabase()
