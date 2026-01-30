let history = JSON.parse(localStorage.getItem("viewedProducts")) || [];
let container = document.getElementById("historyList");

history.sort((a, b) => b.time - a.time);

history.forEach(item => {
  let div = document.createElement("div");
  div.className = "history-item";

  let date = new Date(item.time).toLocaleString("en-IN");

  div.innerHTML = `
    <strong>${item.title}</strong>
    <div class="date">${date}</div>
  `;

  div.addEventListener("click", () => {
  window.location.href =
    `product_details.html?id=${item.id}&from=history`;
});

  container.appendChild(div);
});

function clearHistory() {
  localStorage.removeItem("viewedProducts");
  container.innerHTML = "";
}
