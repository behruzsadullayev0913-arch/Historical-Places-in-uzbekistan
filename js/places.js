/* places.js — places.html logikasi */
document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("places-list");
  if (!container) return;
  container.innerHTML = "";
  (window.PLACES || []).forEach((place) => {
    const el = document.createElement("article");
    el.className = "place-card";
    el.innerHTML = `
      <img src="${place.image}" alt="${place.name}">
      <h3>${place.name}</h3>
      <p>${place.short}</p>
      <p><a href="place-detail.html?id=${place.id}">Batafsil ko'rish →</a></p>
    `;
    container.appendChild(el);
  });
});
