import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Image from "next/image";
import Button from "../components/Button/Button";

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

    const loading = status === "loading";

    if (loading) {
        return <p>Loading...</p>;
    }
    console.log(session?.user);

    return (
        <>
            <div className="flex h-2/3 justify-around items-center">
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
                    <p>{session?.user!.name}</p>
                    <p>{session?.user!.email}</p>
                    <div className="flex-col space-y-2 pt-2 text-center">
                        <div className="flex">
                            <Button
                                value={"Sign Out"}
                                onClick={() => signOut()}
                                selected={false}
                                type={"submit"}
                            />
                        </div>
                        <div className="flex">
                            <Button
                                value={"Let's Swap"}
                                onClick={() => goHome()}
                                selected={false}
                                type={"submit"}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
