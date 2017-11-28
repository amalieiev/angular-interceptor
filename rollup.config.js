const globals = {
  '@angular/core': 'ng.core',
  '@angular/common': 'ng.common',
  '@ngrx/store': 'ng.store',
};

export default {
  input: 'dist/src/index.js',
  sourceMap: false,
  name: 'ng.interceptor',
  onwarn: () => { return },
  globals,
  external: Object.keys(globals),
  output: {
    file: 'dist/bundles/angular-interceptor.umd.js',
    format: 'umd'
  }
}
