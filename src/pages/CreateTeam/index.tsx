import Layout from 'layouts/App';
import './create-team.css';
import { useCallback, useEffect, useState } from 'react';

const CreateTeam = () => {
    const [values, setValues] = useState({
        teamName: '',
        teamDesc: '',
        gender: '',
    });

    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const { id, value } = e.target;
            setValues((prevValues) => ({
                ...prevValues,
                [id]: value,
            }));
        },
        [setValues]
    );

    useEffect(() => {}, [values]);

    return (
        <Layout>
            {
                <form className="create-team-form">
                    <label className="singup-logoImg-label" htmlFor="logoImage">
                        팀 로고 이미지 추가
                    </label>
                    <input
                        type="file"
                        className="singup-logoImg-input "
                        name=""
                        id="logoImage"
                        accept="image/*"
                    />
                    <label htmlFor="">팀 이름</label>
                    <input
                        type="text"
                        name=""
                        id="teamName"
                        onChange={handleChange}
                    />
                    <label htmlFor="">팀 이름</label>
                    <textarea name="" id="teamDesc" value=""></textarea>
                    <label htmlFor="">팀 성별</label>
                    <div className="gender-container">
                        <div className="gender-wrap">
                            <p>남성</p>
                            <input
                                type="radio"
                                name="gender"
                                id="gender"
                                value={'femail'}
                                onChange={handleChange}
                            />
                            <p>여성</p>
                            <input
                                type="radio"
                                name="gender"
                                id="gender"
                                value={'male'}
                                onChange={handleChange}
                            />
                            <p>혼성</p>
                            <input
                                type="radio"
                                name="gender"
                                id="gender"
                                value="mixedGender"
                            />
                        </div>
                    </div>
                    <button>Add</button>
                </form>
            }
        </Layout>
    );
};

export default CreateTeam;
