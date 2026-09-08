interface Response {
  statusCode: number
  body: any
}

export const statusOK = (data: any): Response => {
  return {
    statusCode: 200,
    body: data
  }
}

export const statusCreated = (): Response => {
  return {
    statusCode: 201,
    body: {
      message: "sucessful"
    }
  }
}

export const statusNoContent = (): Response => {
  return {
    statusCode: 204,
    body: null
  }
}

export const statusBadRequest = (): Response => {
  return {
    statusCode: 400,
    body: null
  }
}

export const statusUnauthorized = (): Response => {
  return {
    statusCode: 401,
    body: null
  }
}

export const statusNotFound = (): Response => {
  return {
    statusCode: 404,
    body: null
  }
}

export const statusInternalError = (): Response => {
  return {
    statusCode: 500,
    body: null
  }
}