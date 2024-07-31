import { useSelector } from "react-redux";


export const useFormSelectors = () => {
    const apiUrl = useSelector((state) => state.form.apiUrl);
    const IniheaderKey = useSelector((state) => state.form.headerKey);
    const IniheaderValue = useSelector((state) => state.form.headerValue);
    const timerSetting = useSelector((state) => state.form.timerSetting)
    const rows = useSelector((state) => state.rows);
    const payment = useSelector((state) => state.payment)
    const approvedRewards = useSelector((state) => state.ApprovedRewards)
    const authHeader = useSelector((state) => state.auth.authHeader);
    const authType = useSelector((state) => state.auth.authType)
    const token = useSelector((state) => state.auth.token);
    const username = useSelector((state) => state.auth.username);
    const password = useSelector((state) => state.auth.password);
    const jsonText = useSelector(state => state.auth.jsonBody);
    const queryParams = useSelector(state => state.auth.queryParams); 
    const headers = useSelector(state => state.auth.headers);
  
    return {  apiUrl, IniheaderKey, IniheaderValue, timerSetting,  rows, payment, approvedRewards, authHeader,authType , token , username , password, jsonText, queryParams , headers   };
  };




