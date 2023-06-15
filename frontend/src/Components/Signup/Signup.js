import React, { useState } from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/globalContext';
import Button from '../Button/Button';

function Signup() {
  const {addUser, error, setError} = useGlobalContext()
  const [inputState, setInputState] = useState({
      name: '',
      username: '',
      password: '',
  })

  const {name, username, password } = inputState;

  const handleInput = name => e => {
      setInputState({...inputState, [name]: e.target.value})
      setError('')
  }

  const handleSubmit = e => {
      e.preventDefault()
      addUser(inputState)
      setInputState({
        name: '',
        username: '',
        password: '',
      })
  }

  return (
      <FormStyled onSubmit={handleSubmit}>
          {error && <p className='error'>{error}</p>}
          <h1>SignUp</h1>
          <div className="input-control">
              <input 
                  type="text" 
                  value={name}
                  name={'name'} 
                  placeholder="Name"
                  onChange={handleInput('name')}
              />
          </div>
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
                  name={'SignUp'}
                  bPad={'.8rem 1.6rem'}
                  bRad={'30px'}
                  bg={'var(--color-accent'}
                  color={'#fff'}
              />
          </div>
      </FormStyled>
  )
}


const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  height:80vh;
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


export default Signup
