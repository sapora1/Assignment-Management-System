import React, { useEffect, useState } from "react"
import './Login.css';

export default function () {
    const [quote, setquote] = useState("Well done is better than well said.");
    const [author, setauthor] = useState("Benjamin Franklin");
    useEffect(() => {
        const x=Math.floor(Math.random() * 1600);
        const fetchdata = async () => {
            fetch("https://type.fit/api/quotes")
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log(data);
                setquote(data[x].text);
                setauthor(data[x].author);
            });
        };
        fetchdata();
    },[]);
    return (
        <div className="title">
            <h2 style={{ textAlign: 'center', color: 'white',width:'400px' }}>
                "{quote}"
            </h2>
            <h4 style={{float:'right', marginRight:'40px'}}>- {author}</h4>
        </div>
    )
};