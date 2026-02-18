import { registerAs } from "@nestjs/config";

export default registerAs("config", () => {
  return {
    database: {
      databaseName: process.env.DATABASE_NAME,
      port: parseInt(process.env.PORT),
    },
    postgres: {
      dbName: process.env.POSTGRES_DB,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      port: parseInt(process.env.POSTGRES_PORT, 10),
      host: process.env.POSTGRES_HOST,
    },
    apiKey: process.env.API_KEY,
    publicUrl: process.env.PUBLIC_URL,
    frontendUrl: process.env.FRONTEND_URL,
    mercadoPago: {
      accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN,
      publicKey: process.env.MERCADOPAGO_PUBLIC_KEY,
      preapprovalPlanId: process.env.MERCADOPAGO_PREAPPROVAL_PLAN_ID,
    },
    subscription: {
      amount: parseInt(process.env.SUBSCRIPTION_AMOUNT || '100', 10),
      mode: process.env.SUBSCRIPTION_MODE || 'test', // 'test' o 'prod'
    },
  };
});