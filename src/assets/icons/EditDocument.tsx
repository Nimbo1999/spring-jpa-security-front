import { FC } from 'react';

import type { IconProps } from './Icon.types'; 

const EditDocument: FC<IconProps> = ({ width = 16, height = 16, color= 'white' }) => (
    <svg width={width} height={height} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M8 1V4.5C8 4.89748 8.15776 5.27871 8.43863 5.55995C8.7195 5.8412 9.10052 5.99947 9.498 6H12.998V7.035C12.4787 7.12493 12 7.37369 11.628 7.747L7.341 12.034C6.85671 12.5181 6.51312 13.1247 6.347 13.789L6.045 14.998H4.5C4.10218 14.998 3.72064 14.84 3.43934 14.5587C3.15804 14.2774 3 13.8958 3 13.498V2.5C3 2.10218 3.15804 1.72064 3.43934 1.43934C3.72064 1.15804 4.10218 1 4.5 1H8ZM12.998 8.06C12.756 8.131 12.528 8.263 12.336 8.454L8.05 12.74C7.69429 13.0959 7.44196 13.5418 7.32 14.03L7.017 15.241C6.99152 15.343 6.99286 15.4499 7.02088 15.5513C7.0489 15.6527 7.10265 15.7451 7.17691 15.8195C7.25118 15.894 7.34343 15.948 7.44472 15.9763C7.54601 16.0046 7.6529 16.0062 7.755 15.981L8.966 15.678C9.45422 15.5561 9.90011 15.3038 10.256 14.948L14.544 10.66C14.7897 10.4149 14.9466 10.0948 14.9899 9.75047C15.0332 9.40613 14.9604 9.05719 14.7832 8.75884C14.6059 8.46049 14.3342 8.22978 14.011 8.10321C13.6879 7.97664 13.3318 7.96143 12.999 8.06H12.998ZM8.998 1.25V4.5C8.998 4.63261 9.05068 4.75979 9.14445 4.85355C9.23821 4.94732 9.36539 5 9.498 5H12.748L8.998 1.25V1.25Z"
            fill={color}
        />
    </svg>
);

export default EditDocument;