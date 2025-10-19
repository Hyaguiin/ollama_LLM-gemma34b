import { cleanEnv, str, port, bool } from "envalid";
import { config } from 'dotenv';
config(); 

const env = cleanEnv(process.env, {
    NODE: str({choices: ['development', 'production', 'test']}),
    PORT: port({default: 8080}),
    PORT_SERVER: port({default: 5001}),
    DB_HOST: str({default: "localhost"}),
    DB_PORT: port({default: 5432}),
    DB_TYPE: str({default: "postgres"}),
    DB_USERNAME: str({default: "postgres"}),
    DB_PASSWORD: str({default: "password"}),
    DB_NAME: str({default: "chat_history_db"}),
    DB_SSL: bool({default: true}),
    DB_SSL_REJECT_UNAUTHORIZED: bool({default: false}),
    DB_LOGGING: bool({default: false}),
    DB_SYNCHRONIZE: bool({default: true}),
    ALLOWED_DOMAINS: str({default: "", desc: "Comma-separated list of allowed domains for CORS"}),
});

export default env;