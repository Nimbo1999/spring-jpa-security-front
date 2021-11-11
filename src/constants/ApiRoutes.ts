const API_ROUTES = {
    BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
    V1: '/v1',
    AUTH: '/auth',
    CUSTOMER: '/customer',
    THIRD_PARTY: {
        VIACEP_URL: (cep: string) => `https://viacep.com.br/ws/${cep}/json/`
    },
    QUERY_PARAMS: (params: object) => Object.keys(params)
        .map((key, index) => index === 0 ? `?${key}=${params[key]}` : `&${key}=${params[key]}`)
        .join(''),
    PARAM_URL: (param: string) => `/${param}`
}

export default API_ROUTES;
