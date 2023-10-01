import React from "react";
import { useState } from "react";

const Test: React.FC = () =>{

const url = "/api";
//const [count, setCount] = useState(0);
const [dataV1, setDataV1] = useState (null);


function getDataFromServer() {
    fetch(url+"/v1")
        .then((response) => response.json())
        .then((data) => 
        setDataV1(data.message))
}

    return (<div>
        <p className="text-[#ffff]">{ dataV1 }</p>        
        <button className="text-[#ffff]" onClick={getDataFromServer}>
            obtener mensaje de server
        </button>
    
    </div>)
}


export default Test;