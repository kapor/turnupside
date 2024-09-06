


/* ++++++++++++++ INFO OVERLAY ++++++++++++++ */

var btn = document.getElementById("info_button");
var modalback = document.getElementsByClassName("info_overlay_back")[0];
var modal = document.getElementsByClassName("info_overlay")[0];
var close = document.getElementsByClassName("info_close")[0];

// FUNCTIONS

function openModal() {
  modalback.style.display = "block";
  setTimeout(() => { modalback.style.opacity = "1"}, 20);
  setTimeout(() => { modal.style.height = "100%" }, 50);
}

function closeModal() {
  setTimeout(() => { modal.style.height = "0" }, 50);
  setTimeout(() => { modalback.style.opacity = "0"}, 50);
  setTimeout(() => { modalback.style.display = "none" }, 300);
}

btn.addEventListener( "click", buttonEvent );
function buttonEvent() {
  openModal();
  btn.removeEventListener( "click", buttonEvent );
  setTimeout(() => {
    close.addEventListener( "click", closeModalEvent );
    window.addEventListener( "click", closeModalEvent2 );
  }, 20);
}

function closeModalEvent() {
  setTimeout(() => {
    close.removeEventListener( "click", closeModalEvent );
    window.removeEventListener( "click", closeModalEvent2 );
    btn.addEventListener( "click", buttonEvent );
  }, 20);
  closeModal();
}

function closeModalEvent2() {
  if (event.target == modalback) {
    setTimeout(() => {
      close.removeEventListener( "click", closeModalEvent );
      window.removeEventListener( "click", closeModalEvent2 );
      btn.addEventListener( "click", buttonEvent );
    }, 20);
    closeModal();
  }
};

/* ++++++++++ TOP-NAVIGTION ++++++++++ */

window.onscroll = function() {myFunction()};

var navbar = document.getElementById("navbar");
var sticky = navbar.offsetTop;

function myFunction() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky")
  } else {
    navbar.classList.remove("sticky");
  }
};

/* ++++++++++ SIDE-BAR NAV STATES ++++++++++ */


let elements = ['.menu_row', '#mygrid_data_column_1'];

// Add class on mouseover
document.querySelectorAll(elements).forEach(element => {
  element.addEventListener('mouseover', () => {
    element.classList.add(':hover');
  });
});

// Remove class on mouseout
document.querySelectorAll(elements).forEach(element => {
  element.addEventListener('mouseout', () => {
      element.classList.remove(':hover');
  });
});


/* ++++++++++ MENU SCROLL INDICATOR ++++++++++ */


//https://stackoverflow.com/questions/16308037/detect-when-elements-within-a-scrollable-div-are-out-of-view

//Here's a pure javascript version of the accepted answer without relying on jQuery and with some fixes to the partial in view detection and support for out of view on top.

var container = document.getElementById("big_2"),
  element = document.getElementsByTagName("section"),
    menu_row = document.getElementsByClassName("menu_row"),
    i;

const padding = container - 320;

function checkInView(container, element, partial) {

    //Get container properties
    let cTop = container.scrollTop;
    let cBottom = cTop + container.clientHeight;

    //Get element properties
    let eTop = element.offsetTop - container.offsetTop; // change here
    let eBottom = eTop + element.clientHeight;

    //Check if in view    
    let isTotal = (eTop >= cTop && eBottom <= cBottom);
    let isPartial = partial && (
      (eTop < cTop && eBottom > cTop) ||
      (eBottom > cBottom && eTop < cBottom)
    );

    //Return outcome
    return  (isTotal  || isPartial);
}

document.onscroll = function () {
    
    for ( i = 0 ; i < element.length ; i++ ) {
        
        if ( window.scrollY > element[i].offsetTop + padding && window.scrollY < element[i].offsetTop + element[i].clientHeight + padding ) {
            menu_row[i].classList.add("menu_highlight");
        }
        else {
            menu_row[i].classList.remove("menu_highlight");
        }
    }
};







