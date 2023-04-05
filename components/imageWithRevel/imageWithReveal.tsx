import React, {useRef, useEffect} from 'react';
import style from "./imageWirhReveal.module.scss"
import Image from "next/image";
import {gsap} from "gsap"

type ImageWithRevealProps = {
    src: string,
    alt: string
}

const ImageWithReveal = ({src, alt}: ImageWithRevealProps) => {

    const tl = useRef<GSAPTimeline>()
    const itemRef = useRef<HTMLDivElement>(null)
    const imageWrapperRef = useRef<HTMLDivElement>(null)

    const imageWrapperBounds = imageWrapperRef.current?.getBoundingClientRect()
    const itemBounds = itemRef.current?.getBoundingClientRect()

    const useIsomorphicEffectPatched = typeof document !== 'undefined' ? React.useLayoutEffect : React.useEffect;

    useIsomorphicEffectPatched(() => {
        let ctx = gsap.context(() => {
            tl.current && tl.current.progress(0).kill()
            tl.current = gsap.timeline()
                .set("#item", {autoAlpha: 1})
                .from("#inner_element", {
                    delay: 1,
                    duration: 0.85,
                    xPercent: 25,
                    yPercent: 125,
                    stagger: 0.095,
                    skewY: gsap.utils.wrap([-8, 8]),
                    ease: "expo.out"
                })
                .set("#item", {pointerEvents: "all"})

            gsap.defaults({duration: 0.55, ease: "expo.out"})
        })

        return () => ctx.revert()
        }, [])

    useEffect(() => {
        tl.current?.play()
    }, [])

    const handleOnMouseEnterEvent = () => {
        gsap.set(imageWrapperRef.current, {
            scale: 0.8,
            xPercent: 25,
            yPercent: 50,
            rotation: -15,
        })
        gsap.to(imageWrapperRef.current, {
            opacity: 1,
            scale: 1,
            yPercent: 0,
            rotation: 0
        })
    }

    const handleOnMouseLeaveEvent = () => {
        gsap.to(imageWrapperRef.current, {
            opacity: 0,
            yPercent: -50,
            xPercent: 25,
            scale: 0.8,
            rotation: -15
        })
    }

    type EventProps = {
        clientX: number,
        clientY: number
    }

    const handleOnMouseMoveEvent = ({clientX, clientY}: EventProps) => {
        if (itemBounds && imageWrapperBounds) {
            gsap.to(imageWrapperRef.current, {
                duration: 1.25,
                x: Math.abs(clientX - itemBounds.left) - imageWrapperBounds.width / 1.55,
                y: Math.abs(clientY - itemBounds.top) - imageWrapperBounds.height / 2,
            })
        }
    }


    return (
        <div className={style.item}
             id="item"
             ref={itemRef}
             onMouseEnter={handleOnMouseEnterEvent}
             onMouseLeave={handleOnMouseLeaveEvent}
             onMouseMove={handleOnMouseMoveEvent}
        >
            <div className={style.itemImageWrapper} id="item_image-wrapper" ref={imageWrapperRef}>
                <div className={style.itemImageInner} id="item_image-inner">
                    <Image src={src} alt={alt} className={style.itemImage} width={300} height={300} />
                </div>
            </div>
            <div className={style.itemElement} id="item_element">
                <span className={style.innerElement} id="inner_element">
                    <Image src={src} alt={alt} width={50} height={50} />
                </span>
            </div>
        </div>
    );
};

export default ImageWithReveal;
