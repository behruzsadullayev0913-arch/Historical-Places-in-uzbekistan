/* place-detail.js — place-detail.html logikasi */
document.addEventListener("DOMContentLoaded", function () {
  const el = document.getElementById("place-detail");
  if (!el) return;
  const params = new URLSearchParams(location.search);
  const id = parseInt(params.get("id"), 10);
  const place = (window.PLACES || []).find((p) => p.id === id);
  if (!place) {
    el.innerHTML = "<p>Joy topilmadi.</p>";
    return;
  }
  el.innerHTML = `
    <h2>${place.name}</h2>
    <div class="meta">${place.location} · ${place.year}</div>
    <img src="${place.image}" alt="${place.name}">
    <p>${place.description}</p>
  `;
});
