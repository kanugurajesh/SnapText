import { auth } from "@/auth";

export default auth((req) => {

  const urlPath = req.nextUrl.pathname

  if (!req.auth && urlPath == "/home") {
    const newUrl = new URL("/", req.nextUrl.origin);
    return Response.redirect(newUrl);
  }
});