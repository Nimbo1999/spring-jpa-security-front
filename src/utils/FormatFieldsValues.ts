class FormatFieldsValues {
    public static cpf(value:string) {
        return value.replace(/\D/g, '')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(.\d{3})(\d)/, '$1.$2')
            .replace(/(.\d{3})(\d)/, '$1-$2')
            .replace(/(-\d{2})(\d)+?$/, '$1');
    }
    public static postalCode(value:string) {
        return value.replace(/\D/g, '')
            .replace(/(\d{5})(\d)/, '$1-$2')
            .replace(/(-\d{3})\d+?$/, '$1');
    }

    public static phones(value:string) {
        return value.replace(/\D/g, '')
            .replace(/(\d{2})(\d)/, '($1) $2')
            .replace(/(\d{4})(\d)/, '$1-$2')
            .replace(/(\d{4})-(\d)(\d{4})/, '$1$2-$3')
            .replace(/(-\d{4})\d+?$/, '$1');
    }

    public static customerName(value:string) {
        return value;
    }

    public static city(value:string) {
        return value;
    }

    public static neighborhood(value:string) {
        return value;
    }

    public static publicPlace(value:string) {
        return value;
    }

    public static uf(value:string) {
        return value;
    }

    public static complement(value:string) {
        return value;
    }

    public static emails(value:string) {
        return value;
    }
}

export type Fields = 'cpf' |
    'postalCode' |
    'phoneNumber' |
    'customerName' |
    'city' |
    'neighborhood' |
    'publicPlace' |
    'uf' |
    'complement' |
    'email';

export default FormatFieldsValues;
