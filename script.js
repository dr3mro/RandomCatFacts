const MAX_CAT_IMAGES = 10;
const FACT = document.getElementById("fact");
const IMG = document.getElementById("cat-img");
const GETFACTBTN = document.getElementById("get-fact-btn");

GETFACTBTN.addEventListener("click", Load);
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

async function Load() {
  FACT.textContent = await getFact().then((res) => res.fact);
  IMG.src = await getRandomCatImageUrl();
}

await Load();
