import React, { useState } from "react";
import {
  getProviders,
  signIn,
  getSession,
  getCsrfToken,
} from "next-auth/react";
import { NextPageContext } from "next";
import GoogleIcon from "../public/google.svg";
import FacebookIcon from "../public/facebook.svg";
import Button from "../components/Button/Button";

interface ProvidersList {
  providers: Providers;
  csrfToken: string;
}

interface Providers {
  id: string;
  name: string;
  type: string;
  signinUrl: string;
  callbackUrl: string;
}

export function Google(provider: Providers) {
  return <GoogleIcon type={"button"} onClick={() => signIn(provider.id)} />;
}

export function Facebook(provider: Providers) {
  return <FacebookIcon type={"button"} onClick={() => signIn(provider.id)} />;
}

export function Credentials(provider: Providers) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const signInHandler = (provider: Providers) => {
    if (provider.id === "credentials") {
      signIn(provider.id, { userid: "admin@admin.com", password: "admin" });
    } else {
      signIn(provider.id);
    }
  };

  return (
    <>
      <div className="flex-col space-y-3 text-center w-full">
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
          value={"Sign In"}
          onClick={() =>
            signIn(provider.id, { username: email, password: password })
          }
          type={"submit"}
          selected={false}
        />
      </div>
      {/* <pre>
        email: {email}, password: {password}
      </pre> */}
    </>
  );
}

export default function signin({ providers, csrfToken }: ProvidersList) {
  return (
    <div className="h-[calc(73.5vh)] pt-16 flex flex-col justify-center px-4 items-center text-BG-text">
      <p className="py-2">Sign In With</p>
      <div className="flex justify-center space-x-4 w-screen pl-4">
        {Object.values(providers).map((provider) => {
          return (
            <div key={provider.name}>
              {provider.name === "Google"
                ? Google(provider)
                : provider.name === "Facebook"
                ? Facebook(provider)
                : null}
            </div>
          );
        })}
      </div>
      <p className="py-2">or</p>
      {Object.values(providers).map((provider) => {
        return (
          <div key={provider.name}>
            {provider.name === "credentials" ? Credentials(provider) : null}
          </div>
        );
      })}
    </div>
  );
}

signin.getInitialProps = async (context: NextPageContext) => {
  const { req, res } = context;
  const session = await getSession({ req });

  if (session && res && session.accessToken) {
    res.writeHead(302, {
      Location: "/welcome",
    });
    res.end();
    return;
  }
  return {
    session: undefined,
    providers: await getProviders(),
    csrfToken: await getCsrfToken(context),
  };
};

// export async function getServerSideProps(context: any) {
//   const { req } = context;
//   const session = await getSession({ req });

// if (session) {
//   return {
//     redirect: { destination: "/" },
//   };
// }

//   return {
//     props: {
//       providers: await getProviders(),
//       csrfToken: await getCsrfToken(context),
//     },
//   };
// }
