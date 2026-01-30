let products=[]
let container=document.getElementById("main");
fetch("https://dummyjson.com/products")
    .then(response=> response.json()) 
    .then(data=>{ 
        products=data.products;
        display(products);
    })
    .catch(error=>{
        console.log("Error: ",error);
    });

function display(products){
            container.innerHTML="";
            if(products.length==0){
                container.innerHTML="<h2>No product available<h2>";
                return;
            }
            products.forEach(product => {
            let card=document.createElement("div");
            card.className="card";
            let img=document.createElement("img")
            img.src=product.thumbnail;
            let name=document.createElement("h3")
            name.textContent=product.title;
            let price=document.createElement("p")
            price.textContent="$ "+product.price
            card.appendChild(img);
            card.appendChild(name);
            card.appendChild(price);
            container.appendChild(card);
        });
}
// by using button
let btn=document.getElementById("btn")
btn.addEventListener("click",()=>{
    // save to local storage
    let val=document.getElementById("box").value.trim().toLowerCase();
    let filterProducts=products.filter((product)=>{
        return product.title.toLowerCase().includes(val);
    },0)
    if(val==="")  return;
    let history=JSON.parse(localStorage.getItem("searchHistory")) || [];
    let exists = history.some(item => item.query === val);
    if(!exists){
        history.push({
            query:val,
            time:Date.now()
        });
        localStorage.setItem("searchHistory",JSON.stringify(history));  
    }
    display(filterProducts);
})
// by using input
// document.getElementById("box").addEventListener("input",(e)=>{
//     let val=e.target.value.toLowerCase();
//     let filterProducts=products.filter((product)=>{
//        return product.title.toLowerCase().includes(val);
//     },0)
//     display(filterProducts);
// })

const suggestionBox=document.getElementById("suggestion")
let search=document.getElementById("box")
search.addEventListener("input",()=>{
    console.log("suggestion working");
    const text=search.value.toLowerCase();
    const history=JSON.parse(localStorage.getItem("searchHistory")) || [];
    if (text === "") {
    suggestionBox.innerHTML = "";
    return;
    }
    const matches=history.filter(item=>
        item.query.toLowerCase().includes(text)
    )
    suggestionBox.innerHTML="";
    matches.forEach(item=>{
        const div=document.createElement("div");
        div.className="suggestion-item";
        div.innerText=item.query
        div.addEventListener("click", () => {
            search.value = item.query;
            btn.click();          // reuse search logic
            suggestionBox.innerHTML = "";
        });
    })
})
