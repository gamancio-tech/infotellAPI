import fs from 'node:fs/promises';
import { ProductModel } from '../models/product-model';

const productsDataFile = "./src/data/productsData.json"

export const getAllProducts = async () => {
    const productsData = await fs.readFile(productsDataFile, "utf-8")

    return JSON.parse(productsData)
}

export const getProductById = async (id: number) => {
    const productsData = await getAllProducts()
    const product = productsData.find((product: { id: number; }) => product.id === id)

    return product
}

export const postProductData = async (product: ProductModel) => {
    const productsData = await getAllProducts()
    productsData.push(product)
    await fs.writeFile(productsDataFile, JSON.stringify(productsData))

    return true
}

export const deleteProductData = async (id: number) => {
    const productsData = await getAllProducts()
    const product = productsData.find((product: { id: number; }) => product.id === id)
    productsData.splice(productsData.indexOf(product), 1)
    await fs.writeFile(productsDataFile, JSON.stringify(productsData))

    return true
}

export const updateProductData = async (id:number, product: ProductModel) => {
    const productsData: ProductModel[] = await getAllProducts()
    const productIndex = productsData.findIndex((product: { id: number; }) => product.id === id)
    productsData[productIndex] = product
    await fs.writeFile(productsDataFile, JSON.stringify(productsData))

    return true
}