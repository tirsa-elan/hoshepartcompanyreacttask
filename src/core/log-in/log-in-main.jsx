

import { useForm } from 'react-hook-form';
import './log-in-main.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import img from '../../share/imges/log-in-img.png'
import {getCaptcha} from '../../share/http-services/log-in-service.js'
import { useNavigate } from 'react-router-dom';
import {logInProject} from '../../share/http-services/log-in-service.js'
import { useEffect, useState } from 'react';
import { Snackbar, Alert } from '@mui/material';
export default function LogIn() {
const [saltcaptcha , setsaltcaptcha] = useState({
        salt : '',
        captcha : ''
    })
const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm();
    const navigate = useNavigate()

const [alert, setAlert] = useState({
    open: false,
    message: '',
    severity: 'success'
});

 const onSubmit = async (event) => {
    event.salt = saltcaptcha.salt
    try {
        
        const res = await logInProject(event);

        localStorage.setItem('access_token', res.data.access_token);

        setAlert({
            open: true,
            message: 'ورود با موفقیت انجام شد',
            severity: 'success'
        });

        navigate('/home/tasklist');

    } catch (error) {
        setAlert({
            open: true,
            message:  'خطا در ورود',
            severity: 'error'
        });
    }
};

    useEffect(() =>{
        getCaptcha().then((res) =>{
            console.log(res.data.salt + 'cap')
            setsaltcaptcha({
                salt:res.data.salt,
                captcha : res.data.captcha
            })
            
        })
    },[])
    return (
        <>

            <div className='log-in-main-container'>
                <div className='row'>

                    <div className='col-sm-12 col-lg-5 log-rejestire-img'>
                        <img src={img} alt="" />
                    </div>

                    <div className='col-sm-12 col-md-12 col-lg-7'>
                        <div className="tab-form-conatiner">
                            <form className='form-container' onSubmit={handleSubmit(onSubmit)}>
                                <div >
                                    <span> نام کاربری</span>
                                    <input

                                        {...register("username", {
                                            required: "وارد کردن نام کاربری الزامی است",

                                        })}

                                        type="text" />
                                    {errors.username && <span  className='error-span' > نام کاربری وارد کنید</span>}

                                </div>
                                   <div >
                                    <span>  رمز عبور</span>
                                    <input

                                        {...register("password", {
                                            required: "وارد کردن پسورد  الزامی است",

                                        })}

                                        type="text" />
                                    {errors.password && <span className='error-span' >  پسورد را وارد کنید</span>}

                                </div>
                                      <div >
                                    <span> عدد در تصویر وارد کنید </span>
                                     <div Style={'display:flex;justify-content:space-between;width:100%;flex-direction: row;'}>
                                          <input
                                          Style={'width:58%'}
                                        type="text"
                                         {...register("captcha_answer", {
                                            required: "وارد کردن نام کاربری الزامی است",

                                        })} />
                                        <img src={saltcaptcha.captcha} alt="" Style={'width:40%;border-radius:20px'} />
                                     </div>
                                    

                                </div>
                                <button className="log-in-btn" >{isSubmitting ? 'در حال بررسی...' : 'ورود'}</button>
                            </form>
                        </div>
                    </div>


                </div>
            </div>

            <Snackbar
    open={alert.open}
    autoHideDuration={3000}
    onClose={() => setAlert({ ...alert, open: false })}
    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
>
    <Alert
        severity={alert.severity}
        variant="filled"
        onClose={() => setAlert({ ...alert, open: false })}
    >
        {alert.message}
    </Alert>
</Snackbar>


        </>
    )
}