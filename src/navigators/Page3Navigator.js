import { createStackNavigator } from 'react-navigation';

import Page3 from '../containers/Page3';


const Page3Navigator = createStackNavigator({
  Home: {
    screen: Page3,
    navigationOptions: {
      header: null,
    },
  },
});

export default Page3Navigator;
