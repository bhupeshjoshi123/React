import axios from 'axios';
import {toast} from 'react-toastify';
import logger from './services/loggingService';



axios.interceptors.response.use(null,error =>{
    const expectedError = 
        error.response && 
        error.response.status >= 400 &&
        error.response.status <500;
    if(!expectedError){
        logger.log();
        toast("An unexpected error occured")
    }
    return Promise.reject(error);
    
    });

    export default {
        get: axios.get,
        post: axios.post,
        put: axios.put,
        delete: axios.delete
    };