import {useEffect, useState} from 'react'
import Layout from "../layout/Layout";
import { Provider } from "react-redux";
import store from "../redux/store";
import ReduxDataSet from "../redux/ReduxDataSet";
// import 'bootstrap/dist/css/bootstrap.min.css'
// import 'bootswatch/dist/simplex/bootstrap.min.css'

import "@fullcalendar/common/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
import "@fullcalendar/list/main.css";

import 'primereact/resources/themes/bootstrap4-light-purple/theme.css'
import 'primereact/resources/primereact.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import 'prismjs/themes/prism-coy.css';
import '../styles/layout.scss'
import '../styles/globals.css'
import 'suneditor/dist/css/suneditor.min.css'; 

import Script from "next/script";
import 'codemirror/lib/codemirror.css'

// import 'react-quill/dist/quill.snow.css'
// import 'react-quill/dist/quill.bubble.css'
import NextNProgress from 'nextjs-progressbar';

function MyApp({ Component, pageProps }) {
  const [themeScheme, setThemeScheme] = useState('dark');
  const [themeColor, setThemeColor] = useState('blue');

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle");
}, []);


  return (
    <Provider store={store}>   

      <ReduxDataSet>
      <Script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"></Script>
        <Layout themeColor={themeColor} themeScheme={themeScheme} setThemeColor={setThemeColor} setThemeScheme={setThemeScheme}>
          <NextNProgress />
          <Component {...pageProps}  />
        </Layout>
      </ReduxDataSet>
    </Provider>
  );
}

export default MyApp;
