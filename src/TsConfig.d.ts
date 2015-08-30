declare module model {
  interface PluginOption {
    configFile: string;
  }

  interface TsConfig {
    compilerOptions: {
      target: string;
      module: string;
      noImplicitAny: boolean;
    },
    files? : string[]
  }
}