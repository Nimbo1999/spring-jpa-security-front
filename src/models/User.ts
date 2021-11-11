type Authoriy = 'ALL' | 'READ';

interface User {
    id: number;
    username: string;
    authorities: Authoriy[];
}

export default User;
