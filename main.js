var listsArray = [];
var aside = document.querySelector('.aside');
var main = document.querySelector('.main');
var makeTaskListBtn = document.querySelector('.aside__btn');

aside.addEventListener('click', makeTaskList);

function makeTaskList() {
  main.insertAdjacentHTML ('afterbegin',
 `<article class="main__article">
   <h2 class="article__h2">Task Title</h2>
   <hr>
   <section class="article__section1">
     <img class="article__section--img1" src="images/checkbox.svg" alt="unclicked checkbox image">
     <p class="article__section--p">String of idea text. String of idea text. String of idea text. String of idea text.</p>
   </section>
   <hr>
   <section class="article__section2">
     <div class="article__section2--container">
       <img class="article__section--img2" src="images/urgent.svg" alt="white colored unactivated lightning bolt image">
       <h4 class="article__section--h4">URGENT</h4>
     </div>
     <div class="article__section2--container">
       <img class="article__section--img3" src="images/delete.svg" alt="white colored unactivated x image">
       <h4 class="article__section--h4">DELETE</h4>
     </div>
   </section>
 </article>`)
};
