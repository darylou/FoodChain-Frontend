import { useEffect } from 'react';
import {useMoralis} from 'react-moralis';
import {useNavigate} from 'react-router-dom';
function Login() {
    const { authenticate, isAuthenticated } = useMoralis();
    const navigate = useNavigate();
    useEffect(()=>{
        if (isAuthenticated){
            navigate("/minter");
        }
    });
    return(
        <div className="flex w-screen h-screen justify-center items-center">
            <button onClick={authenticate} className = "border-[1px] p-2 border-black">Login to MetaMask</button>
        </div>
    )
}

export default Login;