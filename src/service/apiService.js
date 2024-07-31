import axios from 'axios';
import { useFormSelectors } from '../redux/selector';
const useApiRequest = () => {
    const { headers, queryParams, jsonText, token ,authType, username, password} = useFormSelectors()
  
    const sendRequest = async (method, url) => {
      try {
        const config = {
          method,
          url,
          headers: headers.reduce((acc, header) => {
            if (header.checked && header.key && header.value) {
              acc[header.key] = header.value;
            }
            return acc;
          }, {}),
          params: queryParams.reduce((acc, param) => {
            if (param.checked && param.key && param.value) {
              acc[param.key] = param.value;
            }
            return acc;
          }, {}),
          data: jsonText || {},
        };


      // Add token to headers if it's non-empty
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }

      // Add username and password to headers if they are non-empty
      if (username) {
        config.headers['Username'] = username;
      }
      if (password) {
        config.headers['Password'] = password;
      }
  
        const response = await axios(config);
        console.log("response", response)
        // return response.data;
        return response
      } catch (error) {
        console.error('API request error:', error);
        throw error;
      }
    };
  
    return { sendRequest };
  };
  
  export default useApiRequest;