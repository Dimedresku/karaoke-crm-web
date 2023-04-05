import React from 'react';
import {Tooltip, TooltipProps, tooltipClasses} from "@mui/material";
import Image from "next/image";
import style from "./imageWithTooltip.module.scss"
import { styled } from '@mui/material/styles';

type ImageWithTooltipProps = {
    imageSrc: string,
    alt: string
}

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: '#f5f5f9',
        color: 'rgba(0, 0, 0, 0.87)',
        padding: 1,
        maxWidth: 310,
        maxHeight: 310,
        border: '1px solid #dadde9',
    },
}));

const ImageWithTooltip = ({imageSrc, alt}: ImageWithTooltipProps) => {
    return (
        <HtmlTooltip placement="left"
            title={
            <div className={style.TooltipWrapper}>
                <Image src={imageSrc} alt={alt} width={300} height={300} />
            </div>
        }
        >
            <Image src={imageSrc} alt={alt} height={100} width={100} />
        </HtmlTooltip>
    );
};

export default ImageWithTooltip;
