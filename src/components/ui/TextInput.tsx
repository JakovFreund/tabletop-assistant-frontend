import './ui.scss';

interface TextInputProps {
    value: string;
    placeholder: string;
    onChange: any;
}

const TextInput = (props: TextInputProps) => {
    return (
        <input
            type="text"
            value={props.value}
            onChange={props.onChange}
            placeholder={props.placeholder}
        />
    )
}

export default TextInput
