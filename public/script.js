const navLinks = document.querySelector(".nav-links");

function onToggleMenu(e) {
  e.name = e.name === "menu" ? "close" : "menu";
  navLinks.classList.toggle("opacity-0");
  navLinks.classList.toggle("hidden");
}

let sections = document.querySelectorAll("section");
let navLinksActive = document.querySelectorAll("header nav a");
window.onscroll = () => {
  if (window.scrollY >= 400) {
    sections.forEach((sec) => {
      let top = window.scrollY;
      let offset = sec.offsetTop - 150;
      let height = sec.offsetHeight;
      let id = sec.getAttribute("id");
      if (top >= offset && top < offset + height) {
        navLinksActive.forEach((links) => {
          links.classList.remove("text-yellow-800");
          document
            .querySelector("header nav a[href*=" + id + "]")
            .classList.add("text-yellow-800");
        });
      }
    });
  }
};

function parallax() {
  var s = document.getElementById("floater");
  var s2 = document.getElementById("floater2");
  var s3 = document.getElementById("floater3");
  var lefttext = document.getElementById("home-left-text");
  var righttext = document.getElementById("home-right-text");
  var headertext = document.getElementById("headertext");
  var historyimg = document.getElementById("historyimg");
  var yPos = window.scrollY / 10;
  var history = document.getElementById("history").getBoundingClientRect().top;
  let vw = Math.max(document.documentElement.clientWidth, window.innerWidth);
  let vh = Math.max(document.documentElement.clientHeight, window.innerHeight);
  s.style.top = yPos + "%";
  s.style.filter = "blur(" + yPos / 10 + "px)";
  s2.style.top = 50 + yPos + "%";

  if (yPos > 50) {
    headertext.style.transform = "translateX(" + (-yPos + 50) * 10 + "px)";
  } else {
    headertext.style.transform = "translateX(0px)";
  }

  var yPosLimit = 120;

  if (vw >= 1100) {
    yPosLimit = 120;
  } else {
    yPosLimit = 140;
  }
  if (yPos > yPosLimit) {
    s3.style.transform = "translateX(-20%)";
    if (vw >= 768) {
      lefttext.style.opacity = "0";
      righttext.style.opacity = "1";
    }
  } else {
    s3.style.transform = "translateX(80%)";
    if (vw >= 768) {
      lefttext.style.opacity = "1";
      righttext.style.opacity = "0";
    }
  }
  if (vw < 768) {
    lefttext.style.opacity = "1";
    righttext.style.opacity = "1";
  }

  if (vw < 1024) {
    s3.style.top = -20 - yPos * 2 + "px";
  } else {
    s3.style.top = -20 - yPos * (vw / 300) + "px";
  }

  if (history < 300) {
    document.getElementById("history").style.backgroundColor =
      "rgba(0, 0, 0, .6)";
  } else {
    document.getElementById("history").style.backgroundColor =
      "rgba(0, 0, 0, 0)";
  }

  //alert(yPos);
}

window.addEventListener("scroll", function () {
  parallax();
});

window.onload = function () {
  parallax();
};

const filterButtons = document.querySelectorAll("#filter-buttons button");

const filterCards = (e) => {
  document.querySelector("#filter-buttons .active").classList.remove("active");
  document
    .querySelector("#filter-buttons .bg-brown-cream-500")
    .classList.remove("bg-brown-cream-500");
  e.target.classList.add("active");
  e.target.classList.add("bg-brown-cream-500");

  // filterableCards.forEach((card) => {
  //   if (card.style.opacity == 0) {
  //     sleep(200).then(() => {
  //       card.classList.add("hidden");
  //     });
  //   } else {
  //     card.classList.replace("hidden", "flex");
  //   }
  // });
};

filterButtons.forEach((button) =>
  button.addEventListener("click", filterCards)
);

const cards = document.querySelectorAll(".cardcontent");
const backcards = document.querySelectorAll(".backcardcontent");

