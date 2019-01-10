module.exports = {
  publicPath: '/',
  runtimeCompiler: true,
  outputDir: 'public',
  indexPath: 'index.html',
  css: {
    modules: true
  },
  lintOnSave: process.env.NODE_ENV !== 'production',
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'src/index.html',
      file: 'index.html',
      title: 'Easy reporter'
    }
  }
}
