import Email from '../../models/Email';

export interface AddEmailComponentProps {
    onConfirmEmail: (email: Email) => void;
    onRemoveEmail: (email: string) => void;
    emailList: Email[];
    canAddContent: boolean;
}