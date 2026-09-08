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
      message: "sucessful"
    }
  }
}

export const statusNoContent = (): HttpResponse => {
  return {
    statusCode: 204,
    body: null
  }
}

export const statusBadRequest = (): HttpResponse => {
  return {
    statusCode: 400,
    body: null
  }
}

export const statusUnauthorized = (): HttpResponse => {
  return {
    statusCode: 401,
    body: null
  }
}

export const statusNotFound = (): HttpResponse => {
  return {
    statusCode: 404,
    body: null
  }
}

export const statusInternalError = (): HttpResponse => {
  return {
    statusCode: 500,
    body: null
  }
}