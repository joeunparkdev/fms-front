import { Form } from 'react-bootstrap';
import './toggle.css';
import { useState } from 'react';

interface ToggleType {
    label: string;
    onToggle: (value: boolean) => void;
}

const Toggle = (props: ToggleType) => {
    const [isToggle, setIsToggle] = useState(false);

    const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsToggle(e.target.checked);
        props.onToggle(e.target.checked);
    };

    return (
        <div className="custom-switch">
            <Form.Check // prettier-ignore
                type="switch"
                id="custom-switch"
                label={props.label}
                checked={isToggle}
                onChange={handleToggle}
            />
        </div>
    );
};

export default Toggle;
