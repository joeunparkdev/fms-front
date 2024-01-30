import { useEffect, useState } from 'react';

const Test = () => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        document.title = `${count}`;
    });
    return (
        <div>
            <p>총 {count} 번 클릭했습니다.</p>
            <button onClick={() => setCount(count + 1)}>상승 버튼</button>
        </div>
    );
};

export default Test;
