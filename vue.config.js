module.exports = {
    publicPath: '/lcars-weather-station/',
    chainWebpack: config => { config.plugin('html').tap(args => { args[0].title = 'Weather Station App'; return args; }); } 
}

