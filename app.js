const container = document.getElementById('root');
const ajax = new XMLHttpRequest();
const content = document.createElement('div');
const NEWS_URL = 'https://api.hnpwa.com/v0/news/1.json';
const CONTENT_URL = 'https://api.hnpwa.com/v0/item/@id.json'
const store = {
  currentpage: 1
}

function getData(url) {
  ajax.open('GET', url, false);
  ajax.send();
  return JSON.parse(ajax.response);

}

/* 글내용 */
function createNewsContent(){

  const id = this.location.hash.substr(7);
  const newsContent = getData(CONTENT_URL.replace('@id',id));
  const title = document.createElement('h1')
  title.innerHTML = newsContent.title;
  container.innerHTML = `
    <h1>${newsContent.title}</h1>
    <div>
      <a href="#/page/${store.currentpage}">목록으로</a>
    </div>
  `;
}

/* 글목록 */
function createNewsFeed() {

  const newsFeed = getData(NEWS_URL);
  const maxContentCount = newsFeed.length;
  const listCount = 4;
  const maxPage = maxContentCount / listCount;
  const newsList = [];

  console.log( store.currentpage+'/'+maxPage);

  newsList.push('<ul>')

  for(let i = (store.currentpage - 1)* listCount; i < store.currentpage * listCount; i++) {
    console.log(newsFeed[i]);
    if(newsFeed[i] === undefined) break;
    
    newsList.push(`
      <li>
        <a href="#/show/${newsFeed[i].id}">
          ${newsFeed[i].title} (${newsFeed[i].comments_count})
        </a>
      </li>
    `);

  }
  newsList.push('</ul>')

  newsList.push(`
  <div>
    <a href="#/page/${store.currentpage > 1 ? store.currentpage - 1 : 1}">이전페이지</a>
    <a href="#/page/${store.currentpage >= maxPage ? maxPage : store.currentpage + 1}">다음페이지</a>
  </div>
  `);
  console.log(newsList);
  container.innerHTML = newsList.join('');

}

function router() {
  const routePath = location.hash;
  if (routePath === '') {
    createNewsFeed()
  } else if(routePath.indexOf('#/page/') >= 0){
    store.currentpage = Number(routePath.substring(7));
    createNewsFeed();
  } else if(routePath.indexOf('#/show/') >= 0) {
    createNewsContent();
  }
}

window.addEventListener('hashchange', router);

router();