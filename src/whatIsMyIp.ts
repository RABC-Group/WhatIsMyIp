import * as fs from 'fs';
import * as os from 'os';
import * as platform from './platform';

const supportedPlatforms = [
  "aix",
  "android",
  "darwin",
  "freebsd",
  "linux",
  "openbsd",
  "sunos",
  "win32"
];


const getOSPlatform = (): NodeJS.Platform | 'docker' | false => {
  const osPlatform = os.platform();

  // Docker Env
  if (osPlatform !== "darwin" && osPlatform !== "win32") {
    const file = fs.readFileSync("/proc/self/cgroup", "utf-8");
    if (file.indexOf("/docker") !== -1) {
      return 'docker';
    }
  }

  // Other OS
  if (supportedPlatforms.includes(osPlatform)) {
    return osPlatform;
  }

  return false;
}


const promise = async (type: "internal" | "public", family: "v4" | "v6") => {};

const sync = (type: "internal" | "public", family: "v4" | "v6") => {
  const osPlatform = getOSPlatform();
  if (osPlatform && platform.hasOwnProperty(osPlatform)) {
    platform[osPlatform]
  }
};

export const internal = {
  v4: promise("internal", "v4"),
  v4Sync: sync("internal", "v4"),
  v6: promise("internal", "v6"),
  v6Sync: sync("internal", "v6"),
};
