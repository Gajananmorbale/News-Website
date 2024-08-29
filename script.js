const API_KEY = "3addd805a5f74ed98de022aebe0cf4f3";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("Sports"));

async function fetchNews(query) {
    const response = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await response.json();
    console.log(data);
    bindData(data.articles);
}

function bindData(articles) {
    const cardContainer = document.getElementById("cards-container");
    const newCardTemplate = document.getElementById("template-news-card");
    cardContainer.innerHTML = "";

    articles.forEach(article => {
        if (!article.urlToImage) return;
        const cardClone = newCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    newsImg.src = article.urlToImage;
    newsTitle.textContent = article.title;
    newsDesc.textContent = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta"
    });
    newsSource.innerHTML = `${article.source.name} · ${date}`;
}

// Add event listener for search button
let search =document.querySelector(".search-button");
document.querySelector(".search-button").addEventListener("click", () => {
    const query = document.querySelector(".news-input").value;
    if (query) {
        fetchNews(query);
    }
});
const curSelectNav = null;


function onNavItemClick(id){
    fetchNews(id);
    const navItems = document.getElementById(id);
    curSelectNav?.classList.remove("active");
    curSelectNav = navItems;
    curSelectNav.classList.add('active');


}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click",()=>{
    const query = searchText.value;
    if(query) return;

    fetchNews(query)
    curSelectNav?.classList.remove("active");
    curSelectNav = null;

})

function reload(){
    window.location.reload();
}