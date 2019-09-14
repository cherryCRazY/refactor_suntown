import ls from 'local-storage';

const handleResponse = response => {
  return response.text().then(text => {
    if (!response.ok) {
      if(response.status === 401){
        ls.remove('token')
        return Promise.reject(new Error(errorMessage));
      }
      const error = JSON.parse(text);
      let errorMessage = error ? error.message : response.responseText;
      return Promise.reject(new Error(errorMessage));
    }
  const data = text && JSON.parse(text) || null;
    return data;
});
}

export async function authHeader() {
  const token = await ls.get('token')
  return {'Authorization': 'Bearer '+ token}
}

const handleError = error => {
  console.log(error);
  return {
    success: false,
    message: error.message,
    result: null
  }
}

export {
  handleResponse,
  handleError
};
