import { useRef, useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./login.css";
import axios from "../api/axios";
import { Myinput, MyinputPasswordLogin } from "../components/input/Myinput";
import loginlogo from "../assets/logo1.webp";
import { MyButtonmedium } from "../components/button/Buttoncomponents";
const LOGIN_URL = "/mezi_be/auth/auth.php";

const Login = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/home";
  const errRef = useRef();
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    setErrMsg("");
  }, [email, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ email: email, password: pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(JSON.stringify(response?.data));
      console.log(JSON.stringify(response));
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      console.log(roles);
      setAuth({
        email,
        roles,
        accessToken,
      });
      navigate(from, { replace: true });
      setEmail("");
      setPwd("");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("Szerver nem válaszol!");
      } else if (err.response?.status === 400) {
        setErrMsg("Hibás jelszó vagy email");
      } else if (err.response?.status === 401) {
        setErrMsg("Nincs jogosultság!");
      } else {
        setErrMsg("Sikertelen bejelentkezés!");
      }
      errRef.current.focus();
    }
  };

  return (
    <div className="backgroundlog">
      <div className="logDiv">
        <div className="imgBox">
          <h1 className="logh1">Bejelentkezés</h1>
          <img
            src={loginlogo}
            loading="lazy"
            alt="Mézishop logó"
            title="Mézishop logó"
            className="imgLogo"
          />
          <p className="logP">
            Még nem regisztrált?
            <br />
            <span className="line">
              <Link to="/register">Regisztráció</Link>
            </span>
          </p>
        </div>
        <section className="logBox">
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <form onSubmit={handleSubmit}>
            <Myinput
              type="email"
              id="email"
              label="E-mail cím:"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
            <MyinputPasswordLogin
              label="Jelszó:"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
            />
            <div className="btnBox">
              <MyButtonmedium
                className="loginBtn"
                value="Bejelentkezés"
              ></MyButtonmedium>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default Login;
