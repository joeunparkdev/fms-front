import './radio.css';

interface RadioLayout {
    titleLabel: string;
    option: Array<{
        label: string;
        nameAndId: string;
        value: string;
    }>;
}

const RadioLayout = (props: RadioLayout) => {
    return (
        <div>
            <label htmlFor="">{props.titleLabel}</label>
            <div className="gender-wrap">
                {props.option.map((option) => (
                    <div className="gender-element">
                        <p>{option.label}</p>
                        <input type="radio" name={option.nameAndId} id={option.nameAndId} value={option.value} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RadioLayout;
