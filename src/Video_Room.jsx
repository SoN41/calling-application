import React from 'react'
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useParams } from 'react-router-dom';

const Video_Room = () => {

    const { id } = useParams();
    const Meeting = (element) => {
        
        if (!element) return;
        console.log("FULL ENV OBJECT:", import.meta.env.REACT_APP_ZEGO_SERVER_SECRET);

        const appID = Number(import.meta.env.REACT_APP_ZEGO_APP_ID);
        const serverSecret = toString(import.meta.env.REACT_APP_ZEGO_SERVER_SECRET);
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, id, Date.now().toString(), "sujal");

        const zp = ZegoUIKitPrebuilt.create(kitToken);

        zp.joinRoom({
            container: element,
            scenario: {
                mode: ZegoUIKitPrebuilt.OneONoneCall, // To implement 1-on-1 calls, modify the parameter here to [ZegoUIKitPrebuilt.OneONoneCall].
            },
        });
    }

    return (
        <>
            <div ref={Meeting} style={{ width: '100vw', height: '100vh' }} />
        </>
    )
}

export default Video_Room