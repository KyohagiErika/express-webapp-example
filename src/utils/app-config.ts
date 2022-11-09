import { config } from "dotenv";
config();
// Add environment variables here
export default class AppConfig {
    static PORT = parseInt(process.env.PORT || "3000");
}