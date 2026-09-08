import { Request, Response } from "express"
import { HttpResponse } from "../utils/http-helper"
import { getProductsListService } from "../services/getProducts-service"

export const getProductsList = async (req: Request, res: Response) => {
    const response: HttpResponse = await getProductsListService()

    return res.status(response.statusCode).json(response.body)
}