import { ProductModel } from "../models/product-model";
import { getAllProducts, getProductById, postProductData, deleteProductData, updateProductData } from "../repositories/procutsData";
import { statusBadRequest, statusCreated, statusInternalError, statusNoContent, statusNotFound, statusOK } from "../utils/http-helper";


export const getProductsListService = async () => {
    const response = await getAllProducts()

    if (response.length === 0) return statusNoContent()

    return statusOK(response);
}

export const getProductService = async (id: number) => {
    if (!id) return statusBadRequest("ID inválido")

    const response = await getProductById(id)

    if (!response) return statusNotFound("Produto não encontrado")

    return statusOK(response);
}

export const postProductService = async (product: ProductModel) => {
    const productExists = (await getProductById(product.id))?.id === product.id || false

    if (!product.id || productExists) {
        const id = (await getAllProducts()).length + 1
        if (productExists) return statusBadRequest(`Esse id já existe, id disponível: ${id}`)
    }

    const status: boolean = await postProductData(product)

    const createdProduct = (await getProductById(product.id))?.id === product.id
    if (!status || !createdProduct) return statusBadRequest("Erro ao criar produto")

    return statusCreated()
}

export const deleteProductService = async (id: number) => {
    if (!id) return statusBadRequest("ID não informado")
    
    const product = await getProductById(id)
    if (!product) return statusNotFound("Produto não encontrado")

    const status: boolean = await deleteProductData(id)

    if (!status) return statusBadRequest("Erro ao deletar produto")

    return statusOK("Produto deletado com sucesso")
}

export const updateProductService = async (id: number, newProduct: ProductModel) => {
    if (!id) return statusBadRequest("ID não informado")

    const product = await getProductById(id)
    if (!product) return statusNotFound("Produto não encontrado")
    
    if (id !== newProduct.id) return statusBadRequest("ID inválido")
    if (JSON.stringify(newProduct) === JSON.stringify(product)) return statusBadRequest("Dados iguais")

    const response: boolean = await updateProductData(id, newProduct)
    if (!response) return statusInternalError("Erro ao atualizar produto")

    return statusOK("Produto atualizado com sucesso")
}