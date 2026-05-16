(function ($) {

  "use strict";

  // =========================
  // MENU
  // =========================
  $('.navbar-collapse a').on('click', function () {
    $(".navbar-collapse").collapse('hide');
  });

  // =========================
  // SMOOTH SCROLL
  // =========================
  $('.smoothscroll').click(function () {

    const el = $(this).attr('href');
    const elWrapped = $(el);
    const headerHeight = $('.navbar').height();

    scrollToDiv(elWrapped, headerHeight);
    return false;

    function scrollToDiv(element, navheight) {
      const offset = element.offset();
      const totalScroll = offset.top - navheight;

      $('body,html').animate({
        scrollTop: totalScroll
      }, 300);
    }

  });

})(window.jQuery);

document.addEventListener("DOMContentLoaded", function () {
  const images = document.querySelectorAll(".artists-image");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const prevBtn = document.querySelector(".lightbox-prev");
  const nextBtn = document.querySelector(".lightbox-next");
  const closeBtn = document.querySelector(".lightbox-close");

  let currentIndex = 0;

  function showImage(index) {
    currentIndex = index;
    lightboxImg.src = images[index].src;
    lightbox.classList.add("active");
  }

  images.forEach((img, i) => {
    img.style.cursor = "pointer";
    img.addEventListener("click", () => {
      showImage(i);
    });
  });

  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % images.length;
    lightboxImg.src = images[currentIndex].src;
  });

  prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    lightboxImg.src = images[currentIndex].src;
  });

  closeBtn.addEventListener("click", () => {
    lightbox.classList.remove("active");
  });

  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("active")) return;
    if (e.key === "Escape") lightbox.classList.remove("active");
    if (e.key === "ArrowRight") nextBtn.click();
    if (e.key === "ArrowLeft") prevBtn.click();
  });
});
// =========================
// CURSORE PERSONALIZZATO
// =========================
const cursor = document.querySelector(".cursor");
const bubble = document.querySelector(".cursor-bubble");

let mouseX = 0;
let mouseY = 0;
let bubbleX = 0;
let bubbleY = 0;

if (cursor && bubble) {

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    cursor.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
  });

  function animateBubble() {
    bubbleX += (mouseX - bubbleX) * 0.1;
    bubbleY += (mouseY - bubbleY) * 0.1;

    bubble.style.transform = `translate(${bubbleX}px, ${bubbleY}px)`;

    requestAnimationFrame(animateBubble);
  }

  animateBubble();
}


// =========================
// FADE-IN ALLO SCROLL
// =========================
document.addEventListener("DOMContentLoaded", () => {

  const faders = document.querySelectorAll('.fade-in-element');

  if (!faders.length) return;

  const options = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const observer = new IntersectionObserver((entries, observer) => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }

    });

  }, options);

  faders.forEach(fader => observer.observe(fader));

});


// =========================
// NAVBAR SCROLL
// =========================
window.addEventListener("scroll", function () {
    const navbar = document.querySelector(".navbar");

    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});


// =========================
// MINI PLAYER MUSICA
// =========================
const audio = document.getElementById("audio");
const btn = document.getElementById("playBtn");
const bar = document.querySelector(".progress-bar");
const volumeSlider = document.getElementById("volume");
const muteBtn = document.getElementById("muteBtn");

btn.onclick = () => {
    if (audio.paused) {
        audio.play();
        btn.textContent = "❚❚";
    } else {
        audio.pause();
        btn.textContent = "▶";
    }
};

audio.ontimeupdate = () => {
    const progress = (audio.currentTime / audio.duration) * 100;
    bar.style.width = progress + "%";
};

// =========================
// VOLUME SLIDER + MUTE
// =========================
volumeSlider.addEventListener("input", () => {
    audio.volume = volumeSlider.value;
    audio.muted = false;
    if (muteBtn) muteBtn.textContent = "🔊";
});

if (muteBtn) {
    muteBtn.onclick = () => {
        audio.muted = !audio.muted;
        muteBtn.textContent = audio.muted ? "🔇" : "🔊";
    };
}

var map = L.map('truckMap').setView([45.4642, 9.1900], 6);

L.tileLayer('https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png', {
  maxZoom: 20
}).addTo(map);

var trucks = [
  { coords:[38.936904970417224, 8.930156819610858], img:"images/gallery1.jpg", name:"Camion 1"},
  { coords:[43.736983992003005, 7.422181472070049], img:"images/gallery2.jpg", name:"Camion 2"},
  { coords:[46.62951279626495, 8.101566006053893], img:"images/gallery3.jpg", name:"Camion 3"},
  { coords:[45.0703,7.6869], img:"images/gallery4.jpg", name:"Camion 4"},
  { coords:[43.7696,11.2558], img:"images/gallery5.jpg", name:"Camion 5"},
  { coords:[45.4384,10.9916], img:"images/gallery6.jpg", name:"Camion 6"}
];
var truckIcon = L.icon({
  iconUrl: "images/truck-icon.png",
  iconSize: [60, 60],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40]
});
trucks.forEach(truck => {
  L.marker(truck.coords, { icon: truckIcon })
    .addTo(map)
    .bindPopup(`
      <b>${truck.name}</b><br>
      <img src="${truck.img}" onclick="openFullscreen('${truck.img}')">
    `);
});
function openFullscreen(src) {
  document.getElementById("fullscreenImg").src = src;
  document.getElementById("imgFullscreen").style.display = "flex";
  document.body.classList.add("no-scroll"); // blocca scroll
}

function closeFullscreen() {
  document.getElementById("imgFullscreen").style.display = "none";
  document.body.classList.remove("no-scroll"); // riattiva scroll
}

document.getElementById("closeFullscreen").onclick = closeFullscreen;

document.getElementById("imgFullscreen").onclick = e => {
  if (e.target.id === "imgFullscreen") {
    closeFullscreen();
  }
};

document.getElementById("imgFullscreen").onclick = e => {
  if (e.target.id === "imgFullscreen")
    document.getElementById("imgFullscreen").style.display = "none";
};
const imgFullscreen = document.getElementById("imgFullscreen");
const fullscreenImg = document.getElementById("fullscreenImg");
const closeFS = document.getElementById("closeFullscreen");

// Indice corrente per scorrimento
let currentIndex = 0;

// Apri fullscreen
function openFullscreen(src) {
  currentIndex = trucks.findIndex(t => t.img === src);
  fullscreenImg.src = trucks[currentIndex].img;
  imgFullscreen.style.display = "flex";
  document.body.classList.add("no-scroll");
}

// Chiudi fullscreen
function closeFullscreen() {
  imgFullscreen.style.display = "none";
  document.body.classList.remove("no-scroll");
}

// Frecce avanti/indietro
function nextImage() {
  currentIndex = (currentIndex + 1) % trucks.length;
  fullscreenImg.src = trucks[currentIndex].img;
}

function prevImage() {
  currentIndex = (currentIndex - 1 + trucks.length) % trucks.length;
  fullscreenImg.src = trucks[currentIndex].img;
}

// Eventi click
closeFS.onclick = closeFullscreen;
imgFullscreen.onclick = e => {
  if (e.target.id === "imgFullscreen") closeFullscreen();
};
