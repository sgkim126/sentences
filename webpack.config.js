module.exports = {
  entry: './src/render.tsx',
  module: {
    loaders: [
      { test: /\.ts[x]?$/, loader: 'babel-loader?presets[]=es2015&presets[]=react!ts-loader' }
    ]
  },
  output: {
    filename: 'sentences.js'
  },
  target: 'web'
}
