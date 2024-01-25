import React, { useState } from 'react';
import Draggable from 'react-draggable';


// bounds 속성의 타입을 정의합니다.
interface DraggableCircleProps {
  bounds: {
    left?: number;
    top?: number;
    right?: number;
    bottom?: number;
  } | string;
}

const DraggableCircle:React.FC<DraggableCircleProps> = ({ bounds }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const trackPos = (data:any) => {
    setPosition({ x: data.x, y: data.y });
  };

  return (
    <>
      <Draggable bounds={bounds} onDrag={(e, data) => trackPos(data)}>
        <div style={{ 
          height: '50px', 
          width: '50px', 
          borderRadius: '50%', 
          background: 'red', 
          position: 'absolute', 
          cursor: 'move' 
        }} />
      </Draggable>
      <div>현재 위치: x: {position.x.toFixed(0)}, y: {position.y.toFixed(0)}</div>
    </>
  );
};

export default DraggableCircle;