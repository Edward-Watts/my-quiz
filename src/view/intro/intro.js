import React from "react";
import { useNavigate } from "react-router-dom";

import "./intro.css"

const Intro = () => {

    let navigate = useNavigate();

    const beginHandler = () => {
        navigate('quiz');
    }

    return (
        <div className="intro d-flex justify-content-center align-items-center">
            <div className="">
                <h1 className="pb-3 fs-1">Welcome to this game!</h1>
                <p className="fs-4">You will be presented with 15 <strong>true</strong> or <strong>false</strong> questions.</p>
                
                <div className="py-2">
                    <h3 className="fs-2">Can you score 100%?</h3>
                    <div className="pt-3">
                        <button className="btn btn-success px-5 fw-bold" onClick={beginHandler}>BEGIN</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Intro;