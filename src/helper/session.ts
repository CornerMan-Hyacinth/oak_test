import { SessionOptions } from "iron-session";

export const sessionOptions: SessionOptions = {
  password: process.env.SESSION_SECRET_KEY!,
  cookieName: "admin_session",
  cookieOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: new Date(Date.now() + 2 * 60 * 60 * 1000), // Cookie expires in 2 hours
  },
};

export interface SessionProps {
  isLoggedIn: "no" | "yes";
  user: {
    id: string;
    name: string;
    email: string;
  };
  guestId: string | null;
}
