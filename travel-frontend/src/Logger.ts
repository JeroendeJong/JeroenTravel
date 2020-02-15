
const nodeEnv = process.env.NODE_ENV;
const isDEV = nodeEnv === 'development';

const Logger = {

  log: (...args: any[]) => {
    if (!isDEV) return;
    console.log(...args)
  },

  info: (...args: any[]) => {
    if (!isDEV) return;
    console.info(...args)
  },

  warn: (...args: any[]) => {
    if (!isDEV) return;
    console.warn(...args)
  },

  // Still log errors.
  error: console.error
}

export default Logger;