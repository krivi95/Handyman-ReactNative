import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import UserTabNavigator from './UserTabNavigator'
import HomepageTabNavigator from './HomepageTabNavigatior'
  

const AppSwitchNavigator = createSwitchNavigator({
  Home:{screen: HomepageTabNavigator},
  User:{screen: UserTabNavigator}
});


export default AppContainer = createAppContainer(AppSwitchNavigator);
