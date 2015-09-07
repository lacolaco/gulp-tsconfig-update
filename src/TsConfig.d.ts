declare module model {
  interface PluginOption {
    configFile: string;
  }

  interface TsConfig {
    compilerOptions: {
      target: string;
      module: string;
      declaration: boolean;
      noImplicitAny: boolean;
      removeComments: boolean;
      noLib: boolean;
      preserveConstEnums: boolean;
      suppressImplicitAnyIndexErrors: boolean;
    },
    files? : string[]
  }
}