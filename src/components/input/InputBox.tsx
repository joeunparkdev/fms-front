import { Form } from 'react-bootstrap';

interface InputBoxType {
    inputLabel: string;
    name: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputBox = (props: InputBoxType) => {
    return (
        <Form.Group className="mb-3 input-group-div" controlId="exampleForm.ControlInput1">
            <Form.Label column>{props.inputLabel}</Form.Label>
            <Form.Control type="text" placeholder="" name={props.name} onChange={props.onChange} />
        </Form.Group>
    );
};

export default InputBox;
