// pages/_app.js
import 'bootstrap/dist/css/bootstrap.min.css';
import '../pages/style.css'
function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
