// const {
//   PHASE_DEVELOPMENT_SERVER,PHASE_PRODUCTION_BUILD
// } = require('next/constants')
  //yarn dev
  // const isDev = phase === PHASE_DEVELOPMENT_SERVER
  //yarn build
  // const isProd = phase ===PHASE_PRODUCTION_BUILD && prosess.env.STAGING !=='1'
  //yarn build
  // const isStaging = phase ===PHASE_PRODUCTION_BUILD && prosess.env.STAGING ==='1'

//   const env = {
//     TITLE:(()=>{
//       if(isDev) return 'Title Dev'
//       if(isProd) return 'Title Prod'
//       if(isStaging) return 'Title Stg'
//     })()
//   }

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
      domains: ['www.lilith.co.kr','k.kakaocdn.net','lh3.googleusercontent.com','storagelilith.blob.core.windows.net'],
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

