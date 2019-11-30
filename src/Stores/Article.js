import { decorate, observable, action } from "mobx";
import { instance } from "./User";
class ArticleStore {
  articles = [];
  article = null;
  loading = true;
  fetchAllArticles = async () => {
    try {
      const res = await instance.get("articles");
      this.articles = res.data.articles;
      this.loading = false;
    } catch (err) {
      console.error(err);
    }
  };
  filter(id) {
    return this.articles.filter(article => article._id === id);
  }
}

decorate(ArticleStore, {
  articles: observable,
  article: observable,
  loading: observable,
  filter: action
});
const articleStore = new ArticleStore();
articleStore.fetchAllArticles();

export default articleStore;
