const { createLogger, format, transports } = require("winston");

const level = process.env.LOG_LEVEL || "debug";

const formatParams = ({ level, timestamp, message, ...args }) => {
  const ts = timestamp.slice(0, 19).replace("T", " ");
  return `${ts} ${level} : ${message} ${
    Object.keys(args).length ? JSON.stringify(args, null, 2) : ""
  }`;
};

const devFormat = format.combine(
  format.colorize({ all: true }),
  format.align(),
  format.timestamp(),
  format.printf(formatParams)
);

const prodFormat = format.combine(
  format.align(),
  format.timestamp(),
  format.printf(formatParams)
);

let logger = null;

if (process.env.NODE_ENV && process.env.NODE_ENV.trim() === "production") {
  logger = createLogger({
    level,
    format: prodFormat,
    transports: [
      new transports.File({ filename: "logs/error.log", level: "error" }),
      new transports.File({ filename: "logs/combine.log" }),
    ],
  });
} else {
  logger = createLogger({
    level,
    format: devFormat,
    transports: [
      new transports.Console(),
    ],
  });
}

module.exports = logger;
