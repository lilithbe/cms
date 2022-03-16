const withTM = require('next-transpile-modules')([
  'suneditor-react',
  'suneditor',
  'jquery',
  "@fullcalendar/common",
  "@babel/preset-react",
  "@fullcalendar/common",
  "@fullcalendar/daygrid",
  "@fullcalendar/interaction",
  "@fullcalendar/react",
  "@fullcalendar/timegrid",
  "@fullcalendar/list",


]);

module.exports =withTM(
  {
    //
    reactStrictMode: true,
    distDir: 'build',
    //
    images: {
      domains: [process.env.NEXT_PUBLIC_DOMAIN,'k.kakaocdn.net','lh3.googleusercontent.com',`${process.env.NEXT_PUBLIC_AZUER_STORAGE}.blob.core.windows.net`],
    },
    
  
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
      config.plugins.push(
        new webpack.ProvidePlugin({
              $: 'jquery',
              jQuery: 'jquery',
              'window.jQuery': 'jquery',
          }))
      return config;
      }
  }
)

