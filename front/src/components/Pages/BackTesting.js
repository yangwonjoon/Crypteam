import React, { useState } from "react";
import axios from "axios";

const BackTesting = () => {

        const [coinName, setCoinName] = useState("");
        const [parameter, setParameter] = useState("");
        const [term, setTerm] = useState("");
        const [testSize, setTestSize] = useState("");
        const [imgPath, setImgPath] = useState("");
        const [result, setResult] = useState("");

        const handleSubmit = (e) => {
            e.preventDefault(); //기본 폼 제출 방지
        
            const formData = { coin_name: coinName, parameter, term, test_size: testSize, ImgPath: imgPath };
        
            axios.post("/api/start_bot", formData) //백엔드에 post 요청
            .then(res => setResult(JSON.stringify(res.data)))
            .catch(err => console.log(err));
        };

    return(
        <>
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="coinName">Coin Name:</label>
                <input type="text" id="coinName" value={coinName} onChange={(e) => setCoinName(e.target.value)} />
            </div>
            <div>
                <label htmlFor="parameter">Parameter:</label>
                <textarea id="parameter" value={parameter} onChange={(e) => setParameter(e.target.value)}></textarea>
            </div>
            <div>
                <label htmlFor="term">Term:</label>
                <input type="number" id="term" value={term} onChange={(e) => setTerm(e.target.value)} />
            </div>
            <div>
                <label htmlFor="testSize">Test Size:</label>
                <input type="number" id="testSize" value={testSize} onChange={(e) => setTestSize(e.target.value)} />
            </div>
            <div>
                <label htmlFor="imgPath">Image Path:</label>
                <input type="text" id="imgPath" value={imgPath} onChange={(e) => setImgPath(e.target.value)} />
            </div>
            <button type="submit">Start Bot</button>  
            <div> 
                <pre>{result}</pre>
            </div>
        </form>
        </>
    )
};

export default BackTesting;