import { Request, Response } from "express"
import { HttpResponse } from "../utils/http-helper"
import { getProductsListService, getProductService, postProductService, deleteProductService, updateProductService } from "../services/products-service"
import { ProductModel } from "../models/product-model"

export const getProductsList = async (req: Request, res: Response) => {
    const response: HttpResponse = await getProductsListService()

    return res.status(response.statusCode).json(response.body)
}

export const getProductById = async (req: Request<{ id: string }>, res: Response) => {
    const id = parseInt(req.params.id)
    const response: HttpResponse = await getProductService(id)

    return res.status(response.statusCode).json(response.body)
}

export const postProduct = async (req: Request<{ body: ProductModel }>, res: Response) => {
    const product = req.body
    const response: HttpResponse = await postProductService(product)

    return res.status(response.statusCode).json(response.body)
}

export const deleteProduct = async (req: Request<{ id: string }>, res: Response) => {
    const id = parseInt(req.params.id)
    const response: HttpResponse = await deleteProductService(id)

    return res.status(response.statusCode).json(response.body)
}

export const updateProductById = async (req: Request<{ id: string, body: ProductModel }>, res: Response) => {
    const id = parseInt(req.params.id)
    const newProduct = req.body
    const response: HttpResponse = await updateProductService(id, newProduct)

    return res.status(response.statusCode).json(response.body)
}