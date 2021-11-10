interface Address {
    id: number,
    postalCode: string,
    publicPlace: string,
    neighborhood: string,
    city: string,
    uf: string,
    complement?: string
}

export default Address;
