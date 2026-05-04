const sections = document.querySelectorAll("main section");

const showSections = () => {
  const trigger = window.innerHeight * 0.85;

  sections.forEach((section) => {
    const top = section.getBoundingClientRect().top;

    if (top < trigger) {
      section.classList.add("show");
    }
  });
};

window.addEventListener("scroll", showSections);
window.addEventListener("load", showSections);

/* ---------------- TOP 버튼 ---------------- */
const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    topBtn.classList.add("show");
  } else {
    topBtn.classList.remove("show");
  }
});

topBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

/* ---------------- smooth scroll nav ---------------- */
document.querySelectorAll("nav a").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute("href"));
    target.scrollIntoView({ behavior: "smooth" });
  });
});

/* ---------------- BGM ---------------- */
const bgm = document.getElementById("bgm");
const musicBtn = document.getElementById("musicBtn");

const iconOn = document.getElementById("icon-on");
const iconOff = document.getElementById("icon-off");

const header = document.querySelector("header");

let isPlaying = false;
let autoTriggered = false;

/* ---------------- 꽃잎 시스템 ---------------- */
const petalContainer = document.getElementById("petal-container");

let petalInterval = null;

/* 꽃잎 생성 */
function createPetal() {
  const petal = document.createElement("div");
  petal.classList.add("petal");

  petal.style.left = Math.random() * window.innerWidth + "px";

  const size = Math.random() * 10 + 8;
  petal.style.width = size + "px";
  petal.style.height = size + "px";

  petal.style.animationDuration = Math.random() * 3 + 2 + "s";

  petalContainer.appendChild(petal);

  setTimeout(() => {
    petal.remove();
  }, 5000);
}

/* 꽃잎 시작 */
function startPetals() {
  if (petalInterval) return;

  petalInterval = setInterval(createPetal, 150);
}

/* 꽃잎 종료 */
function stopPetals() {
  clearInterval(petalInterval);
  petalInterval = null;
}

/* ---------------- 음악 ON ---------------- */
function playMusic() {
  bgm.muted = false;

  bgm.play().catch(() => {
    // autoplay 정책 대비 (무시 가능)
  });

  iconOff.style.display = "none";
  iconOn.style.display = "block";

  isPlaying = true;

  startPetals();
}

/* ---------------- 음악 OFF ---------------- */
function stopMusic() {
  bgm.pause();

  iconOff.style.display = "block";
  iconOn.style.display = "none";

  isPlaying = false;

  stopPetals();
}

/* ---------------- header 지나면 자동 재생 ---------------- */
window.addEventListener("scroll", () => {
  const triggerPoint = window.innerHeight * 0.6;
  const headerBottom = header.getBoundingClientRect().bottom;

  if (headerBottom < triggerPoint && !autoTriggered) {
    autoTriggered = true;
    playMusic();
  }
});

/* ---------------- 버튼 클릭 ---------------- */
musicBtn.addEventListener("click", () => {
  if (!isPlaying) {
    playMusic();
  } else {
    stopMusic();
  }
});
