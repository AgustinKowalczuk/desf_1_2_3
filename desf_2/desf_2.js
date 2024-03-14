import fs from "fs";

export class ProductManager {
    static idCounter = 0;
    constructor(file) {
        this.file = file;
        this.setIdCounter();
    }

    async getProducts() {
        try {
            let lectura = JSON.parse(await fs.promises.readFile(this.file, 'utf-8'))
            return lectura
        } catch (error) {
            console.log({ error })
        }
    }

    async addProduct(newProd) {
        try {
            let prod = await this.getProducts()
            if (!this.validatedProd(newProd)) return 'Todos los campos son requeridos!...'
            //verifica que no se repita el codigo de los productos
            if (prod.some(prod => prod.code == newProd.code)) return 'Code already exist...'

            newProd.id = ProductManager.idCounter++
            prod.push(newProd)
            await fs.promises.writeFile(this.file, JSON.stringify(prod, null, '\t'))
            console.log('Producto agregado con exito!...', { newProd })
        } catch (error) {
            console.log({ error })
        }
    }

    async getProductsById(id) {
        try {
            let products= await this.getProducts()
            let search = products.find(prod => prod.id == id)
            // console.log({search:search ? search : 'not found'})
            return search ? search : 'not found'
        } catch (error) {
            console.log({ error })
        }
    }

    async setIdCounter() {
        let prod = await this.getProducts()
        if (prod.length != 0) {
            ProductManager.idCounter = prod[prod.length - 1].id;
            console.log('id counter seteado:', prod[prod.length - 1].id + 1)
        } else {
            ProductManager.idCounter = 0;
        }
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
