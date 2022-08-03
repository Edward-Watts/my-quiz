import React, { useEffect} from "react";
import {useLocation, useParams} from "react-router"


const ScoreCard = () => {
    const location = useLocation();
    const params = useParams()

    useEffect(() => {
        console.log('location-------------------', location)
        console.log('params-------------------', params)
    },[location])

    return (
        <div className="d-flex justify-content-center align-items-center" style={{}}>
            <div className="card shadow border-0" style={{width:"80rem", height: "auto"}}>
                <div className="pt-5 pb-2">
                    <h1>Your Score:</h1>
                </div>
                <div className="fs-1 fw-bold py-2">{params.score}/15</div>
                <div className="pt-2">
                    {location?.state?.map((item, index) => (
                    <div key={index}>
                    <div className="d-flex justify-content-center py-1">
                        <p>{index + 1}. {item.question}</p> 
                        {item.result === 1 ? 
                            <div><i className="bi bi-check-circle-fill text-success m-2" style={{width: "30px", height: "30px"}}></i></div>
                             : <div><i className="bi bi-x-circle-fill text-danger m-2" style={{width: "30px", height: "30px"}}></i></div>}
                    </div>
                </div>))}
                </div>
            </div>
        </div>  
    )
} 

export default ScoreCard;