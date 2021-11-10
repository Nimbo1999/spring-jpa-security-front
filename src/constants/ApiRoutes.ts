const API_ROUTES = {
    BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
    V1: '/v1',
    AUTH: '/auth',
    CUSTOMER: '/customer',
    QUERY_PARAMS: (params: object) => Object.keys(params)
        .map((key, index) => index === 0 ? `?${key}=${params[key]}` : `&${key}=${params[key]}`)
        .join('')
}

export default API_ROUTES;
