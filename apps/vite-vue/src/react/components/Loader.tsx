import React, { useState, useEffect } from 'react';
// Use npm i --save-dev @types/react-query
import { useQuery } from 'react-query'; //from "@tanstack/react-query";
import Spinner from 'react-bootstrap/Spinner';

// @https://tanstack.com/query/v4/docs/framework/react/reference/useQuery

/// Loader ///
export default function Loader() {

    const [request, setRequest] = useState<string>("init");
    const [data5, setData5] = useState<string>("");

    const alpha = () => {
        //setTimeout(() => {console.log('ok')}, 3000)
        let j=0
        for (let i=0; i<900000; i++) {
            for (let i=0; i<900; i++) {
                Math.random()
            }
        }

        return 'datablop' + (Math.ceil(Math.random() * 10) + 100)
    };

    //const { data: d1, isFetching: f1, isLoading: load1, isSuccess: s1 } = useQuery([request], () => {});
    //if (load1) { }

    /*useEffect(() => {
        if (s1) {
            setData5(d1) // use useEffect "dependencies list" otherwise infinite loop !!!
        }
    }, [s1, d1]);*/

    function sleep(ms) {
        // use sleep(2000).then(() => { console.log('World!'); });
        return new Promise(res => setTimeout(res, ms))
    }

    const Btn = () => {
        return <>
            <button type="submit" onClick={() => setRequest(request+"1")}>aze</button>
            {load1 && <Spinner animation="border" role="status">
                <span className="visually-hidden"></span>
            </Spinner>}
            {s1 && <div>{data5}</div>}
        </>
    }

    return <div>Loader -WIP-</div>
}
