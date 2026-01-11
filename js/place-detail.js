async function loadPlaceDetail() {
  const urlParams = new URLSearchParams(window.location.search);
  const placeId = urlParams.get("id");

  if (!placeId) return;

  try {
    const response = await fetch("./data/places.json");
    const data = await response.json();

    // ID bo'yicha JSONdan ma'lumotni topamiz
    const place = data.find((p) => p.id == placeId);

    if (place) {
      renderPage(place);
      setupLearnMore(place); // Wikipedia tugmasini shu yerda ishlatamiz
    } else {
      document.body.innerHTML =
        "<h1>Ma'lumot topilmadi</h1><a href='index.html'>Orqaga</a>";
    }
  } catch (error) {
    console.error("Yuklashda xato:", error);
  }
}

function renderPage(place) {
  const heroSection = document.getElementById("hero-section");
  if (heroSection) {
    heroSection.innerHTML = `
            <h1 class="main-title">${place.name}</h1>
            <img src="${place.main_image}" class="main-img" alt="${place.name}">
        `;
  }

  document.getElementById("full-desc").innerText = place.full_description;
  document.getElementById("loc").innerText = place.location;
  document.getElementById("period").innerText = place.period;
  document.getElementById("type").innerText = place.category;

  if (place.gallery && place.gallery.length > 0) {
    const galleryHTML = `
            <div class="gallery-section">
                <h3>Fotogalereya</h3>
                <div class="gallery-grid">
                    ${place.gallery
                      .map(
                        (imgUrl) => `
                        <div class="gallery-item">
                            <img src="${imgUrl}" alt="Galereya rasmi">
                        </div>
                    `
                      )
                      .join("")}
                </div>
            </div>
        `;
    document
      .querySelector(".text-block")
      .insertAdjacentHTML("beforeend", galleryHTML);
  }

  // Xaritani chiqarish
  const mapBox = document.getElementById("map-box");
  if (mapBox) {
    const query = encodeURIComponent(`${place.name}, ${place.location}`);
    mapBox.innerHTML = `
            <iframe width="100%" height="250" frameborder="0" 
            style="border-radius:12px; border:1px solid #ddd;"
            src="https://maps.google.com/maps?q=${query}&t=&z=14&ie=UTF8&iwloc=&output=embed">
            </iframe>
        `;
  }
}

// Tugma bosilishini boshqaruvchi yangi funksiya
function setupLearnMore(place) {
  const learnBtn = document.getElementById("lear-more");
  if (learnBtn) {
    learnBtn.addEventListener("click", (e) => {
      e.preventDefault(); // Sahifa sakrab ketmasligi uchun
      const cleanKey = place.key.replace(/['’‘`ʻ]/g, "");
      window.location.href = `https://uz.wikipedia.org/wiki/${encodeURIComponent(
        cleanKey
      )}`;
    });
  }
}

loadPlaceDetail();
