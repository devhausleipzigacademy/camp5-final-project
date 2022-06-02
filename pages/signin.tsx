// import GoogleIcon from "../../../public/google.svg";
// import FacebookIcon from "../../../public/facebook.svg";
// import { signIn } from "next-auth/react";
// import { useState } from "react";
// import Button from "../../../components/Button/Button";

// export default function SignIn() {
// const [email, setEmail] = useState<string>("");
// const [password, setPassword] = useState<string>("");

// return (
//     <div className="flex w-screen h-2/3 justify-around items-center px-4">
//     <div className="flex-col text-center space-y-4 text-BG-text">
//         <p>Sign in with</p>
//         <div className="flex w-1/2 justify-around mx-auto items-center">
//         <GoogleIcon type={"button"} onClick={() => signIn()} />
//         <FacebookIcon />
//         </div>
//         <p>or</p>
//         <input
//         className="w-full py-3 indent-4 bg-BG rounded-md"
//         placeholder="E-mail"
//         name="email"
//         type="email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         ></input>
//         <input
//         className="w-full py-3 indent-4 bg-BG rounded-md"
//         placeholder="Password"
//         name="password"
//         type="password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         ></input>
//         <Button
//         bgColor={"primary"}
//         value={"Sign In"}
//         onClick={() => {}}
//         py={2}
//         width={"1/3"}
//         type={"submit"}
//         />
//     </div>
//     </div>
// );
// }
import React from "react";
import {
  getProviders,
  signIn,
  getSession,
  getCsrfToken,
} from "next-auth/react";
import { NextPageContext } from "next";

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

export default function signin({ providers, csrfToken }: ProvidersList) {
  console.log(Object.values(providers));
  const signInHandler = (provider: Providers) => {
    if (provider.id === "credentials") {
      signIn(provider.id, { username: "admin@admin.com", password: "admin" });
    } else {
      signIn(provider.id);
    }
  };
  return (
    <div className="pt-16">
      {Object.values(providers).map((provider) => {
        return (
          <div key={provider.name}>
            <button onClick={() => signInHandler(provider)}>
              Sign in with {provider.name}
            </button>
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
      Location: "/",
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
