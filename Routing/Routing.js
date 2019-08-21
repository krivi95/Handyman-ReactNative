import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import UserTabNavigator from './UserTabNavigator'
import HomepageTabNavigator from './HomepageTabNavigatior'
import HandymanTabNavigator from './HandymanTabNavigator'
  

const AppSwitchNavigator = createSwitchNavigator({
  Home:{screen: HomepageTabNavigator},
  User:{screen: UserTabNavigator},
  Handyman:{screen: HandymanTabNavigator}
});


export default AppContainer = createAppContainer(AppSwitchNavigator);
