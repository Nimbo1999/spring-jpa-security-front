class HttpRequestError extends Error {
    constructor(readonly message: string, readonly status: number) {
        super(message);
        this.name = HttpRequestError.name;
    }
}

export default HttpRequestError;
