let allPlacesData = [];

async function getPlacesData() {
  try {
    const response = await fetch("./data/places.json");
    if (!response.ok) throw new Error("Fayl topilmadi");
    return await response.json();
  } catch (error) {
    console.error("Ma'lumot yuklashda xatolik:", error);
    return [];
  }
}

async function loadFeaturedPlaces() {
  const data = await getPlacesData();
  const container = document.getElementById("featured-places");
  if (container) {
    displayCards(data.slice(0, 3), container);
  }
}

async function loadAllPlaces() {
  allPlacesData = await getPlacesData();
  const container = document.getElementById("all-places-container");
  const filterSelect = document.getElementById("region-filter");
  const searchInput = document.getElementById("search-input");

  if (container) {
    const handleFilterAndSearch = () => {
      const selectedRegion = filterSelect ? filterSelect.value : "all";
      const searchText = searchInput
        ? searchInput.value.toLowerCase().trim()
        : "";

      const filtered = allPlacesData.filter((place) => {
        const matchesRegion =
          selectedRegion === "all" || place.region === selectedRegion;

        const matchesSearch =
          place.name.toLowerCase().includes(searchText) ||
          place.short_description.toLowerCase().includes(searchText);

        return matchesRegion && matchesSearch;
      });

      displayCards(filtered, container);
    };

    displayCards(allPlacesData, container);

    if (filterSelect)
      filterSelect.addEventListener("change", handleFilterAndSearch);
    if (searchInput)
      searchInput.addEventListener("input", handleFilterAndSearch);
  }
}

function displayCards(items, container) {
  if (!container) return;

  if (items.length === 0) {
    container.innerHTML = `
      <div class="col-span-full text-center py-10">
        <p class="text-gray-500 text-lg">Hech qanday ma'lumot topilmadi.</p>
      </div>`;
    return;
  }

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
           style="margin-top: auto; width: 100%; padding: 12px 0; background: #87A96B; color: white; text-decoration: none; border-radius: 8px; font-weight: 600; text-align: center; transition: background 0.3s;">
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

// Mobil menyuni boshqarish
const menuToggle = document.getElementById("mobile-menu");
const navList = document.getElementById("nav-list");

if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    navList.classList.toggle("active");
  });
}

// Menyu linki bosilganda menyuni yopish
document.querySelectorAll(".nav-link a").forEach((link) => {
  link.addEventListener("click", () => {
    navList.classList.remove("active");
  });
});
