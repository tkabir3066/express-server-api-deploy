import app from "./app";
import config from "./config/env";
import { initDB } from "./db";

const main = () => {
  initDB();
  app.listen(config.PORT, () => {
    console.log(`App is listening on port ${config.PORT}`);
  });
};

main();
