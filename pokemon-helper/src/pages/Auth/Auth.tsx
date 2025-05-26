import { Button, Input } from "antd";
import styles from "./Auth.module.css";
import { useState } from "react";
import { authFx } from "./store";
export const Auth = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const handleAuth = () => {
    authFx({ login, password });
  };
  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <Input
          placeholder="Login"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />
        <Input
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />
        <Button onClick={handleAuth}>Войти</Button>
      </div>
    </div>
  );
};
