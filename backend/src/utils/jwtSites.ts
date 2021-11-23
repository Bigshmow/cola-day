import * as jwt from "jsonwebtoken";
export const { JWT_VALUE: jwtSecret = "unsecure" } = process.env;
export const {
  JWT_SITES_KEY: jwtSitesKey = "",
  JWT_SITES_KEY_BASE64: jwtSitesKeyBase64 = "",
} = process.env;

let jwtKey = "";
if (jwtSitesKey) {
  console.log("Loading jwtKey from jwtSitesKey");
  jwtKey = jwtSitesKey;
} else if (jwtSitesKeyBase64) {
  console.log("Loading jwtKey from jwtSitesKeyBase64");
  jwtKey = Buffer.from(jwtSitesKeyBase64, "base64").toString("utf-8");
}
console.log("unsecure, hope you're in develop");
export function generateToken(payload: any) {
  return jwt.sign(payload, jwtKey, {
    algorithm: "RS256",
    expiresIn: "12h",
  });
}
export function generateGenericToken(
  payload: any,
  options: jwt.SignOptions = {}
) {
  return jwt.sign(payload, jwtKey, {
    algorithm: "RS256",
    ...options,
  });
}
export function parseToken(rawToken: string) {
  return jwt.verify(rawToken, jwtKey, { algorithms: ["RS256"] });
}
