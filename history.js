document.addEventListener("DOMContentLoaded", () => {

  let history = JSON.parse(localStorage.getItem("searchHistory")) || [];
  let container = document.getElementById("historyList");

  console.log("Search History:", history); // DEBUG

  if (!container) {
    console.error("historyList element not found");
    return;
  }

  container.innerHTML = "";

  if (history.length === 0) {
    container.innerHTML = "<p>No search history found</p>";
    return;
  }
function openProductFromSearch(query) {
  fetch(`https://dummyjson.com/products/search?q=${query}`)
    .then(res => res.json())
    .then(data => {
      if (data.products && data.products.length > 0) {
        let productId = data.products[0].id;
        window.location.href = `product_details.html?id=${productId}`;
      } else {
        alert("No product found for this search");
      }
    })
    .catch(err => console.log("Search error:", err));
}

  history.sort((a, b) => b.time - a.time);

  history.forEach(item => {
    let div = document.createElement("div");
    div.className = "history-item";

    let date = new Date(item.time).toLocaleString("en-IN");

    div.innerHTML = `
      <strong>${item.query}</strong>
      <div class="date">${date}</div>
    `;

    div.addEventListener("click", () => {
      openProductFromSearch(item.query);
    });

    container.appendChild(div);
  });
const clearBtn = document.getElementById("clear");

clearBtn.addEventListener("click", () => {
  if (!confirm("Clear search history?")) return;

  localStorage.removeItem("searchHistory");
  container.innerHTML = "<p>No search history found</p>";
});
// ---------- VIEWED PRODUCTS ----------
const viewedContainer = document.getElementById("viewedList");
const viewedProducts = JSON.parse(localStorage.getItem("viewedProducts")) || [];

if (viewedProducts.length === 0) {
  viewedContainer.innerHTML = "<p>No products viewed yet</p>";
} else {
  viewedProducts.forEach(item => {
    const card = document.createElement("div");
    card.className = "viewed-card";

    const time = new Date(item.time).toLocaleString("en-IN");

    card.innerHTML = `
      <img src="${item.thumbnail}" alt="${item.title}">
      <h4>${item.title}</h4>
      <span>Viewed on ${time}</span>
    `;

    card.addEventListener("click", () => {
      window.location.href = `product_details.html?id=${item.id}`;
    });

    viewedContainer.appendChild(card);
  });
}
// ---------- CLEAR VIEWED HISTORY ----------
const clearViewedBtn = document.getElementById("clearViewed");

if (clearViewedBtn) {
  clearViewedBtn.addEventListener("click", () => {
    if (!confirm("Clear viewed products history?")) return;

    localStorage.removeItem("viewedProducts");
    viewedContainer.innerHTML = "<p>No products viewed yet</p>";
  });
}

});
