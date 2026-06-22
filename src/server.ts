import app from "./app";
import config from "./config";

async function main() {
  try {
    app.listen(config.PORT, () => {
      console.log(`Server is running on port ${config.PORT}`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

main();
