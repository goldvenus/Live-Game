import { createStackNavigator } from 'react-navigation';

import Page2 from '../containers/Page2';


const Page2Navigator = createStackNavigator({
  Page2: {
    screen: Page2,
    navigationOptions: {
      header: null,
    },
  },
});

export default Page2Navigator;
