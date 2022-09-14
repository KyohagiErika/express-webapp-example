import { config } from "dotenv";
config();
export default class AppConfig {
    static PORT = parseInt(process.env.PORT || "3000");
}