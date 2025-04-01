import { Web3Provider } from '../contexts/Web3Context';
import '../assets/theme.css';

export default function App({ Component, pageProps }) {
  return (
    <Web3Provider>
      <Component {...pageProps} />
    </Web3Provider>
  );
}
