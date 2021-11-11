import { FC } from 'react';

import type { IconProps } from './Icon.types'; 

const Arrow: FC<IconProps> = ({ width = 16, height = 16, color= 'white' }) => (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M22.5 12C22.5 6.201 17.799 1.5 12 1.5C6.201 1.5 1.5 6.201 1.5 12C1.5 17.799 6.201 22.5 12 22.5C17.799 22.5 22.5 17.799 22.5 12ZM12.5303 6.96975C12.6709 7.1104 12.7498 7.30113 12.7498 7.5C12.7498 7.69887 12.6709 7.8896 12.5303 8.03025L9.3105 11.25H16.5C16.6989 11.25 16.8897 11.329 17.0303 11.4697C17.171 11.6103 17.25 11.8011 17.25 12C17.25 12.1989 17.171 12.3897 17.0303 12.5303C16.8897 12.671 16.6989 12.75 16.5 12.75H9.3105L12.5303 15.9697C12.6669 16.1112 12.7425 16.3007 12.7408 16.4973C12.739 16.6939 12.6602 16.8821 12.5211 17.0211C12.3821 17.1602 12.1939 17.239 11.9973 17.2408C11.8007 17.2425 11.6112 17.1669 11.4698 17.0303L6.96975 12.5303C6.82915 12.3896 6.75016 12.1989 6.75016 12C6.75016 11.8011 6.82915 11.6104 6.96975 11.4698L11.4698 6.96975C11.6104 6.82915 11.8011 6.75016 12 6.75016C12.1989 6.75016 12.3896 6.82915 12.5303 6.96975V6.96975Z"
            fill={color}
        />
    </svg>
);

export default Arrow;
