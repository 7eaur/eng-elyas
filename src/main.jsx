import "./styles.css";
import "./sections.css";
import "./identity.css";

// The build already includes the page markup. Enhance it instead of replacing it.
import("./sections.js")
  .then(() => import("./experience.js"))
  .catch((error) => {
    console.error("Portfolio interactions could not initialize", error);
    if (window.__introBail) window.__introBail();
    document.getElementById("loader")?.remove();
    document.body.classList.add("ready");
    document.documentElement.style.removeProperty("overflow");
    document.documentElement.style.removeProperty("height");
  });
