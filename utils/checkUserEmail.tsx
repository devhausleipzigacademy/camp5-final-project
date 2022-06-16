import axios from "axios";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";

export const GetUserEmail = async (
  session: Session
): Promise<string | undefined> => {
  if (!session) {
    return;
  } else {
    const userEmail = session!.user!.email;
    let dbUserEmail: string;
    try {
      dbUserEmail = await fetch(
        `http://localhost:3000/api/user_email?email=${userEmail}`,
        {
          method: "GET",
        }
      ).then((r) => r.json());
    } catch (err) {
      console.log(err);
    }
  }
};
