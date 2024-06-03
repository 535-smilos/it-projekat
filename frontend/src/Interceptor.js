import axios from 'axios';

export default function setupInterceptors(){

    axios.interceptors.response.use(response => {            
        return response;
    }, error => {
        console.log('intercepting response');
        //redirect to login route
        return Promise.reject(error);
    });

    axios.interceptors.request.use(
        (config) => {
            console.log('intercepting request');
            const token = localStorage.getItem('token');
            if ( token != null ) {
                config.headers.Authorization = 'Bearer ' + token;
            }

            return config;
        }, 
        (err) => {
            return Promise.reject(err);
        }
    );
} 
