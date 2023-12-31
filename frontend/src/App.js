import React, {useState, useMemo} from "react";
import styled from "styled-components";
import bg from "./img/bg.png";
import {MainLayout} from "./styles/Layouts";
import Orb from "./Components/Orb/Orb";
import Navigation from "./Components/Navigation/Navigation";
import Dashboard from "./Components/Dashboard/Dashboard";
import Income from "./Components/Income/Income";
import Signup from "./Components/Signup/Signup";
import Login from "./Components/Login/Login";
import Protected from "./utils/Protected";
import Download from "./Components/Download/Download";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import {useGlobalContext} from "./context/globalContext";

function App() {
    const {username, isAuthenticated} = useGlobalContext();
    const [active, setActive] = useState(1);

    //const global = useGlobalContext();
    //console.log(global);
    const displayData = () => {
        switch (active) {
            case 1:
                return <Dashboard/>;
            case 2:
                return <Income/>;
            case 3:
                return <Download/>;
            default:
                return <Dashboard/>;
        }
    };

    const orbMemo = useMemo(() => {
        return <Orb/>;
    }, []);

    return (
        <AppStyled bg={bg} className="App">
            {/*{orbMemo}*/}
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login/>}/>
                    <Route path="/signup" element={<Signup/>}/>{" "}

                    {/* { console.log("Authenticated " + isAuthenticated)} */}

                    <Route
                        path="/dashboard"
                        element={
                            <Protected isLoggedIn={isAuthenticated}>
                                <MainLayout>
                                    <Navigation
                                        active={active}
                                        setActive={setActive}
                                        user={username}
                                    />
                                    <main>{displayData()}</main>
                                </MainLayout>
                            </Protected>
                        }
                    />

                </Routes>
            </BrowserRouter>
        </AppStyled>
    );
}

const AppStyled = styled.div`
  height: 100vh;
  background-image: url(${(props) => props.bg});
  position: relative;
  main {
    flex: 1;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #ffffff;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    overflow-x: hidden;
    &::-webkit-scrollbar {
      width: 0;
    }
  }
`;

export default App;
