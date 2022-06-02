import GoogleIcon from "../../../public/google.svg";
import FacebookIcon from "../../../public/facebook.svg";
import { signIn } from "next-auth/react";
import { useState } from "react";
import Button from "../../../components/Button/Button";

export default function SignIn() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <div className="flex w-screen h-2/3 justify-around items-center px-4">
      <div className="flex-col text-center space-y-4 text-BG-text">
        <p>Sign in with</p>
        <div className="flex w-1/2 justify-around mx-auto items-center">
          <GoogleIcon type={"button"} onClick={() => signIn()} />
          <FacebookIcon />
        </div>
        <p>or</p>
        <input
          className="w-full py-3 indent-4 bg-BG rounded-md"
          placeholder="E-mail"
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <input
          className="w-full py-3 indent-4 bg-BG rounded-md"
          placeholder="Password"
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <Button
          bgColor={"primary"}
          value={"Sign In"}
          onClick={() => {}}
          py={2}
          width={"1/3"}
          type={"submit"}
        />
      </div>
    </div>
  );
}
