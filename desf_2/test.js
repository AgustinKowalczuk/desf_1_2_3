import { ProductManager } from "./desf_2.js"

async function test() {
    let PM1 = new ProductManager('./db/products.json')
    await PM1.getProducts()
    await PM1.addProduct({
        title: 'title1',
        price: 2200,
        thumbnail: 'url',
        description: 'description1',
        code: 'abc123'
    })
    await PM1.addProduct({
        title: 'title2',
        price: 2200,
        thumbnail: 'url',
        description: 'description2',
        code: 'abc1234'
    })
    await PM1.getProducts()
    await PM1.getProductsById(0)
    await PM1.getProductsById(7)
}

test()