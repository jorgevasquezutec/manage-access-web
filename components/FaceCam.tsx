'use client'
import Webcam from "react-webcam";
import React, { useCallback, useRef, useState } from "react";


type FaceCamProps = {
    submit: (image: string) => void
}


export default function FaceCam({ submit }: FaceCamProps) {
    const [img, setImg] = useState<string | undefined>(undefined);
    const webcamRef = useRef<Webcam>(null);

    const VideoConstraints = {
        width: { min: 480 },
        height: { min: 720 },
        aspectRatio: 0.6666666667,
        facingMode: "user"
    }

    const capture = useCallback(() => {
        const imageSrc = webcamRef.current?.getScreenshot();
        if (imageSrc === null || imageSrc == undefined) return;
        setImg(imageSrc)
        submit(imageSrc)
    }, [webcamRef]);



    return (
        <div className="flex flex-col justify-center align-center">
            {img === undefined ? (
                <>
                    <Webcam
                        audio={false}
                        mirrored={true}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        videoConstraints={VideoConstraints}
                    />
                    <button className="bg-red-500 text-white border-none rounded-[25px] mt-[10px] px-[40px] py-[10px] cursor-pointer" onClick={capture}>Tomar Foto</button>
                </>
            ) : (
                <>
                    <img src={img} alt="screenshot" />
                    <button type="button" className="bg-red-500 text-white border-none rounded-[25px] mt-[10px]  px-[40px] py-[10px] cursor-pointer" onClick={() => setImg(undefined)}>Retomar Foto</button>
                </>
            )}
        </div>
    )
}