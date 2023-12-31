import React, {useState, useEffect} from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {BASE_URL, useGlobalContext} from "../../context/globalContext";
import Button from "../Button/Button";
import {plus} from "../../utils/Icons";
import axios from "axios";
import * as XLSX from "xlsx";

function Form() {
    const {
        error,
        setError,
        username,
        addTransaction,
        getTransactions,
    } = useGlobalContext();

    const [errorUpload, setErrorUpload] = useState();

    const [inputState, setInputState] = useState({
        // title: '',
        amount: "",
        type: "",
        date: "",
        description: "",
        file: null, // Added file state
    });

    const {amount, type, date, description, file} = inputState;

    const uploadFile = async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        try {
            const response = await axios.post(`${BASE_URL}upload-file/`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            getTransactions({ username: username, amount: "" });

            setErrorUpload(response.data.message);
            // Handle the response or perform any necessary operations
        } catch (error) {
            setErrorUpload(error.response.data.message);
            // Handle the error or display an error message to the user
        }
    };
    const handleInput = (name) => (e) => {
        setInputState({...inputState, [name]: e.target.value});
        setError("");
    };

    const handleFileUpload = (e) => {
        const uploadedFile = e.target.files[0];
        setInputState({...inputState, file: uploadedFile});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(date);
        addTransaction({
            title: username,
            amount: amount,
            type: type,
            date: date,
            description: description,
        });
        setInputState({
            title: "",
            type: "",
            amount: "",
            date: "",
            description: "",
            file: null, // Reset the file state
        });
    };

    const handleUpload = (e) => {
        e.preventDefault();
        if (file) {
            uploadFile(file);
        }
    };

    return (
        <FormStyled onSubmit={handleSubmit}>
            {error && <p className="error">{error}</p>}
            <div className="input-control">
                <input
                    type="text"
                    value={username}
                    name={"title"}
                    placeholder="Salary Title"
                    readOnly={true}
                    onChange={handleInput("title")}
                />
            </div>
            <div className="input-control">
                <input
                    value={amount}
                    type="text"
                    name={"amount"}
                    placeholder={"Amount"}
                    onChange={handleInput("amount")}
                />
            </div>
            <div className="input-control">
                <label className="radio-label">
                    <input
                        type="radio"
                        value="Credit"
                        checked={type === "Credit"}
                        onChange={handleInput("type")}
                    />
                    Credit
                </label>
                <label className="radio-label">
                    <input
                        type="radio"
                        value="Debit"
                        checked={type === "Debit"}
                        onChange={handleInput("type")}
                    />
                    Debit
                </label>
            </div>

            <div className="input-control">
                <DatePicker
                    id="date"
                    placeholderText="Enter A Date"
                    selected={date}
                    dateFormat="dd/MM/yyyy"
                    onChange={(date) => {
                        setInputState({...inputState, date: date});
                    }}
                />
            </div>
            <div className="input-control">
        <textarea
            name="description"
            value={description}
            placeholder="Add A Reference"
            id="description"
            cols="30"
            rows="4"
            onChange={handleInput("description")}
        ></textarea>
            </div>
            <div className="submit-btn">
                <Button
                    type="submit" // Change the button type to "submit"
                    name={"Add Credit"}
                    icon={plus}
                    bPad={".8rem 1.6rem"}
                    bRad={"30px"}
                    bg={"var(--color-accent)"}
                    color={"#fff"}
                />
            </div>

            <div>Upload a file</div>
            <form>
                {errorUpload && <p className="error">{errorUpload}</p>}
                <input type="file" name="file" onChange={handleFileUpload}/>
                <Button
                    type="submit" // Change the button type to "submit"
                    name={"Upload File"}
                    bPad={".8rem 1.6rem"}
                    bRad={"30px"}
                    bg={"var(--color-accent)"}
                    color={"#fff"}
                    onClick={handleUpload}
                />
            </form>
        </FormStyled>
    );
}

const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  input,
  textarea,
  select {
    font-family: inherit;
    font-size: inherit;
    outline: none;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    border: 2px solid #fff;
    background: transparent;
    resize: none;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    color: rgba(34, 34, 96, 0.9);

    &::placeholder {
      color: rgba(34, 34, 96, 0.4);
    }
  }

  .input-control {
    input {
      width: 100%;
    }
  }

  .input-control {
    display: flex;
    align-items: space-between;
    /* Align items vertically in the center */
  }

  .radio-label {
    display: flex;
    align-items: center;
    margin-right: 2rem; /* Adjust the margin as needed */
    gap: .5vw;
  }

  .selects {
    display: flex;
    justify-content: flex-end;

    select {
      color: rgba(34, 34, 96, 0.4);

      &:focus,
      &:active {
        color: rgba(34, 34, 96, 1);
      }
    }
  }

  .submit-btn {
    button {
      box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);

      &:hover {
        background: var(--color-green) !important;
      }
    }
  }
`;
export default Form;
