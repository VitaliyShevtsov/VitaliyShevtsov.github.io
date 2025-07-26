/// <reference types="vite/client" />

declare module 'is-my-ip-valid' {
  function isMyIpValid(options?: { version: 4 | 6 }): (ip?: string) => boolean;
  export default isMyIpValid;
}
