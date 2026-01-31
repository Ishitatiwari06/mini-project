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

});
