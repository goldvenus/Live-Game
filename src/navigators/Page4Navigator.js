import { createStackNavigator } from 'react-navigation';

import Page4 from '../containers/Page4';


const Page4Navigator = createStackNavigator({
  Page4: {
    screen: Page4,
    navigationOptions: {
      header: null,
    },
  },
});

export default Page4Navigator;
