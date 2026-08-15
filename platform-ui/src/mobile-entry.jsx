import {createRoot} from 'react-dom/client';

import MobileApp from './mobile/MobileApp.jsx';
import './mobile/mobile.css';

document.documentElement.dataset.layout = 'mobile';
createRoot(document.getElementById('root')).render(<MobileApp />);
