const container = document.getElementById('root');
const ajax = new XMLHttpRequest();
const content = document.createElement('div');
const NEWS_URL = 'https://api.hnpwa.com/v0/news/1.json';
const CONTENT_URL = 'https://api.hnpwa.com/v0/item/@id.json'

function getData(url) {
  ajax.open('GET', url, false);
  ajax.send();
  return JSON.parse(ajax.response);

}



/* 글내용 */
function createNewsContent(){

  const id = this.location.hash.substr(1);
  const newsContent = getData(CONTENT_URL.replace('@id',id));
  const title = document.createElement('h1')
  title.innerHTML = newsContent.title;
  container.innerHTML = `
    <h1>${newsContent.title}</h1>
    <div>
      <a href="#">목록으로</a>
    </div>
  `;
}

/* 글목록 */
function createNewsFeed() {

  const newsFeed = getData(NEWS_URL);
  const newsList = [];

  newsList.push('<ul>')

  for(let i = 0; i < 10; i++) {
    newsList.push(`
      <li>
        <a href="#${newsFeed[i].id}">
          ${newsFeed[i].title} (${newsFeed[i].comments_count})
        </a>
      </li>
    `);
  }
  newsList.push('</ul>')

  container.innerHTML = newsList.join('');

}

function router() {
  const routePath = location.hash;
  console.log(routePath);

  if (routePath === '') {
    createNewsFeed()
  } else {
    createNewsContent();
  }
}

window.addEventListener('hashchange', router);

router();