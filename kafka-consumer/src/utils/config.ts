import nconf from "nconf";
import path from "path";
import { SASLMechanism } from "kafkajs";

const config = nconf.env().get();
const isDev = config.NODE_ENV !== "production";
const isProd = config.NODE_ENV === "production";
const isCI = config.CI === "true";
const npmPackageVersion = config.npm_package_version;

const requiredParams = [
  "KAFKA_DIVOLTE_TOPIC",
  "KAFKA_BROKER_LIST",
  "AVSC_SCHEMA_FILE_PATH",
  "KAFKA_USERNAME",
  "KAFKA_PASSWORD",
];

requiredParams
  .filter((x) => !!x)
  .forEach((key) => {
    if (!config[key]) {
      // tslint:disable-next-line: no-console
      console.error(`Required parameter is missing: ${key}`);
      process.exit(1);
    }
  });

export interface AppConfig {
  npmPackageVersion: string;
  avscSchemaFilePath: string;
  isDev: boolean;
  isCI: boolean;
  kafka: {
    topic: string;
    ssl: boolean;
    mechanism: SASLMechanism;
    username: string;
    password: string;
    brokers: string[];
  };
}

const appConfig: AppConfig = {
  npmPackageVersion,
  avscSchemaFilePath: path.resolve(
    __dirname,
    "../..",
    config.AVSC_SCHEMA_FILE_PATH
  ),
  isDev,
  isCI,
  kafka: {
    topic: config.KAFKA_DIVOLTE_TOPIC,
    ssl: config.KAFKA_SSL === undefined ? true : config.KAFKA_SSL,
    mechanism: config.KAFKA_MECHANISM || "plain",
    username: config.KAFKA_USERNAME,
    password: config.KAFKA_PASSWORD,
    brokers: config.KAFKA_BROKER_LIST.split(","),
  },
};

export default appConfig;
