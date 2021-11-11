export interface AddEmailComponentProps {
    onConfirmEmail: (email: string) => void,
    onRemoveEmail: (email: string) => void,
    emailList: string[]
}