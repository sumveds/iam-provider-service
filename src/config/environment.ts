import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

const envValidationSchema = Joi.object({
  NODE_ENV: Joi.string().valid('dev', 'production', 'test').default('dev'),
  PORT: Joi.number().default(3000),
  LOG_LEVEL: Joi.string()
    .valid('error', 'warn', 'log', 'debug', 'verbose')
    .default('log'),
  KEYCLOAK_DOMAIN: Joi.string().required(),
  KEYCLOAK_REALM: Joi.string().required(),
  KEYCLOAK_API_CLIENT_ID: Joi.string().required(),
  KEYCLOAK_API_CLIENT_SECRET: Joi.string().required(),
});

// Configuration object
export default registerAs('environment', () => {
  // Validate environment variables
  const { error, value: envVars } = envValidationSchema.validate(process.env, {
    allowUnknown: true,
  });

  if (error) {
    throw new Error(`Config validation error: ${error.message}`);
  }

  return {
    nodeEnv: envVars.NODE_ENV,
    port: envVars.PORT,
    keycloak: {
        domain: envVars.KEYCLOAK_DOMAIN,
        realm: envVars.KEYCLOAK_REALM,
        api: {
            clientId: envVars.KEYCLOAK_API_CLIENT_ID,
            clientSecret: envVars.KEYCLOAK_API_CLIENT_SECRET,
        },
    },
    // Add more mapped variables here
  };
});
