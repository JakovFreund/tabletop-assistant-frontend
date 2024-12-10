import Card from "./Card";
import './ui.scss';

interface CardButtonProps {
    className?: string;
    onClick: any;
    children: React.ReactNode;
}

const CardButton = (props: CardButtonProps) => {
    return (
        <Card className={props.className ? "card-button " + props.className : "card-button"} onClick={props.onClick}>
            {props.children}
        </Card>

    )
}

export default CardButton
