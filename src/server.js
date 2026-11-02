import app from "./app.js";
import { env } from "./config/env.js";
import { startRemainingDaysJob } from "./jobs/remainingDays.job.js";

startRemainingDaysJob();

app.listen(env.port, () => {
  console.log(`Backend berjalan di http://localhost:${env.port}`);
});
