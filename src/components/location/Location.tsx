import { useEffect } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

const KakaoLocation = (props: any) => {
    return (
        <Map
            id="map"
            center={{ lat: props.center.lat, lng: props.center.lng }}
            style={{ width: '350px', height: '350px' }}
            level={props.center.level}
            key={`${props.center.lat}-${props.center.lng}`}
        >
            <MapMarker position={{ lat: props.center.lat, lng: props.center.lng }} />
        </Map>
    );
};

export default KakaoLocation;
