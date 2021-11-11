import { FC } from 'react';

import type { IconProps } from './Icon.types'; 

const AddCircle: FC<IconProps> = ({ width = 16, height = 16, color= 'white' }) => (
    <svg width={width} height={height} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M18 10C18 12.1217 17.1571 14.1566 15.6569 15.6569C14.1566 17.1571 12.1217 18 10 18C7.87827 18 5.84344 17.1571 4.34315 15.6569C2.84285 14.1566 2 12.1217 2 10C2 7.87827 2.84285 5.84344 4.34315 4.34315C5.84344 2.84285 7.87827 2 10 2C12.1217 2 14.1566 2.84285 15.6569 4.34315C17.1571 5.84344 18 7.87827 18 10V10ZM6 10C6 10.1326 6.05268 10.2598 6.14645 10.3536C6.24021 10.4473 6.36739 10.5 6.5 10.5H9.5V13.5C9.5 13.6326 9.55268 13.7598 9.64645 13.8536C9.74021 13.9473 9.86739 14 10 14C10.1326 14 10.2598 13.9473 10.3536 13.8536C10.4473 13.7598 10.5 13.6326 10.5 13.5V10.5H13.5C13.6326 10.5 13.7598 10.4473 13.8536 10.3536C13.9473 10.2598 14 10.1326 14 10C14 9.86739 13.9473 9.74021 13.8536 9.64645C13.7598 9.55268 13.6326 9.5 13.5 9.5H10.5V6.5C10.5 6.36739 10.4473 6.24021 10.3536 6.14645C10.2598 6.05268 10.1326 6 10 6C9.86739 6 9.74021 6.05268 9.64645 6.14645C9.55268 6.24021 9.5 6.36739 9.5 6.5V9.5H6.5C6.36739 9.5 6.24021 9.55268 6.14645 9.64645C6.05268 9.74021 6 9.86739 6 10Z"
            fill={color}
        />
    </svg>
)

export default AddCircle;
