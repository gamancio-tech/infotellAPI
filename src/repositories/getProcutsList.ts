import fs from 'node:fs/promises';

const productsDataFile = "./data/productsData.json"

export const getAllProducts = async () => {
    const productsData = await fs.readFile(productsDataFile, "utf-8")

    return JSON.parse(productsData)
}