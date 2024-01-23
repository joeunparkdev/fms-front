import AddressInput from 'components/AddressInput';
import FileUploader from 'components/file/FileUploader';
import InputBox from 'components/input/InputBox';
import RadioLayout from 'components/radio/RadioLayout';
import Toggle from 'components/toggle/Toggle';
import Layout from 'layouts/App';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import './create-team.css';

const CreateTeam = () => {
    const [values, setValues] = useState({
        teamName: '',
        teamDesc: '',
        gender: '',
    });

    const radioOption: RadioLayout = {
        titleLabel: '성별',
        option: [
            {
                label: '남성',
                nameAndId: 'gender',
                value: 'Male',
            },
            {
                label: '여성',
                nameAndId: 'gender',
                value: 'Female',
            },
        ],
    };

    return (
        <Layout>
            {
                <form className="create-team-form">
                    <FileUploader descLabel="구단 로고를 등록해주세요" />
                    <InputBox inputLabel="구단명" />
                    <InputBox inputLabel="구단 설명" />
                    <RadioLayout titleLabel={radioOption.titleLabel} option={radioOption.option} />
                    <Toggle label="혼성 여부" />
                    <AddressInput></AddressInput>
                    <Button variant="dark">Add</Button>
                </form>
            }
        </Layout>
    );
};

export default CreateTeam;
