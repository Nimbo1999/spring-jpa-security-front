type LoaderSizes = 'small' | 'default' | 'large';
type LoaderColors = 'primary' | 'white';

export interface LoaderProps {
    size?: LoaderSizes;
    color?: LoaderColors;
}