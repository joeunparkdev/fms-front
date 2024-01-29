import './dl-text.css';

interface DlTextType {
    title: string;
    content: number | string;
    className?: string;
}

const DlText = (props: DlTextType) => {
    return (
        <dl className={props.className}>
            <dt>{props.title}</dt>
            <dd>{props.content}</dd>
        </dl>
    );
};

export default DlText;
