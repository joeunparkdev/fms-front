import { Form } from 'react-bootstrap';

interface InputBoxType {
    inputLabel: string;
}

const InputBox = (props: InputBoxType) => {
    return (
        <Form.Group className="mb-3 input-group-div" controlId="exampleForm.ControlInput1">
            <Form.Label>{props.inputLabel}</Form.Label>
            <Form.Control type="text" placeholder="" />
        </Form.Group>
    );
};

export default InputBox;
