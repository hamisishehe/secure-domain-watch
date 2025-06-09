
export interface User {
  id: string;
  username: string;
  email: string;
  phone_number?: string;
  is_admin: boolean;
}

export interface Domain {
  id: string;
  name: string;
  url: string;
  user_id: string;
  created_at: string;
  ssl_info?: SSLInfo;
  uptime_events?: UptimeEvent[];
  domain_expiry?: DomainExpiry;
}

export interface SSLInfo {
  id: string;
  domain_id: string;
  issuer: string;
  start_date: string;
  end_date: string;
  days_remaining: number;
  last_checked: string;
}

export interface UptimeEvent {
  id: string;
  domain_id: string;
  status: 'UP' | 'DOWN';
  response_time?: number;
  checked_at: string;
}

export interface DomainExpiry {
  id: string;
  domain_id: string;
  registrar: string;
  creation_date: string;
  expiration_date: string;
  last_checked: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: RegisterData) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

export interface RegisterData {
  username: string;
  email: string;
  phone_number?: string;
  password: string;
}
