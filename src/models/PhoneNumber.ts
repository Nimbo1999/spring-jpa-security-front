type PhoneType = 'RESIDENTIAL' | 'COMMERCIAL' | 'CELL_PHONE';

interface PhoneNumber {
    id: number;
    number: string;
    type: PhoneType;
}

export default PhoneNumber;
