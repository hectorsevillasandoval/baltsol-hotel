(function () {
  var loadCSS = require('./lib/loadCSS');
  var onScroll = require('./lib/onScroll');

  document.addEventListener('DOMContentLoaded', onDOMLoad);

  //var headerElem = document.querySelector('.header');
  //headerElem.addEventListener('scroll', onScroll);
  var menuMob = document.querySelector('.btn__menuMob');

  menuMob.addEventListener('click', function(){
          var menu = document.querySelector('.menu-mobile');
      menu.classList.toggle('show');
    
  });




  function onDOMLoad() {


    loadCSS('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.4.0/css/font-awesome.min.css');
    loadCSS('https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css');

    function onClickMenu() {
      var menu = document.querySelector('.menu-mobile');
      menu.classList.toggle('show');
    }
  }

}());