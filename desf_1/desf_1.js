class ProductManager {
    static idCounter = 0;

    constructor() {
        this.products = []
    }

    //Metodo > recibe > retorna / muestra

    //muestra de productos > () > retorna: todosLosProductos
    getProducts() {
        return this.products
    }

    //muestra el producto con el id enviado > (id:Number) > retorna: ProductoConElMismoId
    getProductById(id) {
        let search = this.products.find(prod => prod.id == id)
        return search ? search : 'not found'
    }

    //Metodo > recibe > retorna / muestra
    addProduct(newProd) {
        //configuracion de las propiedades que acepta: validacion
        if(!this.validatedProd(newProd)) return 'Todos los campos son requeridos!...'
        //verifica que no se repita el codigo de los productos
        if (this.products.some(prod => prod.code == newProd.code)) return 'Code already exist...'
        
        newProd.id = ProductManager.idCounter++
        this.products.push(newProd)
        return newProd
    }

    validatedProd(prod) {
        // true si los campos estan vacios, false si estan cargados
        return (
            !prod.code ||
            !prod.price ||
            !prod.stock ||
            !prod.tiitle ||
            !prod.thumbnail ||
            !prod.description 
        )
    }
}

const pm1 = new ProductManager()

console.log(pm1.getProducts())
console.log(pm1.addProduct({
    title: 'title1',
    price: 2200,
    thumbnail: 'url',
    description: 'description1',
    code: 'abc123'
}))
console.log(pm1.addProduct({
    title: 'title1',
    price: 2200,
    thumbnail: 'url',
    description: 'description1',
    code: 'abc123'
}))
console.log(pm1.addProduct({
    title: 'title2',
    price: 2200,
    description: 'description2',
    code: 'abc1234'
}))
console.log(pm1.addProduct({
    title: 'title2',
    price: 2200,
    thumbnail: 'url2',
    description: 'description2',
    code: 'abc1234'
}))
console.log(pm1.getProducts())
console.log(pm1.getProductById(3))
console.log(pm1.getProductById(0))

