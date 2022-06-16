import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Image from "next/image";
import Button from "../components/Button/Button";
import Link from "next/link";

export default function Welcome() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    console.log(session, status);
    if (status === "unauthenticated") {
      router.push("/signin");
    }
  }, [status]);

  function goHome() {
    router.push("/");
  }

  function signout() {
    router.push("/signin");
    signOut();
  }

  const loading = status === "loading";

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="flex w-screen h-2/3 justify-around items-center">
        <div className="flex-col text-center space-y-2">
          {session && (
            <span>
              <Image
                src={session!.user!.image as string}
                alt={session!.user!.name as string}
                width={80}
                height={80}
                className={"rounded-full"}
              />
            </span>
          )}
          <p className="font-semibold">Welcome!</p>
          <p>{session!.user!.name}</p>
          <p>{session!.user!.email}</p>
          <div className="flex-col space-y-2 pt-2 text-center w-full h-full">
            {/* <Link href="/">
              <a> */}
            <Button
              value={"Sign Out"}
              onClick={() => signOut({ callbackUrl: "/signin" })}
              selected={false}
              type={"button"}
            />
            {/* </a>
            </Link> */}
            <Button
              value={"Let's Swap"}
              onClick={() => goHome()}
              selected={false}
              type={"button"}
            />
          </div>
        </div>
      </div>
    </>
  );
}
