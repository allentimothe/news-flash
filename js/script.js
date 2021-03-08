const BASE_URL = 'https://api.nytimes.com/svc/topstories/v2/us.json?api-key=OiyxqfJgK3GU5NAC3qT9FxGyN5kJYLQf';

let newsData, detailData;

const $updates = $('#updates');


//Cached Elements
//============================================
const $main = $('#main');
const $modal = $('.modal');
const $title = $('#title');
const $uri = $('#uri');
const $abstract = $('#abstract');
const $multimedia = $('#multimedia');
const $byline = $('#byline');
const $created_date = $('#created_date');
const $item_type = $('#item_type');
const $refresh= $('#refresh');


//Event Listeners Below & Refresh Button
//==========================================
$updates.on('click', 'article.articles', handleClick);
$refresh.click(function() {
    location.reload();
});


//Function that initiates Data Pull from API
//============================================
init();

function init() {
    getData();
}

function handleClick(){
    getData(this.dataset.url);
}

function getData(detailURL) {
    const url = detailURL || BASE_URL;
     $.ajax(url)
     .then(function(data) {
         if(detailURL) {
             detailData = data; 
            
         } else {
             newsData = data;
         }
         render();
    }, function(error) {
    });
 }


 //XTML Error when trying to access to Modal
 function render() {
    if(detailData) {
        $byline.text(detailData.results[0].byline).css('text-transform', 'capitalize');
        $uri .text(detailData.results[0].uri);
        $title.text(detailData.results[0].title);
        $abstract.text(detailData.results[0].abstract);
        $created_date.text(detailData.results[0].created_date);
        $item_type.text(detailData.results[0].item_type);
        $multimedia.attr({ src: multimedia[0].url, alt: multimedia[1].url });
    
        $modal.modal();

    // =====================================================
        }else {
     const clip = newsData.results.map(function(flash) {
        return `
        <article data-url="${flash.url}" class="articles">
        
        <h3 id="title">${flash.title}</h3>
        <div class="divide">
        <p id="item_type">${flash.item_type}</p>
        <img id="multimedia" src="${flash.multimedia[0].url}" alt="">
        </div>
        <p id="byline">${flash.byline}</p>
        <p id="abstract">${flash.abstract}</p>
        <p id="created_date">${flash.created_date}</p>
        </article>`;
     });

     $updates.html(clip);
     console.log('data: ', data);
 }
}