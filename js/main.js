async function getPlacesData() {
  const response = await fetch("./data/places.json");
  return await response.json();
}

async function loadFeaturedPlaces() {
  const data = await getPlacesData();
  const container = document.getElementById("featured-places");
  if (container) {
    displayCards(data.slice(0, 3), container);
  }
}

async function loadAllPlaces() {
  const data = await getPlacesData();
  const container = document.getElementById("all-places-container");
  if (container) {
    displayCards(data, container);
  }
}

function displayCards(items, container) {
  container.innerHTML = items
    .map(
      (place) => `
        <div class="card" style="border: 1px solid #eee; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); display: flex; flex-direction: column;">
            <div class="card-image">
                <img src="${place.main_image}" alt="${place.name}" style="width: 100%; height: 200px; object-fit: cover;">
            </div>
            <div class="card-content" style="padding: 15px; flex-grow: 1; text-align: center;">
                <h3>${place.name}</h3>
                <p style="color: #666; font-size: 0.9rem;">${place.short_description}</p>
            </div>
            <a href="place-detail.html?id=${place.id}" class="card-button" style="display: block; width: fit-content; margin: 10px auto 20px; padding: 10px 20px; background: #2563eb; color: white; text-decoration: none; border-radius: 8px;">To'liq ma'lumot</a>
        </div>
    `
    )
    .join("");
}

if (document.getElementById("featured-places")) {
  loadFeaturedPlaces();
}
