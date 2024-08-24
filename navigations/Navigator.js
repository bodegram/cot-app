import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "./AuthNavigator";
import AppNavigator from "./AppNavigator";
import { useSelector } from "react-redux";


function Navigator() {
  const {isAuthenticated} = useSelector(state=>state.auth)
  return (
   <NavigationContainer>
    {isAuthenticated ? <AppNavigator/> : <AuthNavigator/>}
   </NavigationContainer>
  );
}

export default Navigator