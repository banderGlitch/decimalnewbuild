import { useSelector } from "react-redux";


export const useFormSelectors = () => {
    const apiUrl = useSelector((state) => state.form.apiUrl);
    const IniheaderKey = useSelector((state) => state.form.headerKey);
    const IniheaderValue = useSelector((state) => state.form.headerValue);
    const timerSetting = useSelector((state) => state.form.timerSetting)

  
    return {  apiUrl, IniheaderKey, IniheaderValue, timerSetting };
  };




