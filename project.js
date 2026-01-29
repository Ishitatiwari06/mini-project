fetch("https://dummyjson.com/products")
    .then(response=> response.json()) 
    .then(data=>{ 
        let products=data.products;
        let container=document.getElementById("main");
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
    })
    .catch(error=>{
        console.log("Error: ",error);
    });