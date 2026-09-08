import { getAllProducts } from "../repositories/getProcutsList";
import { statusNoContent, statusOK } from "../utils/http-helper";


export const getProductsListService = async () => {
    const response = await getAllProducts()

    if (response.length === 0) return statusNoContent()

    return statusOK(response);
}
