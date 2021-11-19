import express from "express";
import { json, urlencoded } from "body-parser";

const app = express();

app.use(json(), urlencoded({ extended: true }));
app.disable("etag");
app.disable("x-powered-by");

export default app;