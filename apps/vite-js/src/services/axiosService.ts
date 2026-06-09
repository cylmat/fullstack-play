import axios, { AxiosResponse } from 'axios' // DONT use "import { axios }" !!
import { API_ENDPOINTS, API_PARAMS } from '../constants';

// Generic
interface CallbackOneParam<T1, T2 = void> {
  (param1: T1): T2;
}

class AxiosService {
  async post(query: string) {
    const destination = query || API_PARAMS.DEFAULT_DESTINATION;
    const limit = API_PARAMS.DEFAULT_LIMIT;

    return axios.get(
      `${API_ENDPOINTS.KEOLIS_BUS}?where=destination%3D%22${destination}%22&limit=${limit}`
    )

    .then( (res) => { return res.data.results } ) 
  }
  
}

export default new AxiosService()