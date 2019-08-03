import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import HomepageTabNavigator from './HomepageTabNavigatior'
  

const AppSwitchNavigator = createSwitchNavigator({
  Welcome:{screen: HomepageTabNavigator}
});


export default AppContainer = createAppContainer(AppSwitchNavigator);
