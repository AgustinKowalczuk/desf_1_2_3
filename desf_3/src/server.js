import express from 'express';
import { ProductManager } from '../../desf_2/desf_2.js'
import path from 'path'

const server = express();
const PORT = 8080;
const __dirname = import.meta.dirname
const productManager = new ProductManager(path.join(__dirname, '/db/products.json'))

server.use(express.json())
server.use(express.urlencoded({ extended: true }))

server.get('/products', async (req, res) => {
    let { limit } = req.query
    let allProducts = await productManager.getProducts();
    console.log({ limit })
    if (!limit) {
        res.status(200).json({ msj: "todos los productos", data: allProducts })
        return;
    } else {
        let allProductsLimit = allProducts.slice(0, limit)
        res.status(200).json({ msj: `productos con limite de: ${limit}`, data: allProductsLimit })
        return;
    }
})
server.get('/products/:pid', async (req, res) => {
    let { pid } = req.params
    let prodctPID = await productManager.getProductsById(pid)
    prodctPID == 'not found' ? res.status(200).json({ msj: `el producto con id "${pid}" no fue encontrado` }) : res.status(200).json({ msj: `productos con limite de: ${pid}`, data: prodctPID })
    return;
})

server.listen(PORT, () => {
    console.log(`Server listen on port: http://localhost:${PORT}/`)
})
