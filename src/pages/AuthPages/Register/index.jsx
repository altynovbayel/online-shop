import React from 'react';
import c from './Register.module.scss'
import {api} from "../../../config/api";
import {Link} from "react-router-dom";
import {useForm} from "react-hook-form";

function Register() {
  const [error, setError] = React.useState(null)
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
      api.registerUser(data)
        .then(res => {
          if (res) {
            console.log(res.data);
          }
        })
        .catch(e => e && setError(e.response.data.username[0]))
      setTimeout(() => {
        api.getToken({username: data.username, password: data.password})
          .then(res => {
            localStorage.setItem('accessToken', res.data.access)
            localStorage.setItem('refreshToken', res.data.refresh)
          })
      }, 1000)
    }
  }
  
  return (
    <div className={c.register}>
      <form
        className={c.register_form}
        onSubmit={handleSubmit(data => handleRegister(data))}
      >
        <div className={c.form_title}>
          <h2>Регистрация</h2>
        </div>
        
        <div className={c.form_inputs}>
          {
            error && <span style={{textAlign: 'center', margin:'20px 0'}}>{error}</span>
          }
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
            <p>Email</p>
            {
              errors.email && <span className={c.error_text}>⚠ Обязательное поле</span>
            }
            <input
              type="email"
              placeholder='Email'
              {...register("email", {required: '⚠ Обязательное поле',})}
            />
          </div>
          <div>
            <p>Номер телефона</p>
            {
              errors.phone_number && <span className={c.error_text}>⚠ Обязательное поле</span>
            }
            <input
              type="text"
              defaultValue={'+996'}
              placeholder='Номер телефона'
              {...register("phone_number", {required: '⚠ Обязательное поле',})}
            />
          </div>
          <div>
            <p>Дата рождения</p>
            {
              errors.birth_date && <span className={c.error_text}>⚠ Обязательное поле</span>
            }
            <input
              type="date"
              {...register("birth_date", {required: '⚠ Обязательное поле',})}
            />
          </div>
          <div>
            <p>Обо мне</p>
            {
              errors.about && <span className={c.error_text}>⚠ Обязательное поле</span>
            }
            <textarea
              placeholder='Обо мне'
              {...register("about", {required: '⚠ Обязательное поле',})}
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
              Регистрация
            </button>
          </div>
      
          <p className='have__account'>
            <Link to={'/auth/login'}>
              Есть аккаунт?
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Register