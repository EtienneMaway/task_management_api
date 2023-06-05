import { dirname } from "path";
import { DataSource, DataSourceOptions } from "typeorm";
import * as config from 'config'

const dbConfig = config.get('db')

export const dataSourceOptions: DataSourceOptions = {
  type: dbConfig.type,
  host: process.env.RDS_HOST || dbConfig.host,
  port: process.env.RDS_PORT || dbConfig.port,
  username: process.env.RDS_USERNAME || dbConfig.username,
  password: process.env.RDS_PASSWORD || dbConfig.passport,
  database: process.env.RDS_DB_NAME || dbConfig.database,
  entities: [__dirname + '/../**/*.entity.js'],
  migrations:['dist/db/migrations/*.js'],
  synchronize: process.env.TYPEORM_SYNC || dbConfig.synchronize,
}

const dataSource = new DataSource(dataSourceOptions)

export default dataSource
