import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/globalContext';
import Button from '../Button/Button';
import { Link,useNavigate } from 'react-router-dom';


function Login() {
  const {authUser, error, setError} = useGlobalContext()
  const [inputState, setInputState] = useState({
      username: '',
      password: '',
  })
   const navigate=useNavigate();

  const {username, password } = inputState;

  const handleInput = name => e => {
      setInputState({...inputState, [name]: e.target.value})
      setError('')
  }

  const handleSubmit = e => {
      e.preventDefault()
      authUser(inputState)
      setInputState({
        username: '',
        password: '',
      })

      navigate("/dashboard");
  }
//   useEffect(() => {
//     if (authUser(inputState)) {
//       // res.redirect('/dashboard');
//       navigate("/dashboard");
//     }
//   }, [authUser, inputState])

  return (
      <FormStyled onSubmit={handleSubmit}>
          {error && <p className='error'>{error}</p>}
          <h1>SignIn</h1>
          <div className="input-control">
              <input 
                  type="text" 
                  value={username}
                  name={'username'} 
                  placeholder="Username"
                  onChange={handleInput('username')}
              />
          </div>
          <div className="input-control">
              <input value={password}  
                  type="password" 
                  name={'password'} 
                  placeholder={'Password'}
                  onChange={handleInput('password')} 
              />
          </div>
          <div className="submit-btn">
              <Button 
                  name={'SignIn'}
                  bPad={'.8rem 1.6rem'}
                  bRad={'30px'}
                  bg={'var(--color-accent'}
                  color={'#fff'}
              />
          </div>
          <p>Don't have an account? <Link to="/signup">SignUp</Link></p>
      </FormStyled>
  )
}


const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  width:100vw;
  height:90vh;
  input, textarea, select{
      font-family: inherit;
      font-size: inherit;
      outline: none;
      border: none;
      padding: .5rem 1rem;
      border-radius: 5px;
      border: 2px solid #fff;
      background: transparent;
      resize: none;
      box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
      color: rgba(34, 34, 96, 0.9);
      &::placeholder{
          color: rgba(34, 34, 96, 0.4);
      }
  }
  .input-control{
      input{
          width: 100%;
      }
  }

  .selects{
      display: flex;
      justify-content: flex-end;
      select{
          color: rgba(34, 34, 96, 0.4);
          &:focus, &:active{
              color: rgba(34, 34, 96, 1);
          }
      }
  }

  .submit-btn{
      button{
          box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
          &:hover{
              background: var(--color-green) !important;
          }
      }
  }
`;


export default Login
