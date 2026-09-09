export interface HttpResponse {
  statusCode: number
  body: any
}

export const statusOK = (data: any): HttpResponse => {
  return {
    statusCode: 200,
    body: data
  }
}

export const statusCreated = (): HttpResponse => {
  return {
    statusCode: 201,
    body: {
      message: "created"
    }
  }
}

export const statusNoContent = (): HttpResponse => {
  return {
    statusCode: 204,
    body: null
  }
}

export const statusBadRequest = (error: string): HttpResponse => {
  return {
    statusCode: 400,
    body: { error }
  }
}

export const statusUnauthorized = (): HttpResponse => {
  return {
    statusCode: 401,
    body: null
  }
}

export const statusNotFound = (error: string): HttpResponse => {
  return {
    statusCode: 404,
    body: { error }
  }
}

export const statusInternalError = (error: string): HttpResponse => {
  return {
    statusCode: 500,
    body: { error }
  }
}