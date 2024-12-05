
interface ImageProps {
    src: string;
    alt: string;
    //width?: string;
    //height?: string;
}

const Image = (props: ImageProps) => {
    return (
        <img className="Image" src={props.src} alt={props.alt} />
    )
}

export default Image
