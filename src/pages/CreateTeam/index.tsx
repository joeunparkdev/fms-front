import FileUploader from 'components/file/FileUploader';
import InputBox from 'components/input/InputBox';
import KakaoLocation from 'components/location/Location';
import RadioLayout from 'components/radio/RadioLayout';
import Toggle from 'components/toggle/Toggle';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import './create-team.css';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import styled from 'styled-components';
import axios from 'axios';
import Layout from 'layouts/App';

export const ScoreboardContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: white;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    max-height: 90vh; /* Maximum height of the scoreboard container */
    overflow-y: auto; /* Enable vertical scrolling */
    :: -webkit-scrollbar {
        /* Hide scrollbar for Chrome, Safari and Opera */
        display: none;
    }
`;

const CreateTeam = () => {
    const { kakao } = window;
    const [addressValues, setAddressValues] = useState({
        roadAddress: '',
        postalCode: '',
        center: {
            lat: '36.5',
            lng: '127.5',
            level: 20,
        },
    });
    const [teamInfo, setTeamInfo] = useState({
        name: '',
        description: '',
    });
    const [selectedGender, setSelectedGender] = useState('');
    const [selectedFile, setSelectedFile] = useState<File | null>();
    const [selectedToggle, setSelectedToggle] = useState<boolean>(false);

    const open = useDaumPostcodePopup();

    const completeFunc = (data: any) => {
        setAddressValues({ ...addressValues, roadAddress: data.roadAddress, postalCode: data.zonecode });
    };

    // 주소 입력시 이벤트
    useEffect(() => {
        searchLocation(addressValues.roadAddress);
        console.log(addressValues);
    }, [addressValues.roadAddress]);

    const searchLocation = (address: string) => {
        const geocoder = new kakao.maps.services.Geocoder();

        geocoder.addressSearch(address, (result, status) => {
            if (status === kakao.maps.services.Status.OK) {
                setAddressValues({
                    ...addressValues,
                    center: {
                        lat: result[0].y,
                        lng: result[0].x,
                        level: 5,
                    },
                });
            } else {
                console.error('주소를 변환할 수 없습니다.');
            }
        });
    };

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        open({ onComplete: completeFunc });
        e.preventDefault();
    };

    // 라디오 이벤트
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedGender(e.target.value);
    };

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
        onChange,
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setTeamInfo((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];

        console.log('파일이 입력되었습니다 : ', file);
        if (file) {
            setSelectedFile(file);
        } else {
            setSelectedFile(null);
        }
    };

    const onClickAddButton = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', teamInfo.name);
        formData.append('description', teamInfo.description);
        formData.append('gender', selectedGender);
        formData.append('isMixedGender', selectedToggle.toString());
        formData.append('postalCode', addressValues.postalCode);
        formData.append('address', addressValues.roadAddress);
        if (selectedFile) {
            formData.append('file', selectedFile);
        }

        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await axios.post(
                `http://localhost:${process.env.REACT_APP_SERVER_PORT}/api/team`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            alert(response);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Layout>
            <ScoreboardContainer>
                {
                    <form className="create-team-form">
                        <FileUploader descLabel="구단 로고를 등록해주세요" changedFunc={handleFileChange} />
                        <InputBox inputLabel="구단명" name="name" onChange={handleInputChange} />
                        <InputBox inputLabel="구단 설명" name="description" onChange={handleInputChange} />
                        <RadioLayout
                            titleLabel={radioOption.titleLabel}
                            option={radioOption.option}
                            onChange={radioOption.onChange}
                        />
                        <Toggle label="혼성 여부" onToggle={(value) => setSelectedToggle(value)} />

                        <div className="location-container">
                            <label htmlFor="">연고지</label>
                            <KakaoLocation center={addressValues.center} />
                            <Button variant="dark" onClick={handleClick}>
                                주소 검색
                            </Button>
                        </div>
                        <Button variant="dark" onClick={onClickAddButton}>
                            Add
                        </Button>
                    </form>
                }
            </ScoreboardContainer>
        </Layout>
    );
};

export default CreateTeam;
