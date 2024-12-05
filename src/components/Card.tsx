
import '../styles/Card.scss';

interface CardProps {
    className?: string;
    onClick?: any;
    children: React.ReactNode;
}

const Card = (props: CardProps) => {
    return (
        <div className={props.className ? "card "+props.className : "card"} onClick={props.onClick}>
            {props.children}
        </div>
    )
}

export default Card
