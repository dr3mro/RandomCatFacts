const MAX_CAT_IMAGES = 10;
const FACT = document.getElementById("fact-text");
const IMG = document.getElementById("cat-img");
const GETFACTBTN = document.getElementById("get-fact-btn");

GETFACTBTN.addEventListener("click", async function () {
  await Load();
});

async function getFact() {
  return await fetch("https://catfact.ninja/fact")
    .then((res) => res.json())
    .catch((err) => console.log(err));
}

async function getImages() {
  return await fetch("https://api.thecatapi.com/v1/images/search?limit=10")
    .then((res) => res.json())
    .catch((err) => console.log(err));
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

async function getRandomCatImageUrl() {
  const images = await getImages();
  return await images[getRandomInt(MAX_CAT_IMAGES)].url;
}

function fadeOut(element) {
  return new Promise((resolve) => {
    element.classList.add("fade-out");
    element.classList.remove("fade-in");
    setTimeout(resolve, 200); // Wait for fade-out to complete
  });
}

function fadeIn(element) {
  return new Promise((resolve) => {
    element.classList.remove("fade-out");
    element.classList.add("fade-in");
    setTimeout(resolve, 200);
  });
}

async function Load() {
  // Fade out both elements
  await Promise.all([fadeOut(FACT), fadeOut(IMG)]);

  // Load new content
  const [factData, imageUrl] = await Promise.all([
    getFact(),
    getRandomCatImageUrl(),
  ]);

  // Update content
  FACT.textContent = factData.fact;
  IMG.src = imageUrl;

  // Wait for image to load before fading in
  IMG.onload = () => {
    fadeIn(IMG);
  };

  // Fade in the fact text immediately
  fadeIn(FACT);
}

Load();

setInterval(Load, 10000);
