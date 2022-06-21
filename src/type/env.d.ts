declare namespace NodeJS {
  interface ProcessEnv {
    readonly SERVICE_ROLE_KEY: string;
    readonly LINE_CLIENT_ID: string;
    readonly LINE_CLIENT_SECRET: string;
    readonly NEXTAUTH_SECRET: string;
    readonly NEXT_PUBLIC_SUPABASE_API_URL: string;
    readonly NEXT_PUBLIC_SUPABASE_ANON_KEY: string;
  }
}
