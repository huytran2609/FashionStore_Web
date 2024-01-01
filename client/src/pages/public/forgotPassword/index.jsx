import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiResetPassword } from "~/apis/user";
import config from "~/config";
import Swal from "sweetalert2";

function ForgotPassword() {
    const [password, setPassword] = useState('');
    const {token} = useParams();
    const navigate = useNavigate();

    const handleResetPassword = async() => {
        const response = await apiResetPassword({password, token});
        if(response.success){
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: response.mes,
            }).then(() => {navigate(config.login)})
        }
        else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: response.mes,
            }).then(() => {navigate(config.login)})
        }
    }

    return (
        <div className="flex flex-col gap-4 mt-5 w-1/2 justify-center pl-12">
            <label htmlFor="email" className="pl-1">
                Enter your new password:
            </label>
            <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password..."
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            />
            <div className="flex items-center justify-end w-30">
                <button
                    onClick={handleResetPassword}
                    type="submit"
                    className="bg-blue-600 rounded-md border border-blue-600 text-white text-[14px] w-25 p-2 hover:bg-blue-700 hover:text-white"
                >
                    Submit
                </button>
            </div>
        </div>
    );
}

export default ForgotPassword;
