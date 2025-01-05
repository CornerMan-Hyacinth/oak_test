"use server";

import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { SessionProps, sessionOptions } from "./session";

export const getSession = async () => {
  const cookieStore = await cookies();
  const session = await getIronSession<SessionProps>(
    cookieStore,
    sessionOptions
  );

  return session;
};
