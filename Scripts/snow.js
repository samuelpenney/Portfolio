const snowfall = document.querySelector(".snowfall");
const siteNav = document.querySelector(".site-nav");
const flakeCount = 42;

const setSnowfallHeight = () => {
  const pageHeight = document.documentElement.scrollHeight;

  snowfall.style.setProperty("--snow-page-height", `${pageHeight}px`);
  snowfall.style.height = `${pageHeight}px`;
};

setSnowfallHeight();
window.addEventListener("resize", setSnowfallHeight);

for (let index = 0; index < flakeCount; index += 1) {
  const flake = document.createElement("span");

  flake.className = "snowflake";
  flake.style.setProperty("--snow-left", `${Math.random() * 100}%`);
  flake.style.setProperty("--snow-size", `${2 + Math.random() * 4}px`);
  flake.style.setProperty("--snow-opacity", `${0.45 + Math.random() * 0.55}`);
  flake.style.setProperty("--snow-blur", `${Math.random() * 1.2}px`);
  flake.style.setProperty("--snow-drift", `${-35 + Math.random() * 70}px`);
  flake.style.setProperty("--snow-duration", `${10 + Math.random() * 12}s`);
  flake.style.setProperty("--snow-delay", `${Math.random() * -18}s`);

  snowfall.appendChild(flake);
}

window.addEventListener(
  "scroll",
  () => {
    siteNav.classList.toggle("is-visible", window.scrollY > 820);
  },
  { passive: true },
);
