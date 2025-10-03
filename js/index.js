const container = document.querySelector("#main-container")

let categories = document.createElement("section")
categories.id = "categories"


async function getData() {
    const response = await fetch(`https://kea-alt-del.dk/t7/api/categories`)
        .then((res) => res.json())
        .then(showCategories)
}

function showCategories(data) {
        let markup = ""
        data.forEach(category => {
            console.log(category.category)
            markup += `
                <div class="category">
                    <a href="produktliste.html?category=${category.category}">

                        <p>${category.category}</p>
                    </a>
                </div>
            `
        })
        categories.innerHTML = markup
    }
    container.appendChild(categories)

getData()