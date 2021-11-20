import { createServer } from "http";
import { join } from "path";

import app from "./core/app";

import superstatic = require("superstatic");
import template from "lodash/template";

import mountApolloServer from "./graphql/graphql";
import { connect } from "mongoose";

(async function boot() {
  const server = createServer(app);
  app.get("/__health", (req, res) => res.json({ ok: true }));

  // Database connection
  const mongoUri = template(
    process.env.MONGODB_URI ?? "mongodb://localhost:27017/coladay"
  );
  await connect(mongoUri({ env: process.env }), {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
  console.log("Connected to database");

  await mountApolloServer(app);

  const publicPath = join(process.cwd(), "public");

  const middlewaresClient = [];

  app.use(
    ...middlewaresClient,
    superstatic({
      config: {
        rewrites: [{ source: "**", destination: "/index.html" }],
        headers: [
          {
            source: "static/**/*",
            headers: [
              {
                key: "Cache-Control",
                value: "max-age=7200",
              },
            ],
          },
        ],
      },
      cwd: publicPath,
    })
  );

  await new Promise<void>((resolve, reject) => {
    server.on("error", (error) => reject(error));
    server.on("listening", () => resolve());
    server.listen(process.env.PORT || 8080);
  });

  console.log("listening on", server.address());
})().catch((error) => {
  console.error("Error on main loop", error);
  process.exit(1);
});
