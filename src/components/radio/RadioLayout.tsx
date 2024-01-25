import './radio.css';

interface RadioLayout {
    titleLabel: string;
    option: Array<{
        label: string;
        nameAndId: string;
        value: string;
    }>;
    onChange: (value: React.ChangeEvent<HTMLInputElement>) => void;
}

const RadioLayout = (props: RadioLayout) => {
    return (
        <div className="radio-layout">
            <label className="title-label" htmlFor="">
                {props.titleLabel}
            </label>
            <div className="gender-wrap">
                {props.option.map((option) => (
                    <div className="gender-element">
                        <p>{option.label}</p>
                        <input
                            type="radio"
                            name={option.nameAndId}
                            id={option.nameAndId}
                            value={option.value}
                            onChange={props.onChange}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RadioLayout;
