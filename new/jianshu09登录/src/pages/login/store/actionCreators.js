import axios from "axios";
import * as constants from "./constants";

const changeLogin = () => ({
    type: constants.CHANGE_LOGIN,
    value:true
  });

export const login= (account,password) => {
    return dispatch => {
      axios.get("/api/login.json?account="+account+"&password="+password).then((res) => {
        // console.log(res.data.data)
        const result = res.data.data;
        if(result){
            dispatch(changeLogin());
        }else{
            console.log("登录失败")
        }
        // dispatch(addHomeList(result,page+1));
      });
    };
  };
export const logout= () => ({
  type: constants.CHANGE_LOGOUT,
  value:false
});