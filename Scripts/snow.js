const snowfall = document.querySelector(".snowfall");
const siteNav = document.querySelector(".site-nav");
const flakeCount = 42;

for (let index = 0; index < flakeCount; index += 1) {
  const flake = document.createElement("span");

  flake.className = "snowflake";
  flake.style.setProperty("--snow-left", `${Math.random() * 100}%`);
  flake.style.setProperty("--snow-size", `${2 + Math.random() * 4}px`);
  flake.style.setProperty("--snow-opacity", `${0.45 + Math.random() * 0.55}`);
  flake.style.setProperty("--snow-blur", `${Math.random() * 1.2}px`);
  flake.style.setProperty("--snow-drift", `${-35 + Math.random() * 70}px`);
  flake.style.setProperty("--snow-duration", `${8 + Math.random() * 10}s`);
  flake.style.setProperty("--snow-delay", `${Math.random() * -18}s`);

  snowfall.appendChild(flake);
}

window.addEventListener(
  "scroll",
  () => {
    siteNav.classList.toggle("is-visible", window.scrollY > 750);
  },
  { passive: true },
);
