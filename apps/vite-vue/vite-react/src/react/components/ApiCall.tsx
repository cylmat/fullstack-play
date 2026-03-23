import { useState } from 'react'
import AxiosService from '../../services/axiosService'
import { useQuery } from "react-query"

/**
 * useQuery
 * @https://tanstack.com/query/latest/docs/framework/react/overview

sample api
 - @https://api.github.com/repos/TanStack/query

 - https://data.opendatasoft.com/api/explore/v2.1/catalog/datasets/tco-bus-circulation-passages-tr@keolis-rennes/records? where=destination%3D%22Chantepie%22&limit=20 

ERROR
- cyclic object value on input click
*/

export default function ApiCall() { //class ApiCall extends Component {

  const [res, setRes] = useState<string>('')
    const [formCityValue, setFormCityValue] = useState<string>('')

  const {isPending, error, data: queryData} = useQuery({
      queryKey: ['myapidata', formCityValue],
      queryFn: (query: object) => {

        return AxiosService
          .post(query.queryKey[1])
          .then( (axres) => { return axres } )
      }
  }) //-query

    /** Doc @https://handsonreact.com/docs/events */
    const handleFormValueChange = (val: SyntheticBaseEvent) => {
        setFormCityValue(val.target.value)
    }
    
    if (isPending) return 'Loading...'
    if (error) return 'An error has occurred: ' + error.message

  return (
        <>
          <form id="api_form">
              {/* dont use value=formCityValue, no need */}
              {isPending && <p>Loading...</p>}
              City <input 
                     type="text" 
                     name="city" 
                     onChange={handleFormValueChange}
                />

              <table>
                  <tr>
                      <th>Id</th>
                    <th>Dest</th>
                    <th>H arrivee</th>
                      <th>N arrêt</th>
                  </tr>
              {queryData && queryData.map((element) => 
                <tr>
                    <td>{element['idcourse']}</td>
                    <td>{element['destination']}</td>
                    <td>{/** dateformat(element['arrivee'], "H:m") */}</td>
                    <td>{element['nomarret']}</td>
                </tr>
              )}
                  </table>
          </form>
          <div>{/*queryData*/}</div>
        </>
  )
  
}

//export default new ApiCall()