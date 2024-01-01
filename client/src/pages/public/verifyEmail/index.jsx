import {useParams, useNavigate} from 'react-router-dom';
import config from '~/config';
import Swal from 'sweetalert2';
import { useEffect } from 'react';

function VerifyEmail() {

    const {status} = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        if(status === 'failed') {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Link verify email is expired!',
            }).then(() => {
                navigate(config.login)
            })
        }
        if(status === 'success') {
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Your account has been verified!',
            }).then(() => {
                navigate(config.login)
            })
        }
    })


    return ( 
        <div className='h-screen bg-gray-100 w-screen'></div>
     );
}

export default VerifyEmail;