let products=[]
let container=document.getElementById("main");

let filteredProducts = [];
let currentPage = 1;
const itemsPerPage = 6;


fetch("https://dummyjson.com/products")
    .then(response=> response.json()) 
    .then(data=>{ 
        products=data.products;
        filteredProducts = products;
        renderPage(currentPage);

    })
    .catch(error=>{
        console.log("Error: ",error);
    });

function renderPage(page) {
    container.innerHTML = "";

    if (filteredProducts.length === 0) {
        container.innerHTML = "<h2>No product available</h2>";
        return;
    }

    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const pageItems = filteredProducts.slice(start, end);

    pageItems.forEach(product => {
        let card = document.createElement("div");
        card.className = "card";

        let img = document.createElement("img");
        img.src = product.thumbnail;

        let name = document.createElement("h3");
        name.textContent = product.title;

        let price = document.createElement("p");
        price.textContent = "$ " + product.price;

        card.append(img, name, price);
        container.appendChild(card);

        card.addEventListener("click", () => {
            window.location.href = `product_details.html?id=${product.id}`;
        });
    });

    updatePagination();
}
function updatePagination() {
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

    document.getElementById("pagination-indicator").innerText =
        `Page ${currentPage} of ${totalPages}`;

    document.getElementById("pagination-prev").disabled = currentPage === 1;
    document.getElementById("pagination-next").disabled = currentPage === totalPages;
}

document.getElementById("pagination-prev").addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        renderPage(currentPage);
    }
});

document.getElementById("pagination-next").addEventListener("click", () => {
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        renderPage(currentPage);
    }
});

// by using button
let btn = document.getElementById("btn");

btn.addEventListener("click", () => {
    let val = document.getElementById("box").value.trim().toLowerCase();
    if (val === "") return;

    filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(val)
    );

    // save search history
    let history = JSON.parse(localStorage.getItem("searchHistory")) || [];
    if (!history.some(item => item.query === val)) {
        history.push({ query: val, time: Date.now() });
        localStorage.setItem("searchHistory", JSON.stringify(history));
    }

    currentPage = 1;
    renderPage(currentPage);
});

// by using input
// document.getElementById("box").addEventListener("input",(e)=>{
//     let val=e.target.value.toLowerCase();
//     let filterProducts=products.filter((product)=>{
//        return product.title.toLowerCase().includes(val);
//     },0)
//     display(filterProducts);
// })

// const suggestionBox=document.getElementById("suggestion")
// let search=document.getElementById("box")
// search.addEventListener("input",()=>{
//     console.log("suggestion working");
//     const text=search.value.toLowerCase();
//     const history=JSON.parse(localStorage.getItem("searchHistory")) || [];
//     if (text === "") {
//     suggestionBox.innerHTML = "";
//     return;
//     }
//     const matches=history.filter(item=>
//         item.query.toLowerCase().includes(text)
//     )
//     suggestionBox.innerHTML="";
//     matches.forEach(item=>{
//         const div=document.createElement("div");
//         div.className="suggestion-item";
//         div.innerText=item.query
//         div.addEventListener("click", () => {
//             search.value = item.query;
//             btn.click();          // reuse search logic
//             suggestionBox.innerHTML = "";
//             suggestionBox.appendChild(div)
//         });
//     })
// })
