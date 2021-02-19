declare var Handlebars: any;
var theNews;
var search = 'country=us&';

var url = 'http://newsapi.org/v2/top-headlines?' +
    search +
    'apiKey=5dc413002f494563be38862bed15f046';


function fetching() {
    var req = new Request(url);
    fetch(req)
    .then(function (response) {
        return response.json();
    })
    .then(function (myJson) {
        theNews = myJson.articles
    })
    .then(function () {
        init();
    })
}

function init() {
    const templateSource = `{{#each news}}
    <div id="col-3">

        <img src="{{urlToImage}}">
        <h2>{{title}}</h2>
        <p>{{description}}</p>
        <a href="{{url}}" target="_blank">Ver más</a>

    </div>
    {{/each}}`;
    const template = Handlebars.compile(templateSource);
    document.getElementById('news-item').innerHTML = template({
        news: theNews
    });
    console.log("I am done");
}

window.addEventListener('load', (event) => {
    fetching();
});

document.getElementById("btn").addEventListener("click", (event) =>{
    event.preventDefault();
    search = (<HTMLInputElement>document.getElementById('search')).value;
    search = search == "" ? 'country=us&': `q=${search}&`;
    console.log(search);
    url = 'http://newsapi.org/v2/top-headlines?' +
    search +
    'apiKey=5dc413002f494563be38862bed15f046';
    fetching();

});