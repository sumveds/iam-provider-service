export interface UserRepresentation {
  id?: string;
  username?: string;
  email?: string;
  enabled?: boolean;
  firstName?: string;
  lastName?: string;
  attributes?: Record<string, any>;
}
