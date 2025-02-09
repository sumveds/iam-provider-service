import { KeycloakCredential } from "./keycloak-credential.interface";

export interface KeycloakUser {
  username: string;
  email: string;
  enabled?: boolean;
  firstName?: string;
  lastName?: string;
  credentials?: KeycloakCredential[];
  attributes?: Record<string, any>;
}
