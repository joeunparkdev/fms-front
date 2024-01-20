import React, {useEffect} from "react";

const KakaoCallBack = () => {
    useEffect(()=> {
        const params = new URL(document.location.toString()).searchParams;
        const code = params.get("code");
        const grant_type = "authorization_code";
        const client_id = `${process.env.KAKAO_API_KEY}`;
        const redirect_uri = `${process.env.KAKAO_CALLBACK_URL}`;
    })
}