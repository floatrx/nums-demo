import type { FunctionComponent, PropsWithChildren } from 'react';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      VITE_PORT: string;
    }
  }
}

declare global {
  type FC<T = object> = FunctionComponent<PropsWithChildren<T>>;
}

declare module '*.module.css' {
  const value: { [className: string]: string };
  export default value;
}
