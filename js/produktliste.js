const container = document.querySelector("#products")

async function getData() {
    const response = await fetch(`https://kea-alt-del.dk/t7/api/products`)
        .then((res) => res.json())
        .then(showProducts)
        
    function showProducts(data) {
        //console.log(data);
        let markup = ""
        data.forEach(product => {
            console.log(product)

            if (product.discount) {
                markup += `
                    <div class="product">
                        <div class="img">
                            <img class=""  src="https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp" alt="placeholder image">
                            ${product.soldout ? "<div class='overlay'> <p> sold out </p> </div>" : ""}
                        </div>

                        <div class="product-details">
                            <div>
                                <p class="product-header">${product.productdisplayname}</p>

                                <p class="product-cat-brand"><span class="product-category">${product.articletype}</span> / <span class="product-brand">${product.brandname}</span></p>
                            </div>

                            <div>
                                <div class="product-pricing">
                                    <p class="product-cost">
                                        <span class="prev-cost">Prev DKK ${product.price},-</span>
                                        <span class="now-cost">Now DKK ${Math.round(product.price - (product.price * (product.discount / 100))) },-</span>
                                    </p>

                                    <p class="product-discount">${product.discount}%</p>
                                </div>
                                <a href="produkt.html?id=${product.id}">Read More</a>
                            </div>
                        </div>
                    </div>

                `
            } else {
                markup += `
                    <div class="product">
                        <div class="img">
                            <img class="" src="https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp" alt="placeholder image">
                             ${product.soldout ? "<div class='overlay'> <p> sold out </p> </div>" : ""}
                        </div>

                        <div class="product-details">
                            <div>
                                <p class="product-header">${product.productdisplayname}</p>

                                <p class="product-cat-brand"><span class="product-category">${product.articletype}</span> / <span class="product-brand">${product.brandname}</span></p>
                            </div>

                            <div>
                                <div class="product-pricing">
                                    <p class="product-cost">
                                   
                                        <span class="current-cost">DKK ${product.price},-</span>
                                    </p>

                                    <p class="product-discount"></p>
                                </div>
                                <a href="produkt.html?id=${product.id}">Read More</a>
                            </div>
                        </div>
                    </div>

                `
            }
           
        });
        container.innerHTML += markup
    }

}   

getData()