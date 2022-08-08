import { NextPage } from "next";
import { ChangeEvent, FormEvent, useState } from "react";
import Button from "../components/Button/Button";
import Input from "../components/Inputfields/Input";

type UserProps = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
};

const SignUpPage: NextPage = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const rating = 0;
  const favorite = [];

  async function handleOnSubmit(event: FormEvent) {
    event.preventDefault();
    const data: UserProps = {
      firstname,
      lastname,
      email,
      password,
    };
  }
  return (
    <div className="p-4">
      <div className="h-[calc(73.5vh)] w-full flex flex-col justify-center items-center text-BG-text space-y-4">
        <Input
          name="firstname"
          value={firstname}
          placeholder="Firstname"
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setFirstname(event.target.value);
          }}
        />
        <Input
          name="lastname"
          value={lastname}
          placeholder="Lastname"
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setLastname(event.target.value);
          }}
        />
        <Input
          name="email"
          value={email}
          placeholder="Email"
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setEmail(event.target.value);
          }}
        />
        <Input
          name="password"
          value={password}
          placeholder="Password"
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setPassword(event.target.value);
          }}
        />
        <div className="pr-16 pb-2">
          <Button
            type="submit"
            onClick={handleOnSubmit}
            value="Sign up"
            selected={false}
          />
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
