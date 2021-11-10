interface FieldError {
    field: string;
    messages: string[];
}

export interface FormErrors {
    errors: FieldError[]
}

interface Forbidden {
    timestamp: string,
    status: 403,
    error: 'Forbidden',
    message: 'Forbidden',
    path: string
}

export interface HttpRequestErrorContent {
    status: number;
    content: FormErrors | Forbidden;
}

class HttpRequestError extends Error {
    constructor(readonly message: string, readonly payload?: HttpRequestErrorContent) {
        super(message);
        this.name = HttpRequestError.name;
    }
}

export default HttpRequestError;