const flipcard = (e) => {
  e.target.classList.toggle("[transform:rotateY(180deg)]");
  e.target.nextElementSibling.classList.toggle("[transform:rotateY(-180deg)]");
  // rotated = rotated ? false : true;
  // e.target.style.transform = "rotate3d(0," + 1 + ",0, 180deg";
};
const unflipcard = (e) => {
  e.target.classList.toggle("[transform:rotateY(-180deg)]");
  e.target.previousElementSibling.classList.toggle(
    "[transform:rotateY(180deg)]"
  );
  // rotated = rotated ? false : true;
  // e.target.style.transform = "rotate3d(0," + 1 + ",0, 180deg";
};
cards.forEach((card) => card.addEventListener("click", flipcard));
backcards.forEach((card) => card.addEventListener("click", unflipcard));

historyscroll = document.querySelector(".historyscroll");
items = document.querySelectorAll(".historycard");

let active = 0;
function loadShow() {
  let stt = 0;
  items[active].style.transform = `none`;
  items[active].style.zIndex = 2;
  items[active].style.filter = "none";
  items[active].style.opacity = 1;
  items[active].style.filter = "drop-shadow(0_0_100px_crimson)";
  for (var i = active + 1; i < items.length; i++) {
    stt++;
    items[i].style.transform = `translateX(${-100 * stt}px) scale(${
      1 - 0.2 * stt
    }) perspective(16px) `;
    items[i].style.zIndex = 2 - stt;
    items[i].style.filter = "blur(2px)";
    items[i].style.opacity = stt > 2 ? 0 : 0.8;
  }
  stt = 0;
  for (var i = active - 1; i >= 0; i--) {
    stt++;
    items[i].style.transform = `translateX(${100 * stt}px) scale(${
      1 - 0.2 * stt
    }) perspective(16px) `;
    items[i].style.zIndex = 2 - stt;
    items[i].style.filter = "blur(2px)";
    items[i].style.opacity = stt > 2 ? 0 : 0.8;
  }
}
loadShow();
let next = document.getElementById("next");
let prev = document.getElementById("prev");
next.onclick = function () {
  active = active + 1 < items.length ? active + 1 : 0;
  historyscroll.scrollLeft = active * items[0].offsetWidth;
  loadShow();
};
prev.onclick = function () {
  active = active - 1 >= 0 ? active - 1 : items.length - 1;
  historyscroll.scrollLeft = active * items[0].offsetWidth;
  loadShow();
};

function skip(index) {
  active = index;
  loadShow();
}

var woofimg = document.querySelector(".woof");
var dog = document.querySelector(".dog");
var meowimg = document.querySelector(".meow");
var cat = document.querySelector(".cat");
function woof() {
  woofimg.classList.toggle("opacity-0");
  woofimg.classList.toggle("animate-woof");
}
function animatedog(animation) {
  dog.classList.toggle(animation);
}
function meow() {
  meowimg.classList.toggle("opacity-0");
  meowimg.classList.toggle("animate-woof");
}
function animatecat(animation) {
  cat.classList.toggle(animation);
}

const dogtips = document.querySelectorAll(".dogtips");
const dogbuttons = document.querySelectorAll(".dogbuttons");
const showdogtips = (e) => {
  var parent = e.target.parentNode;
  var index = Array.prototype.indexOf.call(parent.children, e.target);
  dogtips[index].classList.toggle("opacity-0");
};

dogbuttons.forEach((but) => but.addEventListener("mouseover", showdogtips));
dogbuttons.forEach((but) => but.addEventListener("mouseout", showdogtips));

const cattips = document.querySelectorAll(".cattips");
const catbuttons = document.querySelectorAll(".catbuttons");
const showcattips = (e) => {
  var parent = e.target.parentNode;
  var index = Array.prototype.indexOf.call(parent.children, e.target);
  cattips[index].classList.toggle("opacity-0");
};

catbuttons.forEach((but) => but.addEventListener("mouseover", showcattips));
catbuttons.forEach((but) => but.addEventListener("mouseout", showcattips));
