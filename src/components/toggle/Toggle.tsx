import { Form } from 'react-bootstrap';

interface ToggleType {
    label: string;
}

const Toggle = (props: ToggleType) => {
    return (
        <Form.Check // prettier-ignore
            type="switch"
            id="custom-switch"
            label={props.label}
        />
    );
};

export default Toggle;
