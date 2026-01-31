let params = new URLSearchParams(window.location.search);
let productId = params.get("id");
let fromHistory = params.get("from") === "history";

console.log("Product ID:", productId);
function saveToHistory(product) {
  let history = JSON.parse(localStorage.getItem("viewedProducts")) || [];

  // remove duplicate if already exists
  history = history.filter(item => item.id !== product.id);

  // add to top
  history.unshift({
    id: product.id,
    title: product.title,
    thumbnail: product.thumbnail,
    price: product.price,
    time: Date.now()
  });

  // limit to last 10 viewed products
  if (history.length > 10) {
    history.pop();
  }

  localStorage.setItem("viewedProducts", JSON.stringify(history));
}

fetch(`https://dummyjson.com/products/${productId}`)
  .then(res => res.json())
  .then(product => {
    console.log("Product Data:", product);
    
    document.getElementById("title").innerText = product.title;
    document.getElementById("thumbnail").src = product.thumbnail;
    document.getElementById("description").innerText = product.description;
    document.getElementById("price").innerText = "$ " + product.price;
    document.getElementById("availability").innerText = product.available ? "In Stock" : "Out of Stock";
    let details=document.getElementById("details");
    details.innerHTML=`
    <li><b>Brand</b>: ${product.brand}</li>
    <li><b>Category</b>: ${product.category}</li>
    <li><b>Rating</b>: ${product.rating}</li>
    <li><b>Stock</b>: ${product.stock}</li>        
    <li><b>Discount</b>: ${product.discountPercentage}%</li>
    <li><b>SKU:</b> ${product.sku}</li>
    <li><b>Weight:</b> ${product.weight} kg</li>
    <li><b>Warranty:</b> ${product.warrantyInformation}</li>
    <li><b>Return Policy:</b> ${product.returnPolicy}</li>
    <li><b>Shipping Information:</b> ${product.shippingInformation}</li>
    <li><b>Minimum Order Quantity:</b> ${product.minimumOrderQuantity}</li>
    `;
    // saveToHistory(product)
    // productCard.addEventListener("click", () => {
    // saveToHistory(product);
    // window.location.href = `product_details.html?id=${product.id}`;
    
// });
    if (!fromHistory) {
      saveToHistory(product);
    }

    })
    .catch(err => {
    console.log("Error fetching product data:", err);

})
