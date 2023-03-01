import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from './src/navigators/authNavigator';
import { useEffect, useMemo, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { AuthContext } from "./src/api/contexts";
import BottomTabs from "./src/navigators/bottomTabNavigator";
import clients from "./src/api/clients"
import { StatusBar } from "react-native";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userNotFound, setUsetNotFound] = useState(false);
  
  useEffect(() => {
    const grabToken = async () => {
      const currentAccessToken = await AsyncStorage.getItem("access");
      if (currentAccessToken != null) {
        try {
          await axios.get("http://91.90.193.215/api/testauth", {headers:{"Authorization": "Bearer " + currentAccessToken}});
          return setIsAuthenticated(true);
        } catch (error) {
          try {
            let refreshResponse = await axios.post("http://91.90.193.215/auth/refresh", {"refresh": await AsyncStorage.getItem("refresh")});
            await AsyncStorage.setItem("access", refreshResponse.data.access);
            return setIsAuthenticated(true);
          } catch (errorRefresh) {
            return setIsAuthenticated(false);
          }
        }
      }
      else {
        try {
          let refreshResponse = await axios.post("http://91.90.193.215/auth/refresh", {"refresh": await AsyncStorage.getItem("refresh")});
          await AsyncStorage.setItem("access", refreshResponse.data.access);
          return setIsAuthenticated(true);
        } catch (error) {
          return setIsAuthenticated(false)
        }
      }
    }

    grabToken();
  }, []);

  const authContext = useMemo(() => ({
    logOut: async () => {
      try {
        await clients.post("logout", {"refresh":await AsyncStorage.getItem("refresh")});
      }
      catch (error){
        console.log(error);
      }
      await AsyncStorage.removeItem("access");
      await AsyncStorage.removeItem("refresh");
      setIsAuthenticated(false);
    },
    singIn: async (values) => {
      const data = {};
      data["username"] = values.username;
      data["password"] = values.password;

      clients.post("/auth", data)
      .then(async function (response) {
          await AsyncStorage.setItem("access", response.data.access);
          await AsyncStorage.setItem("refresh", response.data.refresh);
          setIsAuthenticated(true);
          setUsetNotFound(false);
          values.username = "";
          values.password = "";
      })
      .catch(function (error) {
          if (error.response.status === 401) setUsetNotFound(true);
      });
    },
    singUp: async (values) => {
      const data = {};
      data["username"] = values.username;
      data["email"] = values.email;
      data["password"] = values.password;

      clients.post("/register", data)
      .then(() => {
          values.username = '';
          values.password = '';
          values.email = '';
          console.log("singUp");
      })
      .catch((error) => {});
    }
  }), []);
  
  console.log("isAuthentcated: ", isAuthenticated);
  return (
    <AuthContext.Provider value={{authContext, userNotFound}}>
      <StatusBar 
        barStyle="light-content"
        backgroundColor="#212529"
        translucent={true}/>
      <NavigationContainer>
        {isAuthenticated ? <BottomTabs /> : <AuthNavigator />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

// REACT_NATIVE_PACKAGER_HOSTNAME='10.0.0.2' expo start