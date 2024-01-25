import InputBox from 'components/input/InputBox';
import DaumPostCode from 'react-daum-postcode';

const DaumPost = () => {
    const handleComplete = (data: any) => {
        console.log(data);
    };

    return <DaumPostCode onComplete={handleComplete} className="post-code" />;
    // return <InputBox inputLabel="연고지" />;
};

export default DaumPost;
