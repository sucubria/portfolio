// Scripts communs au portfolio et aux démos : menu mobile, année du pied de page,
// repli graphique pour les photos externes qui ne se chargent pas.

document.querySelectorAll("[data-nav-toggle]").forEach((button) => {
  const nav = document.getElementById(button.getAttribute("aria-controls"));
  if (!nav) return;

  const setOpen = (open) => {
    button.setAttribute("aria-expanded", String(open));
    nav.classList.toggle("is-open", open);
  };

  button.addEventListener("click", () => {
    setOpen(button.getAttribute("aria-expanded") !== "true");
  });

  // Referme le menu après un clic sur un lien d'ancre.
  nav.addEventListener("click", (event) => {
    if (event.target.closest("a")) setOpen(false);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && button.getAttribute("aria-expanded") === "true") {
      setOpen(false);
      button.focus();
    }
  });
});

document.querySelectorAll("[data-year]").forEach((el) => {
  el.textContent = String(new Date().getFullYear());
});

document.querySelectorAll("img[data-fallback]").forEach((img) => {
  const fail = () => img.closest("[data-fallback-box]")?.classList.add("img-failed");
  if (img.complete && img.naturalWidth === 0 && img.currentSrc) fail();
  img.addEventListener("error", fail);
});
