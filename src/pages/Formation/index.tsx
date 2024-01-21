import React, { useState }  from 'react';
import "./Formation.css";
import axios from 'axios';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Button } from '@mui/material';
import { useEffect } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

function Formation (props) {//여기서 팀명받아오는거 괜찮
  const [playerList, setPlayerList] = useState(null);//선수 이름, 선호 포지션, 등번호, 배치되어있는지 등
  const [PositionList, SetPositionList] = useState(null)//원 번호, 원의 좌표, 원에 등록되어있던 선수 등
  const [anchorEl, setAnchorEl] = useState(null); //리스트 띄울지 안띄울지
  const [buttonNum, setbuttonNum] = useState() //각 원의 인덱스를 의미
  const [Formation, SetFormation] = useState('') //드롭다운 안에 값
  const [Status, SetStatus] = useState(true)//편집완료 or 편집 상태변경
  const [form, setform] = useState()//포메이션 드롭다운 용
  // const [xy, setxy] = useState({x:0, y:0})

  const open = Boolean(anchorEl); //리스트 띄우고 끄고

  const handleClick = (event) => { //리스트 띄우고, 선택한 원의 번호 저장
    setAnchorEl(event.currentTarget);
    setbuttonNum(event.currentTarget.id)
    event.preventDefault();//브라우저 우클릭을 막아준다.
  };

  const handleClose = () => {//리스트 끄기
    setAnchorEl();
  };

  const onStatusHandler = () => {//편집 버튼 누르면 상태 변화
    SetStatus(!Status)
  }
  
  const onFormationHandler = (e) => {//드롭다운 포메이션 누르면 발생
    SetFormation(e.target.value)
    console.log(e.target.value)
    axios.get('/api/formation'
    )
    .then(res => { 

      setform(res.data)
    })
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res1 = await axios.get("/api/readPosition");
        SetPositionList(res1.data);
        setform(res1.data);
  
        const res = await axios.get("/api/readUser");
        setPlayerList(res.data);
  
        for (let i = 0; i <= 10; i++) {
          setNames(i);
        }
      } catch (error) {
        // Handle errors here (e.g., display an error message)
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, []);

  const setNames = (index) => {
    const nameState = `SetName${index}`;
    const backState = `SetBack${index}`;
  
    setState((prevState) => ({
      ...prevState,
      [nameState]: res1.data[index]?.name || '-',
      [backState]: res1.data[index]?.back || '-',
    }));
  };
  
  

  const sendDB = () => {//DB에 변경된 정보 보내기
    if(Status === false){
      // let body = {
      //   playerList, //첫번째 요소 포지션 
      //   PositionList
      // }
      axios.post('/api/sendUser', playerList)// /api/player/save
      .then(res => {
        console.log(res.data)
      })
      // axios.post('/api/sendPosition', PositionList)// /api/formation/save
      // .then(res => {
      //   console.log(res.data)
      // })
    } else {
      axios.get('/api/readUser')
      .then(res => setPlayerList(res.data))
    }
  }

  const trackPos = (e, data) => {//원이 멈췄을 때 불리는 함수, 변경된 원의 좌표값 각 원 정보에 저장
    switch(e.target.id){
      case "button1" :
        setform(form.map((form) => //position에 사용되는 form에 x, y 좌표가 있기 때문에 이걸로 변경을 해줘야 위치가 옮겨짐
        form.circle === 1 ? { ...form, x: data.x, y: data.y} : form))
        return(
          SetPositionList(PositionList.map((position) =>
            position.circle === 1 ? { ...position, x: data.x, y: data.y} : position))
        )
      case "button2" :
        setform(form.map((form) =>
        form.circle === 2 ? { ...form, x: data.x, y: data.y} : form))
        return(
          SetPositionList(PositionList.map((position) =>
            position.circle === 2 ? { ...position, x: data.x, y: data.y} : position))
        )
      case "button3" :
        setform(form.map((form) =>
        form.circle === 3 ? { ...form, x: data.x, y: data.y} : form))
        return(
          SetPositionList(PositionList.map((position) =>
            position.circle === 3 ? { ...position, x: data.x, y: data.y} : position))
        )
      case "button4" :
        setform(form.map((form) =>
        form.circle === 4 ? { ...form, x: data.x, y: data.y} : form))
        return(
          SetPositionList(PositionList.map((position) =>
            position.circle === 4 ? { ...position, x: data.x, y: data.y} : position))
        )
      case "button5" :
        setform(form.map((form) =>
        form.circle === 5 ? { ...form, x: data.x, y: data.y} : form))
        return(
          SetPositionList(PositionList.map((position) =>
            position.circle === 5 ? { ...position, x: data.x, y: data.y} : position))
        )
      case "button6" :
        setform(form.map((form) =>
        form.circle === 6 ? { ...form, x: data.x, y: data.y} : form))
        return(
          SetPositionList(PositionList.map((position) =>
            position.circle === 6 ? { ...position, x: data.x, y: data.y} : position))
        )
      case "button7" :
        setform(form.map((form) =>
        form.circle === 7 ? { ...form, x: data.x, y: data.y} : form))
        return(
          SetPositionList(PositionList.map((position) =>
            position.circle === 7 ? { ...position, x: data.x, y: data.y} : position))
        )
      case "button8" :
        setform(form.map((form) =>
        form.circle === 8 ? { ...form, x: data.x, y: data.y} : form))
        return(
          SetPositionList(PositionList.map((position) =>
            position.circle === 8 ? { ...position, x: data.x, y: data.y} : position))
        )
      case "button9" :
        setform(form.map((form) =>
        form.circle === 9 ? { ...form, x: data.x, y: data.y} : form))
        return(
          SetPositionList(PositionList.map((position) =>
            position.circle === 9 ? { ...position, x: data.x, y: data.y} : position))
        )
      case "button10" :
        setform(form.map((form) =>
        form.circle === 10 ? { ...form, x: data.x, y: data.y} : form))
        return(
          SetPositionList(PositionList.map((position) =>
            position.circle === 10 ? { ...position, x: data.x, y: data.y} : position))
        )
      default :
        return null
    }
  };
  //각 원의 현재 포지션
  //초기값 null로 주고 DB에서 받아오는 값으로 렌더링 해야됨
  const [Content1, SetContent1] = useState();
  const [Content2, SetContent2] = useState();
  const [Content3, SetContent3] = useState();
  const [Content4, SetContent4] = useState();
  const [Content5, SetContent5] = useState();
  const [Content6, SetContent6] = useState();
  const [Content7, SetContent7] = useState();
  const [Content8, SetContent8] = useState();
  const [Content9, SetContent9] = useState();
  const [Content10, SetContent10] = useState();
  
  //각 원의 현재 등록된 선수의 이름
  const [Name1, SetName1] = useState()
  const [Name2, SetName2] = useState()
  const [Name3, SetName3] = useState()
  const [Name4, SetName4] = useState()
  const [Name5, SetName5] = useState()
  const [Name6, SetName6] = useState()
  const [Name7, SetName7] = useState()
  const [Name8, SetName8] = useState()
  const [Name9, SetName9] = useState()
  const [Name10, SetName10] = useState()
  const [Name11, SetName11] = useState()

  //각 원의 현재 등록된 선수의 등번호
  const [Back1, SetBack1] = useState()
  const [Back2, SetBack2] = useState()
  const [Back3, SetBack3] = useState()
  const [Back4, SetBack4] = useState()
  const [Back5, SetBack5] = useState()
  const [Back6, SetBack6] = useState()
  const [Back7, SetBack7] = useState()
  const [Back8, SetBack8] = useState()
  const [Back9, SetBack9] = useState()
  const [Back10, SetBack10] = useState()
  const [Back11, SetBack11] = useState()

  const submit1 = ({_id, name, already, Change, back, like}) => {
    confirmAlert({
      title: '해당 선수의 선호 포지션과 배치될 원의 포지션이 다릅니다.',
      message: '계속 하시겠습니까?',
      buttons: [
        {
          label: '네',
          onClick: () => {
            setPlayerList((prev) => prev.map((player) => player._id === _id ? { ...player, already: !already} : player))
            //등록할 선수를 리스트에 뜨지 않게 하는 로직
            setPlayerList((prev) => prev.map((player) => player._id === _id ? { ...player, select: Content1} : player))
            //배치될 포지션을 select에 저장
            SetPositionList(PositionList.map((position) => position.circle === 1 ? { ...position, name: name, back: back} : position))
            //각 원에 어떤 선수가 배치되는지 원 정보에 저장
            if(Name1 === null){ 
              SetBack1(back)
              return SetName1(name)
            } else {
              setPlayerList((prev) => prev.map((player) => player.name === Name1 ? { ...player, already: false} : player))
              //현재 등록되어있던 선수를 다시 비등록으로 변경해주는 로직
              SetBack1(back)
            return SetName1(name)
            }
          }
        },
        {
          label: '아니오',
        }
      ]
    })
  }
  const submit2 = ({_id, name, already, Change, back, like}) => {
    confirmAlert({
      title: '해당 선수의 선호 포지션과 배치될 원의 포지션이 다릅니다.',
      message: '계속 하시겠습니까?',
      buttons: [
        {
          label: '네',
          onClick: () => {
            setPlayerList((prev) => prev.map((player) => player._id === _id ? { ...player, already: !already} : player))
            //등록할 선수를 리스트에 뜨지 않게 하는 로직
            setPlayerList((prev) => prev.map((player) => player._id === _id ? { ...player, select: Content2} : player))
            //배치될 포지션을 select에 저장
            SetPositionList(PositionList.map((position) => position.circle === 2 ? { ...position, name: name, back: back} : position))
            //각 원에 어떤 선수가 배치되는지 원 정보에 저장
            if(Name2 === null){ 
              SetBack2(back)
              return SetName2(name)
            } else {
              setPlayerList((prev) => prev.map((player) => player.name === Name2 ? { ...player, already: false} : player))
              //현재 등록되어있던 선수를 다시 비등록으로 변경해주는 로직
              SetBack2(back)
            return SetName2(name)
            }
          }
        },
        {
          label: '아니오',
        }
      ]
    })
  }
  const submit3 = ({_id, name, already, Change, back, like}) => {
    confirmAlert({
      title: '해당 선수의 선호 포지션과 배치될 원의 포지션이 다릅니다.',
      message: '계속 하시겠습니까?',
      buttons: [
        {
          label: '네',
          onClick: () => {
            setPlayerList((prev) => prev.map((player) => player._id === _id ? { ...player, already: !already} : player))
            //등록할 선수를 리스트에 뜨지 않게 하는 로직
            setPlayerList((prev) => prev.map((player) => player._id === _id ? { ...player, select: Content3} : player))
            //배치될 포지션을 select에 저장
            SetPositionList(PositionList.map((position) => position.circle === 3 ? { ...position, name: name, back: back} : position))
            //각 원에 어떤 선수가 배치되는지 원 정보에 저장
            if(Name3 === null){ 
              SetBack3(back)
              return SetName3(name)
            } else {
              setPlayerList((prev) => prev.map((player) => player.name === Name3 ? { ...player, already: false} : player))
              //현재 등록되어있던 선수를 다시 비등록으로 변경해주는 로직
              SetBack3(back)
            return SetName3(name)
            }
          }
        },
        {
          label: '아니오',
        }
      ]
    })
  }
  const submit4 = ({_id, name, already, Change, back, like}) => {
    confirmAlert({
      title: '해당 선수의 선호 포지션과 배치될 원의 포지션이 다릅니다.',
      message: '계속 하시겠습니까?',
      buttons: [
        {
          label: '네',
          onClick: () => {
            setPlayerList((prev) => prev.map((player) => player._id === _id ? { ...player, already: !already} : player))
            //등록할 선수를 리스트에 뜨지 않게 하는 로직
            setPlayerList((prev) => prev.map((player) => player._id === _id ? { ...player, select: Content4} : player))
            //배치될 포지션을 select에 저장
            SetPositionList(PositionList.map((position) => position.circle === 4 ? { ...position, name: name, back: back} : position))
            //각 원에 어떤 선수가 배치되는지 원 정보에 저장
            if(Name4 === null){ 
              SetBack4(back)
              return SetName4(name)
            } else {
              setPlayerList((prev) => prev.map((player) => player.name === Name4 ? { ...player, already: false} : player))
              //현재 등록되어있던 선수를 다시 비등록으로 변경해주는 로직
              SetBack4(back)
            return SetName4(name)
            }
          }
        },
        {
          label: '아니오',
        }
      ]
    })
  }
  const submit5 = ({_id, name, already, Change, back, like}) => {
    confirmAlert({
      title: '해당 선수의 선호 포지션과 배치될 원의 포지션이 다릅니다.',
      message: '계속 하시겠습니까?',
      buttons: [
        {
          label: '네',
          onClick: () => {
            setPlayerList((prev) => prev.map((player) => player._id === _id ? { ...player, already: !already} : player))
            //등록할 선수를 리스트에 뜨지 않게 하는 로직
            setPlayerList((prev) => prev.map((player) => player._id === _id ? { ...player, select: Content5} : player))
            //배치될 포지션을 select에 저장
            SetPositionList(PositionList.map((position) => position.circle === 5 ? { ...position, name: name, back: back} : position))
            //각 원에 어떤 선수가 배치되는지 원 정보에 저장
            if(Name5 === null){ 
              SetBack5(back)
              return SetName5(name)
            } else {
              setPlayerList((prev) => prev.map((player) => player.name === Name5 ? { ...player, already: false} : player))
              //현재 등록되어있던 선수를 다시 비등록으로 변경해주는 로직
              SetBack5(back)
            return SetName5(name)
            }
          }
        },
        {
          label: '아니오',
        }
      ]
    })
  }
  const submit6 = ({_id, name, already, Change, back, like}) => {
    confirmAlert({
      title: '해당 선수의 선호 포지션과 배치될 원의 포지션이 다릅니다.',
      message: '계속 하시겠습니까?',
      buttons: [
        {
          label: '네',
          onClick: () => {
            setPlayerList((prev) => prev.map((player) => player._id === _id ? { ...player, already: !already} : player))
            //등록할 선수를 리스트에 뜨지 않게 하는 로직
            setPlayerList((prev) => prev.map((player) => player._id === _id ? { ...player, select: Content6} : player))
            //배치될 포지션을 select에 저장
            SetPositionList(PositionList.map((position) => position.circle === 6 ? { ...position, name: name, back: back} : position))
            //각 원에 어떤 선수가 배치되는지 원 정보에 저장
            if(Name6 === null){ 
              SetBack6(back)
              return SetName6(name)
            } else {
              setPlayerList((prev) => prev.map((player) => player.name === Name6 ? { ...player, already: false} : player))
              //현재 등록되어있던 선수를 다시 비등록으로 변경해주는 로직
              SetBack6(back)
            return SetName6(name)
            }
          }
        },
        {
          label: '아니오',
        }
      ]
    })
  }
  const submit7 = ({_id, name, already, Change, back, like}) => {
    confirmAlert({
      title: '해당 선수의 선호 포지션과 배치될 원의 포지션이 다릅니다.',
      message: '계속 하시겠습니까?',
      buttons: [
        {
          label: '네',
          onClick: () => {
            setPlayerList((prev) => prev.map((player) => player._id === _id ? { ...player, already: !already} : player))
            //등록할 선수를 리스트에 뜨지 않게 하는 로직
            setPlayerList((prev) => prev.map((player) => player._id === _id ? { ...player, select: Content7} : player))
            //배치될 포지션을 select에 저장
            SetPositionList(PositionList.map((position) => position.circle === 7 ? { ...position, name: name, back: back} : position))
            //각 원에 어떤 선수가 배치되는지 원 정보에 저장
            if(Name7 === null){ 
              SetBack7(back)
              return SetName7(name)
            } else {
              setPlayerList((prev) => prev.map((player) => player.name === Name7 ? { ...player, already: false} : player))
              //현재 등록되어있던 선수를 다시 비등록으로 변경해주는 로직
              SetBack7(back)
            return SetName7(name)
            }
          }
        },
        {
          label: '아니오',
        }
      ]
    })
  }
  const submit8 = ({_id, name, already, Change, back, like}) => {
    confirmAlert({
      title: '해당 선수의 선호 포지션과 배치될 원의 포지션이 다릅니다.',
      message: '계속 하시겠습니까?',
      buttons: [
        {
          label: '네',
          onClick: () => {
            setPlayerList((prev) => prev.map((player) => player._id === _id ? { ...player, already: !already} : player))
            //등록할 선수를 리스트에 뜨지 않게 하는 로직
            setPlayerList((prev) => prev.map((player) => player._id === _id ? { ...player, select: Content8} : player))
            //배치될 포지션을 select에 저장
            SetPositionList(PositionList.map((position) => position.circle === 8 ? { ...position, name: name, back: back} : position))
            //각 원에 어떤 선수가 배치되는지 원 정보에 저장
            if(Name8 === null){ 
              SetBack8(back)
              return SetName8(name)
            } else {
              setPlayerList((prev) => prev.map((player) => player.name === Name8 ? { ...player, already: false} : player))
              //현재 등록되어있던 선수를 다시 비등록으로 변경해주는 로직
              SetBack8(back)
            return SetName8(name)
            }
          }
        },
        {
          label: '아니오',
        }
      ]
    })
  }
  const submit9 = ({_id, name, already, Change, back, like}) => {
    confirmAlert({
      title: '해당 선수의 선호 포지션과 배치될 원의 포지션이 다릅니다.',
      message: '계속 하시겠습니까?',
      buttons: [
        {
          label: '네',
          onClick: () => {
            setPlayerList((prev) => prev.map((player) => player._id === _id ? { ...player, already: !already} : player))
            //등록할 선수를 리스트에 뜨지 않게 하는 로직
            setPlayerList((prev) => prev.map((player) => player._id === _id ? { ...player, select: Content9} : player))
            //배치될 포지션을 select에 저장
            SetPositionList(PositionList.map((position) => position.circle === 9 ? { ...position, name: name, back: back} : position))
            //각 원에 어떤 선수가 배치되는지 원 정보에 저장
            if(Name9 === null){ 
              SetBack9(back)
              return SetName9(name)
            } else {
              setPlayerList((prev) => prev.map((player) => player.name === Name9 ? { ...player, already: false} : player))
              //현재 등록되어있던 선수를 다시 비등록으로 변경해주는 로직
              SetBack9(back)
            return SetName9(name)
            }
          }
        },
        {
          label: '아니오',
        }
      ]
    })
  }
  const submit10 = ({_id, name, already, Change, back, like}) => {
    confirmAlert({
      title: '해당 선수의 선호 포지션과 배치될 원의 포지션이 다릅니다.',
      message: '계속 하시겠습니까?',
      buttons: [
        {
          label: '네',
          onClick: () => {
            setPlayerList((prev) => prev.map((player) => player._id === _id ? { ...player, already: !already} : player))
            //등록할 선수를 리스트에 뜨지 않게 하는 로직
            setPlayerList((prev) => prev.map((player) => player._id === _id ? { ...player, select: Content10} : player))
            //배치될 포지션을 select에 저장
            SetPositionList(PositionList.map((position) => position.circle === 10 ? { ...position, name: name, back: back} : position))
            //각 원에 어떤 선수가 배치되는지 원 정보에 저장
            if(Name10 === null){ 
              SetBack10(back)
              return SetName10(name)
            } else {
              setPlayerList((prev) => prev.map((player) => player.name === Name10 ? { ...player, already: false} : player))
              //현재 등록되어있던 선수를 다시 비등록으로 변경해주는 로직
              SetBack10(back)
            return SetName10(name)
            }
          }
        },
        {
          label: '아니오',
        }
      ]
    })
  }
  const submit11 = ({_id, name, already, Change, back, like}) => {
    confirmAlert({
      title: '해당 선수의 선호 포지션과 배치될 원의 포지션이 다릅니다.',
      message: '계속 하시겠습니까?',
      buttons: [
        {
          label: '네',
          onClick: () => {
            setPlayerList((prev) => prev.map((player) => player._id === _id ? { ...player, already: !already} : player))
            //등록할 선수를 리스트에 뜨지 않게 하는 로직
            setPlayerList((prev) => prev.map((player) => player._id === _id ? { ...player, select: "GK"} : player))
            //배치될 포지션을 select에 저장
            SetPositionList(PositionList.map((position) => position.circle === 11 ? { ...position, name: name, back: back} : position))
            //각 원에 어떤 선수가 배치되는지 원 정보에 저장
            if(Name11 === null){ 
              SetBack11(back)
              return SetName11(name)
            } else {
              setPlayerList((prev) => prev.map((player) => player.name === Name11 ? { ...player, already: false} : player))
              //현재 등록되어있던 선수를 다시 비등록으로 변경해주는 로직
              SetBack11(back)
            return SetName11(name)
            }
          }
        },
        {
          label: '아니오',
        }
      ]
    })
  }

  //리스트에서 선택된 선수를 원에 띄우는 함수
  const onNameHandler = ({_id, name, already, Change, back, like}) => {
    // const a = buttonNum.split('')[6]
    // console.log(a)
    // const submit = "submit" + a
    // console.log(submit)
    switch(buttonNum){
      case "button1" :
        if(like !== Content1){//선호포지션과 현재 원의 포지션이 맞지 않으면 실행
          submit1({_id, name, already, Change, back, like})
          break;
        } else {
          setPlayerList((prev) => prev.map((player) => player._id === _id ? { ...player, already: !already} : player))
          //등록할 선수를 리스트에 뜨지 않게 하는 로직
          SetPositionList(PositionList.map((position) =>//각 원에 어떤 선수가 배치되는지 원 정보에 저장
          position.circle === 1 ? { ...position, name: name, back: back} : position))
          if(Name1 === null){ 
            SetBack1(back)
            return SetName1(name)
          } else {
            setPlayerList((prev) => prev.map((player) => player.name === Name1 ? { ...player, already: false} : player))
            //현재 등록되어있던 선수를 다시 비등록으로 변경해주는 로직
            SetBack1(back)
          return SetName1(name)
          }
        }
      case "button2" :
        if(like !== Content2){//선호포지션과 현재 원의 포지션이 맞지 않으면 실행
          submit2({_id, name, already, Change, back, like})
          break;
        } else {
          setPlayerList((prev) => prev.map((player) => player._id === _id ? { ...player, already: !already} : player))
          //등록할 선수를 리스트에 뜨지 않게 하는 로직
          SetPositionList(PositionList.map((position) =>//각 원에 어떤 선수가 배치되는지 원 정보에 저장
          position.circle === 2 ? { ...position, name: name, back: back} : position))
          if(Name2 === null){ 
            SetBack2(back)
            return SetName2(name)
          } else {
            setPlayerList((prev) => prev.map((player) => player.name === Name2 ? { ...player, already: false} : player))
            //현재 등록되어있던 선수를 다시 비등록으로 변경해주는 로직
            SetBack2(back)
          return SetName2(name)
          }
        }
      case "button3" :
        if(like !== Content3){//선호포지션과 현재 원의 포지션이 맞지 않으면 실행
          submit3({_id, name, already, Change, back, like})
          break;
        } else {
          setPlayerList((prev) => prev.map((player) => player._id === _id ? { ...player, already: !already} : player))
          //등록할 선수를 리스트에 뜨지 않게 하는 로직
          SetPositionList(PositionList.map((position) =>//각 원에 어떤 선수가 배치되는지 원 정보에 저장
          position.circle === 3 ? { ...position, name: name, back: back} : position))
          if(Name3 === null){ 
            SetBack3(back)
            return SetName3(name)
          } else {
            setPlayerList((prev) => prev.map((player) => player.name === Name3 ? { ...player, already: false} : player))
            //현재 등록되어있던 선수를 다시 비등록으로 변경해주는 로직
            SetBack3(back)
          return SetName3(name)
          }
        }
      case "button4" :
        if(like !== Content4){//선호포지션과 현재 원의 포지션이 맞지 않으면 실행
          submit4({_id, name, already, Change, back, like})
          break;
        } else {
          setPlayerList((prev) => prev.map((player) => player._id === _id ? { ...player, already: !already} : player))
          //등록할 선수를 리스트에 뜨지 않게 하는 로직
          SetPositionList(PositionList.map((position) =>//각 원에 어떤 선수가 배치되는지 원 정보에 저장
          position.circle === 4 ? { ...position, name: name, back: back} : position))
          if(Name4 === null){ 
            SetBack4(back)
            return SetName4(name)
          } else {
            setPlayerList((prev) => prev.map((player) => player.name === Name4 ? { ...player, already: false} : player))
            //현재 등록되어있던 선수를 다시 비등록으로 변경해주는 로직
            SetBack4(back)
          return SetName4(name)
          }
        }
      case "button5" :
        if(like !== Content5){//선호포지션과 현재 원의 포지션이 맞지 않으면 실행
          submit5({_id, name, already, Change, back, like})
          break;
        } else {
          setPlayerList((prev) => prev.map((player) => player._id === _id ? { ...player, already: !already} : player))
          //등록할 선수를 리스트에 뜨지 않게 하는 로직
          SetPositionList(PositionList.map((position) =>//각 원에 어떤 선수가 배치되는지 원 정보에 저장
          position.circle === 5 ? { ...position, name: name, back: back} : position))
          if(Name5 === null){ 
            SetBack5(back)
            return SetName5(name)
          } else {
            setPlayerList((prev) => prev.map((player) => player.name === Name5 ? { ...player, already: false} : player))
            //현재 등록되어있던 선수를 다시 비등록으로 변경해주는 로직
            SetBack5(back)
          return SetName5(name)
          }
        }
      case "button6" :
        if(like !== Content6){//선호포지션과 현재 원의 포지션이 맞지 않으면 실행
          submit6({_id, name, already, Change, back, like})
          break;
        } else {
          setPlayerList((prev) => prev.map((player) => player._id === _id ? { ...player, already: !already} : player))
          //등록할 선수를 리스트에 뜨지 않게 하는 로직
          SetPositionList(PositionList.map((position) =>//각 원에 어떤 선수가 배치되는지 원 정보에 저장
          position.circle === 6 ? { ...position, name: name, back: back} : position))
          if(Name6 === null){ 
            SetBack6(back)
            return SetName6(name)
          } else {
            setPlayerList((prev) => prev.map((player) => player.name === Name6 ? { ...player, already: false} : player))
            //현재 등록되어있던 선수를 다시 비등록으로 변경해주는 로직
            SetBack6(back)
          return SetName6(name)
          }
        }
      case "button7" :
        if(like !== Content7){//선호포지션과 현재 원의 포지션이 맞지 않으면 실행
          submit7({_id, name, already, Change, back, like})
          break;
        } else {
          setPlayerList((prev) => prev.map((player) => player._id === _id ? { ...player, already: !already} : player))
          //등록할 선수를 리스트에 뜨지 않게 하는 로직
          SetPositionList(PositionList.map((position) =>//각 원에 어떤 선수가 배치되는지 원 정보에 저장
          position.circle === 7 ? { ...position, name: name, back: back} : position))
          if(Name7 === null){ 
            SetBack7(back)
            return SetName7(name)
          } else {
            setPlayerList((prev) => prev.map((player) => player.name === Name7 ? { ...player, already: false} : player))
            //현재 등록되어있던 선수를 다시 비등록으로 변경해주는 로직
            SetBack7(back)
          return SetName7(name)
          }
        }
      case "button8" :
        if(like !== Content8){//선호포지션과 현재 원의 포지션이 맞지 않으면 실행
          submit8({_id, name, already, Change, back, like})
          break;
        } else {
          setPlayerList((prev) => prev.map((player) => player._id === _id ? { ...player, already: !already} : player))
          //등록할 선수를 리스트에 뜨지 않게 하는 로직
          SetPositionList(PositionList.map((position) =>//각 원에 어떤 선수가 배치되는지 원 정보에 저장
          position.circle === 8 ? { ...position, name: name, back: back} : position))
          if(Name8 === null){ 
            SetBack8(back)
            return SetName8(name)
          } else {
            setPlayerList((prev) => prev.map((player) => player.name === Name8 ? { ...player, already: false} : player))
            //현재 등록되어있던 선수를 다시 비등록으로 변경해주는 로직
            SetBack8(back)
          return SetName8(name)
          }
        }
      case "button9" :
        if(like !== Content9){//선호포지션과 현재 원의 포지션이 맞지 않으면 실행
          submit9({_id, name, already, Change, back, like})
          break;
        } else {
          setPlayerList((prev) => prev.map((player) => player._id === _id ? { ...player, already: !already} : player))
          //등록할 선수를 리스트에 뜨지 않게 하는 로직
          SetPositionList(PositionList.map((position) =>//각 원에 어떤 선수가 배치되는지 원 정보에 저장
          position.circle === 9 ? { ...position, name: name, back: back} : position))
          if(Name9 === null){ 
            SetBack9(back)
            return SetName9(name)
          } else {
            setPlayerList((prev) => prev.map((player) => player.name === Name9 ? { ...player, already: false} : player))
            //현재 등록되어있던 선수를 다시 비등록으로 변경해주는 로직
            SetBack9(back)
          return SetName9(name)
          }
        }
      case "button10" :
        if(like !== Content10){//선호포지션과 현재 원의 포지션이 맞지 않으면 실행
          submit10({_id, name, already, Change, back, like})
          break;
        } else {
          setPlayerList((prev) => prev.map((player) => player._id === _id ? { ...player, already: !already} : player))
          //등록할 선수를 리스트에 뜨지 않게 하는 로직
          SetPositionList(PositionList.map((position) =>//각 원에 어떤 선수가 배치되는지 원 정보에 저장
          position.circle === 10 ? { ...position, name: name, back: back} : position))
          if(Name10 === null){ 
            SetBack10(back)
            return SetName10(name)
          } else {
            setPlayerList((prev) => prev.map((player) => player.name === Name10 ? { ...player, already: false} : player))
            //현재 등록되어있던 선수를 다시 비등록으로 변경해주는 로직
            SetBack10(back)
          return SetName10(name)
          }
        }
      case "button11" :
        if(like !== "GK"){//선호포지션과 현재 원의 포지션이 맞지 않으면 실행
          submit11({_id, name, already, Change, back, like})
          break;
        } else {
          setPlayerList((prev) => prev.map((player) => player._id === _id ? { ...player, already: !already} : player))
          //등록할 선수를 리스트에 뜨지 않게 하는 로직
          SetPositionList(PositionList.map((position) =>//각 원에 어떤 선수가 배치되는지 원 정보에 저장
          position.circle === 11 ? { ...position, name: name, back: back} : position))
          if(Name11 === null){ 
            SetBack11(back)
            return SetName11(name)
          } else {
            setPlayerList((prev) => prev.map((player) => player.name === SetName11 ? { ...player, already: false} : player))
            //현재 등록되어있던 선수를 다시 비등록으로 변경해주는 로직
            SetBack11(back)
          return SetName11(name)
          }
        }
      default:
        return null
    }
  }

 
  //포지션 변경해주는 핸들러
  const onContentHandler1 = (props) => {
    SetContent1(props)
  }
  //현재 원의 좌표값에 따라 포지션을 변경
  const onDragHandler1 =(data) =>{
    if(data.x>80 && data.y < 120 && data.x <450){
      onContentHandler1("ST")
    } else if(data.x<80 && data.y < 200){
      onContentHandler1("LW")
    } else if(data.x > 450 && data.y < 200){
      onContentHandler1("RW")
    } else if(data.x>80 && data.y > 120 && data.y < 185 && data.x <450){
      onContentHandler1("CF")
    } else if(data.x>80 && data.y > 185 && data.y < 275 && data.x <450){
      onContentHandler1("CAM")
    } else if(data.x<80 && data.y > 200 && data.y < 440){
      onContentHandler1("LM")
    } else if(data.x > 450 && data.y > 200 && data.y < 440){
      onContentHandler1("RM")
    } else if(data.x>80 && data.y > 275 && data.y < 460 && data.x <450){
      onContentHandler1("CM")
    } else if(data.x<80 && data.y > 440){
      onContentHandler1("LB")
    } else if(data.x > 450 && data.y > 440){
      onContentHandler1("RB")
    } else if(data.x>80 && data.y > 460 && data.y < 560 && data.x <450){
      onContentHandler1("CDM")
    } else if(data.x>80 && data.y > 560 && data.x <450){
      onContentHandler1("CB")
    }
    // setxy({x:data.x, y:data.y})
  }

  const onContentHandler2 = (props) => {
    SetContent2(props)
  }
  const onDragHandler2 =(data) =>{
    if(data.x>80 && data.y < 120 && data.x <450){
      onContentHandler2("ST")
    } else if(data.x<80 && data.y < 200){
      onContentHandler2("LW")
    } else if(data.x > 450 && data.y < 200){
      onContentHandler2("RW")
    } else if(data.x>80 && data.y > 120 && data.y < 185 && data.x <450){
      onContentHandler2("CF")
    } else if(data.x>80 && data.y > 185 && data.y < 275 && data.x <450){
      onContentHandler2("CAM")
    } else if(data.x<80 && data.y > 200 && data.y < 440){
      onContentHandler2("LM")
    } else if(data.x > 450 && data.y > 200 && data.y < 440){
      onContentHandler2("RM")
    } else if(data.x>80 && data.y > 275 && data.y < 460 && data.x <450){
      onContentHandler2("CM")
    } else if(data.x<80 && data.y > 440){
      onContentHandler2("LB")
    } else if(data.x > 450 && data.y > 440){
      onContentHandler2("RB")
    } else if(data.x>80 && data.y > 460 && data.y < 560 && data.x <450){
      onContentHandler2("CDM")
    } else if(data.x>80 && data.y > 560 && data.x <450){
      onContentHandler2("CB")
    }
  }

  const onContentHandler3 = (props) => {
    SetContent3(props)
  }
  const onDragHandler3 =(data) =>{
    if(data.x>80 && data.y < 120 && data.x <450){
      onContentHandler3("ST")
    } else if(data.x<80 && data.y < 200){
      onContentHandler3("LW")
    } else if(data.x > 450 && data.y < 200){
      onContentHandler3("RW")
    } else if(data.x>80 && data.y > 120 && data.y < 185 && data.x <450){
      onContentHandler3("CF")
    } else if(data.x>80 && data.y > 185 && data.y < 275 && data.x <450){
      onContentHandler3("CAM")
    } else if(data.x<80 && data.y > 200 && data.y < 440){
      onContentHandler3("LM")
    } else if(data.x > 450 && data.y > 200 && data.y < 440){
      onContentHandler3("RM")
    } else if(data.x>80 && data.y > 275 && data.y < 460 && data.x <450){
      onContentHandler3("CM")
    } else if(data.x<80 && data.y > 440){
      onContentHandler3("LB")
    } else if(data.x > 450 && data.y > 440){
      onContentHandler3("RB")
    } else if(data.x>80 && data.y > 460 && data.y < 560 && data.x <450){
      onContentHandler3("CDM")
    } else if(data.x>80 && data.y > 560 && data.x <450){
      onContentHandler3("CB")
    }
  }

  const onContentHandler4 = (props) => {
    SetContent4(props)
  }
  const onDragHandler4 =(data) =>{
    if(data.x>80 && data.y < 120 && data.x <450){
      onContentHandler4("ST")
    } else if(data.x<80 && data.y < 200){
      onContentHandler4("LW")
    } else if(data.x > 450 && data.y < 200){
      onContentHandler4("RW")
    } else if(data.x>80 && data.y > 120 && data.y < 185 && data.x <450){
      onContentHandler4("CF")
    } else if(data.x>80 && data.y > 185 && data.y < 275 && data.x <450){
      onContentHandler4("CAM")
    } else if(data.x<80 && data.y > 200 && data.y < 440){
      onContentHandler4("LM")
    } else if(data.x > 450 && data.y > 200 && data.y < 440){
      onContentHandler4("RM")
    } else if(data.x>80 && data.y > 275 && data.y < 460 && data.x <450){
      onContentHandler4("CM")
    } else if(data.x<80 && data.y > 440){
      onContentHandler4("LB")
    } else if(data.x > 450 && data.y > 440){
      onContentHandler4("RB")
    } else if(data.x>80 && data.y > 460 && data.y < 560 && data.x <450){
      onContentHandler4("CDM")
    } else if(data.x>80 && data.y > 560 && data.x <450){
      onContentHandler4("CB")
    }
  }

  const onContentHandler5 = (props) => {
    SetContent5(props)
  }
  const onDragHandler5 =(data) =>{
    if(data.x>80 && data.y < 120 && data.x <450){
      onContentHandler5("ST")
    } else if(data.x<80 && data.y < 200){
      onContentHandler5("LW")
    } else if(data.x > 450 && data.y < 200){
      onContentHandler5("RW")
    } else if(data.x>80 && data.y > 120 && data.y < 185 && data.x <450){
      onContentHandler5("CF")
    } else if(data.x>80 && data.y > 185 && data.y < 275 && data.x <450){
      onContentHandler5("CAM")
    } else if(data.x<80 && data.y > 200 && data.y < 440){
      onContentHandler5("LM")
    } else if(data.x > 450 && data.y > 200 && data.y < 440){
      onContentHandler5("RM")
    } else if(data.x>80 && data.y > 275 && data.y < 460 && data.x <450){
      onContentHandler5("CM")
    } else if(data.x<80 && data.y > 440){
      onContentHandler5("LB")
    } else if(data.x > 450 && data.y > 440){
      onContentHandler5("RB")
    } else if(data.x>80 && data.y > 460 && data.y < 560 && data.x <450){
      onContentHandler5("CDM")
    } else if(data.x>80 && data.y > 560 && data.x <450){
      onContentHandler5("CB")
    }
  }

  const onContentHandler6 = (props) => {
    SetContent6(props)
  }
  const onDragHandler6 =(data) =>{
    if(data.x>80 && data.y < 120 && data.x <450){
      onContentHandler6("ST")
    } else if(data.x<80 && data.y < 200){
      onContentHandler6("LW")
    } else if(data.x > 450 && data.y < 200){
      onContentHandler6("RW")
    } else if(data.x>80 && data.y > 120 && data.y < 185 && data.x <450){
      onContentHandler6("CF")
    } else if(data.x>80 && data.y > 185 && data.y < 275 && data.x <450){
      onContentHandler6("CAM")
    } else if(data.x<80 && data.y > 200 && data.y < 440){
      onContentHandler6("LM")
    } else if(data.x > 450 && data.y > 200 && data.y < 440){
      onContentHandler6("RM")
    } else if(data.x>80 && data.y > 275 && data.y < 460 && data.x <450){
      onContentHandler6("CM")
    } else if(data.x<80 && data.y > 440){
      onContentHandler6("LB")
    } else if(data.x > 450 && data.y > 440){
      onContentHandler6("RB")
    } else if(data.x>80 && data.y > 460 && data.y < 560 && data.x <450){
      onContentHandler6("CDM")
    } else if(data.x>80 && data.y > 560 && data.x <450){
      onContentHandler6("CB")
    }
  }

  const onContentHandler7 = (props) => {
    SetContent7(props)
  }
  const onDragHandler7 =(data) =>{
    if(data.x>80 && data.y < 120 && data.x <450){
      onContentHandler7("ST")
    } else if(data.x<80 && data.y < 200){
      onContentHandler7("LW")
    } else if(data.x > 450 && data.y < 200){
      onContentHandler7("RW")
    } else if(data.x>80 && data.y > 120 && data.y < 185 && data.x <450){
      onContentHandler7("CF")
    } else if(data.x>80 && data.y > 185 && data.y < 275 && data.x <450){
      onContentHandler7("CAM")
    } else if(data.x<80 && data.y > 200 && data.y < 440){
      onContentHandler7("LM")
    } else if(data.x > 450 && data.y > 200 && data.y < 440){
      onContentHandler7("RM")
    } else if(data.x>80 && data.y > 275 && data.y < 460 && data.x <450){
      onContentHandler7("CM")
    } else if(data.x<80 && data.y > 440){
      onContentHandler7("LB")
    } else if(data.x > 450 && data.y > 440){
      onContentHandler7("RB")
    } else if(data.x>80 && data.y > 460 && data.y < 560 && data.x <450){
      onContentHandler7("CDM")
    } else if(data.x>80 && data.y > 560 && data.x <450){
      onContentHandler7("CB")
    }
  }

  const onContentHandler8 = (props) => {
    SetContent8(props)
  }
  const onDragHandler8 =(data) =>{
    if(data.x>80 && data.y < 120 && data.x <450){
      onContentHandler8("ST")
    } else if(data.x<80 && data.y < 200){
      onContentHandler8("LW")
    } else if(data.x > 450 && data.y < 200){
      onContentHandler8("RW")
    } else if(data.x>80 && data.y > 120 && data.y < 185 && data.x <450){
      onContentHandler8("CF")
    } else if(data.x>80 && data.y > 185 && data.y < 275 && data.x <450){
      onContentHandler8("CAM")
    } else if(data.x<80 && data.y > 200 && data.y < 440){
      onContentHandler8("LM")
    } else if(data.x > 450 && data.y > 200 && data.y < 440){
      onContentHandler8("RM")
    } else if(data.x>80 && data.y > 275 && data.y < 460 && data.x <450){
      onContentHandler8("CM")
    } else if(data.x<80 && data.y > 440){
      onContentHandler8("LB")
    } else if(data.x > 450 && data.y > 440){
      onContentHandler8("RB")
    } else if(data.x>80 && data.y > 460 && data.y < 560 && data.x <450){
      onContentHandler8("CDM")
    } else if(data.x>80 && data.y > 560 && data.x <450){
      onContentHandler8("CB")
    }
  }

  const onContentHandler9 = (props) => {
    SetContent9(props)
  }
  const onDragHandler9 =(data) =>{
    if(data.x>80 && data.y < 120 && data.x <450){
      onContentHandler9("ST")
    } else if(data.x<80 && data.y < 200){
      onContentHandler9("LW")
    } else if(data.x > 450 && data.y < 200){
      onContentHandler9("RW")
    } else if(data.x>80 && data.y > 120 && data.y < 185 && data.x <450){
      onContentHandler9("CF")
    } else if(data.x>80 && data.y > 185 && data.y < 275 && data.x <450){
      onContentHandler9("CAM")
    } else if(data.x<80 && data.y > 200 && data.y < 440){
      onContentHandler9("LM")
    } else if(data.x > 450 && data.y > 200 && data.y < 440){
      onContentHandler9("RM")
    } else if(data.x>80 && data.y > 275 && data.y < 460 && data.x <450){
      onContentHandler9("CM")
    } else if(data.x<80 && data.y > 440){
      onContentHandler9("LB")
    } else if(data.x > 450 && data.y > 440){
      onContentHandler9("RB")
    } else if(data.x>80 && data.y > 460 && data.y < 560 && data.x <450){
      onContentHandler9("CDM")
    } else if(data.x>80 && data.y > 560 && data.x <450){
      onContentHandler9("CB")
    }
  }

  const onContentHandler10 = (props) => {
    SetContent10(props)
  }
  const onDragHandler10 =(data) =>{
    if(data.x>80 && data.y < 120 && data.x <450){
      onContentHandler10("ST")
    } else if(data.x<80 && data.y < 200){
      onContentHandler10("LW")
    } else if(data.x > 450 && data.y < 200){
      onContentHandler10("RW")
    } else if(data.x>80 && data.y > 120 && data.y < 185 && data.x <450){
      onContentHandler10("CF")
    } else if(data.x>80 && data.y > 185 && data.y < 275 && data.x <450){
      onContentHandler10("CAM")
    } else if(data.x<80 && data.y > 200 && data.y < 440){
      onContentHandler10("LM")
    } else if(data.x > 450 && data.y > 200 && data.y < 440){
      onContentHandler10("RM")
    } else if(data.x>80 && data.y > 275 && data.y < 460 && data.x <450){
      onContentHandler10("CM")
    } else if(data.x<80 && data.y > 440){
      onContentHandler10("LB")
    } else if(data.x > 450 && data.y > 440){
      onContentHandler10("RB")
    } else if(data.x>80 && data.y > 460 && data.y < 560 && data.x <450){
      onContentHandler10("CDM")
    } else if(data.x>80 && data.y > 560 && data.x <450){
      onContentHandler10("CB")
    }
  }

  return(
    <div className="formation">
      <div>
        <button onClick={ () => {
          onStatusHandler()
          sendDB()
        }}>
          {Status ? "편집" : "편집 완료"}
        </button>

        <Box sx={{ minWidth: 120, float: 'right' }}>
          <FormControl fullWidth>
            <InputLabel id="Formation">포메이션</InputLabel>
            <Select
              onChange={onFormationHandler}
              value={Formation}
            >
              {/* <MenuItem value='포메이션 선택' disabled={true}>포메이션 선택</MenuItem> */}
              {/* 메뉴아이템에 있는 벨류가 select의 벨류로 돼야 에러가 안뜸 왜이러는지는 모르겠음 */}
              <MenuItem value={4222}>4-2-2-2</MenuItem>
              <MenuItem value={442}>4-4-2</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </div>
      
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        PaperProps={{
          style: {
            maxHeight: "200px",
            width: '20ch',
          },
        }}
      //스크롤 만드는것
      >
        {playerList && playerList.map((player) => {
          if(player.already === false){
            return (
              <MenuItem
                onClick={() => {
                  handleClose()
                  onNameHandler(player)
                }}
                key={player._id}
              >
                {player.name}
                {player.like}
              </MenuItem>
            )
          }
        })}
      </Menu>
{}
    </div>
  )
}

export default Formation