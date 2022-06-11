declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number
      RDS_POSTGRESQL: string
      RDS_PORT: number
      RDS_USERNAME: string
      RDS_PASSWORD: string
      RDS_DATABASE_NAME: string
    }
  }
}

export {}
