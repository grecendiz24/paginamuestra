let didScroll;
let scrollTop = 0;
let delta = 3;
let navHeight = $('ul').outerHeight();

$(document).ready(function() {
    //hamburger menu function
    $('.nav-toggle').click(function() {
        $('.nav-ul').toggleClass('nav-open', 500);
        $(this).toggleClass('open');   
    });
    $(window).scroll(function() {
        parallax();
    });

    //parallax effect
    function parallax() {
        let scroll = $(window).scrollTop();
        $('.parallax--bg').css('background-position', 'center ' + (scroll*0.45) + 'px');
    }



//function to hide nav when scrolling
let didScroll = false;

    $(window).scroll(function(event){
        didScroll = true;
    });
    
    setInterval(function() {
        if (didScroll) {
            scroll();
            didScroll = false;
        }
    }, 150);
    
    function scroll() {
        //st es la distancia que hay entre el navbar y la parte de arriba del window 
        var st = $(this).scrollTop();
        
        //asegurarse que se ha hecho scroll mas que delta
        if(Math.abs(scrollTop - st) <= delta)
            return;
        
        //si haciendo scroll ya se pasó el navbar, se agrega la clase nav-up
        if (st > scrollTop && st > navHeight){
            //Scroll hacia abajo
            $('ul').removeClass('nav-ul').addClass('nav-up');
        } else {
            // Scroll Up
            if(st + $(window).height() < $(document).height()) {
                $('ul').removeClass('nav-up').addClass('nav-ul');
            }
        }
        
        scrollTop = st;
    }

})

//function for sliding images
function debounce(func, wait = 40, immediate = true) { //hace que el evento scroll no se dispare demasiadas veces
    let timeout;
    return function() {
      let context = this, args = arguments;
      let later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };

      let callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  };

  const sliderImages = document.querySelectorAll('.slide-in');
  function checkSlide(e) { // corre cuando el usuario hace scroll
    sliderImages.forEach(image => {
      //window.scrollY cuenta los pixeles que se han bajado al hacer scroll

      //mitad de la imagen
      const slideInAt = (window.scrollY + window.innerHeight) - image.height / 2;
      //parte de abajo de la imagen
      const imageBottom = image.offsetTop + image.height;
      const isHalfShown = slideInAt > image.offsetTop;
      const isNotScrolledPast = window.scrollY < imageBottom;
      if(isHalfShown && isNotScrolledPast) {
        image.classList.add('active');
      } else {
        image.classList.remove('active');
      }
    });
  }

  window.addEventListener('scroll', debounce(checkSlide));
