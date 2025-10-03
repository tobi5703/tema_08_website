const container = document.querySelector('main')

const queryString = new URLSearchParams(window.location.search);
const id = queryString.get("id")



async function getData() {
    const response = await fetch(`https://kea-alt-del.dk/t7/api/products/${id}`)
        .then((res) => res.json());
    
    const mainContainer = document.createElement("div")
    mainContainer.id = "main-container"

    mainContainer.appendChild(buildImage(response.id))
    mainContainer.appendChild(buildInfo(response.productdisplayname, response.basecolour, response.id, response.price, response.discount, response.brandname, response.brandbio))
    mainContainer.appendChild(buildBasket(response.productdisplayname, response.brandname ,response.articletype))


    container.appendChild(mainContainer)

}   

function buildImage(product_id) {

    
    //create the section
    const imageSection = document.createElement("section");
        imageSection.id = "image-container";
        imageSection.innerHTML = `
            <img src="https://kea-alt-del.dk/t7/images/webp/640/${product_id}.webp" alt="placeholder image">
        `

    return imageSection

}

function buildInfo(product_name, product_color, product_id, product_prise, product_discount, brand_name, brand_description) {
    console.log(brand_description + 'from buildInfo')

    //create the container section
    const productSection = document.createElement("section");
    productSection.id = "product-info"

    if (product_discount == null) {
        productSection.innerHTML = `
            <div>
                <h3>Product information</h3>

                <div id="product-specifics">
                    <div>
                        <h4>Model name</h4>
                        <p>${product_name}</p>
                    </div>
                    <div>
                        <h4>Color</h4>
                        <p>${product_color}</p>
                    </div>
                    <div>
                        <h4>Inventory Number</h4>
                        <p>${product_id}</p>
                    </div>
                    <div id="price-and-discount">
                        <div>
                        <h4>Price</h4>
                            <p id="base-price">${product_prise}</p>
                            
                        </div>
                        <div>
                            <h4>Percent off:</h4>
                        </div>
                    </div>
                </div>
            </div>

            <div id="brand-info">
                <h2>${brand_name}</h2>
                <p>${brand_description}</p>
            </div>
        `
    } else {
        productSection.innerHTML = `
            <div>
                <h3>Product information</h3>

                <div id="product-specifics">
                    <div>
                        <h4>Model name</h4>
                        <p>${product_name}</p>
                    </div>
                    <div>
                        <h4>Color</h4>
                        <p>${product_color}</p>
                    </div>
                    <div>
                        <h4>Inventory Number</h4>
                        <p>${product_id}</p>
                    </div>
                    <div id="price-and-discount">
                        <div>
                        <h4>Price</h4>
                            <p id="prev-price">Before: ${product_prise}</p>
                            <p id="new-price">After: ${product_prise - (product_prise * (product_discount / 100)) }</p>
                            
                        </div>
                        <div>
                            <h4>Percent off:</h4>
                            <p id="percent-off">${product_discount}%</p>
                        </div>
                    </div>
                </div>
            </div>

            <div id="brand-info">
                <h2>${brand_name}</h2>
                <p>${brand_description}</p>
            </div>
        `
    }

   

    return productSection
}

function buildBasket(product_name, product_producer, product_category) {
    const basketSection = document.createElement("section");
    basketSection.id = "add-to-basket"

    basketSection.innerHTML = `
        <h3>
            ${product_name}
        </h3>

        <p><span>${product_producer}</span> / <span>${product_category}</span></p>

        <div id="choose-size">
            <p>Choose a size</p>
            <select name="size" id="size">
                <option value="small">S</option>
                <option value="medium">M</option>
                <option value="large">L</option>
            </select>
        </div>

        <button>Add to basket</button>
    `

    return basketSection
}

getData()