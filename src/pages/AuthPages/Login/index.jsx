import React from 'react';
import c from "../Register/Register.module.scss";
import {Link} from "react-router-dom";
import {useForm} from "react-hook-form";
import {api} from "../../../config/api";

function Login() {
  const {
    register,
    handleSubmit,
    formState: {errors, isValid},
    reset
  } = useForm({
    mode: 'OnChange',
  })
  const handleRegister = (data) => {
    console.log(data)
    if(data) {
      api.getToken(data)
        .then(r => {
          localStorage.setItem('accessToken', r.data.access)
          localStorage.setItem('refreshToken', r.data.refresh)
        })
    }
  }
  return (
    <div className={c.register}>
      <form
        className={c.register_form}
        onSubmit={handleSubmit(data => handleRegister(data))}
      >
        <div className={c.form_title}>
          <h2>Вход</h2>
        </div>
        <div className={c.form_inputs}>
          <div>
            <p>Имя пользователя</p>
            {
              errors.username && <span className={c.error_text}>⚠ Обязательное поле</span>
            }
            <input
              type="text"
              placeholder='Имя пользователя'
              {...register("username", {required: '⚠ Обязательное поле',})}
            />
  
          </div>
          <div>
            <p>Пароль</p>
            {
              errors.password && <span className={c.error_text}>⚠ Обязательное поле</span>
            }
            <input
              type="password"
              placeholder='Пароль'
              {...register("password", {required: '⚠ Обязательное поле',})}
            />
          </div>
          <div>
            <button disabled={!isValid}>
              Вход
            </button>
          </div>
        
          <p className='have__account'>
            <Link to={'/auth/register'}>
              Еще нет аккаунта?
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;