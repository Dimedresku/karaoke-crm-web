import ImageWithReveal from "../components/imageWithRevel/imageWithReveal";

const getImageOrText = (record: any) => {
    if (record.image) {
        return <ImageWithReveal src={`${process.env.NEXT_PUBLIC_BACK_HOST}${record.image}`} alt={record.name} />
    } else {
        return <h3>No Image</h3>
    }
}

export {getImageOrText}
