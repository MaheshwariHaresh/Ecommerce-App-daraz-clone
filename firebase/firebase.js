import admin from "firebase-admin";
import "dotenv/config";

const requiredEnvironmentVariables = [
  "PROJECT_ID",
  "CLIENT_EMAIL",
  "PRIVATE_KEY",
];

for (const variableName of requiredEnvironmentVariables) {
  if (!process.env[variableName]) {
    throw new Error(`Missing required environment variable: ${variableName}`);
  }
}

const serviceAccount = {
  projectId: process.env.PROJECT_ID,
  clientEmail: process.env.CLIENT_EMAIL,
  privateKey: process.env.PRIVATE_KEY.replace(/\\n/g, "\n"),
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export default admin;
