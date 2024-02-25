import { Provider } from 'react-redux';
import store from './src/store';
import AppNavigator from './src/navigators/AppNavigator';

export default function App() {
  return (
   <Provider store={store}>
<AppNavigator />
   </Provider>
  );
}


