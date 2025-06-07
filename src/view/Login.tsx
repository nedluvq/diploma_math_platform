import React from "react";
import styles from "./login.module.css";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import Typography from '@mui/material/Typography';
import image from '../assets/avatar.png'
import { Link } from "react-router";

const Login: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <form>
        <img className={styles.avatar} src={image} />
        <Typography className={styles.headerText} variant="h4">Вход или регистрация</Typography>
        <TextField autoFocus type="email" name="email" className={styles.field} label="Электронная почта или имя пользователя"/>
        <TextField id="password" type="password" name="password" className={styles.field} label="Пароль"/>
        <Link to="/main" className={styles.forgotPassword}>
          <Button className={styles.submit} variant="outlined">Продолжить</Button></Link>
        <div className={styles.registration}>
          <Typography>Нет аккаунта?</Typography>
          <Typography>Зарегистрироваться</Typography></div>
      </form>
    </div>
  );
};

export default Login;
