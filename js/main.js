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
  if (!container) return;

  container.innerHTML = items
    .map(
      (place) => `
    <div style="display: flex; flex-direction: column; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.1); height: 100%; border: 1px solid #eee;">

    <div style="width: 100%; height: 200px; background: #f3f4f6; position: relative;">
            <img src="${place.main_image}"
                 alt="${place.name}"
                 style="width: 100%; height: 100%; object-fit: cover; display: block;"
                 onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'">

                 <div style="display: none; position: absolute; inset: 0; align-items: center; justify-content: center; color: #9ca3af; font-size: 14px; background: #e5e7eb;">
                Rasm yuklanmadi
            </div>
        </div>

        <div style="padding: 20px; flex-grow: 1; display: flex; flex-direction: column; align-items: center; text-align: center;">
            <h3 style="margin: 0 0 10px 0; font-size: 1.25rem; font-weight: bold; color: #1f2937;">
                ${place.name}
            </h3>
            <p style="margin: 0 0 20px 0; font-size: 0.875rem; color: #6b7280; line-height: 1.5;">
                ${place.short_description}
            </p>

            <a href="place-detail.html?id=${place.id}"
               style="margin-top: auto; width: 100%; padding: 12px 0; background: #2563eb; color: white; text-decoration: none; border-radius: 8px; font-weight: 600; transition: background 0.3s;">
                To'liq ma'lumot
            </a>
        </div>
    </div>
  `
    )
    .join("");
}

if (document.getElementById("featured-places")) {
  loadFeaturedPlaces();
}
