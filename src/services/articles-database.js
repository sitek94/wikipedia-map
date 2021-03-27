const articlesKey = 'articles'

function ArticlesDatabase() {
  let articles = getArticles()

  return {
    refresh() {
      articles = getArticles()
    },
    isArticleSaved(pageid) {
      return articles.includes(pageid)
    },
    setArticleAsSaved(pageid) {
      addArticle(pageid)
    },
    toggleIsArticleSaved(pageid) {
      if (articles.includes(pageid)) {
        removeArticle(pageid)
      } else {
        addArticle(pageid)
      }
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

  function removeArticle(pageid) {
    try {
      const articleIndex = articles.indexOf(pageid)

      if (articleIndex !== -1) {
        articles.splice(articleIndex, 1)
        localStorage.setItem(articlesKey, JSON.stringify(articles))
      }
    } catch (error) {
      console.error('Error while removing article from localStorage', error)
    }
  }
}

export default ArticlesDatabase()
