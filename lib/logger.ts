const isDev = process.env.NODE_ENV !== "production";

const logger = {
  info: (msg: any, ...optionalParams: any[]) => {
    console.log("[INFO]:", msg, ...optionalParams);
  },
  warn: (msg: any, ...optionalParams: any[]) => {
    console.warn("[WARN]:", msg, ...optionalParams);
  },
  error: (msg: any, ...optionalParams: any[]) => {
    console.error("[ERROR]:", msg, ...optionalParams);
  },
  debug: (msg: any, ...optionalParams: any[]) => {
    if (isDev) {
      console.debug("[DEBUG]:", msg, ...optionalParams);
    }
  },
};

export default logger;
