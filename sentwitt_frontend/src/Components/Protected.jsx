import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";


export default function Protected() {
    const navigate = useNavigate();
    
    useEffect(() => {
        if(!localStorage.getItem('auth_token')) {
            navigate("/");
        }
    });
    
    return <Outlet/>;
}