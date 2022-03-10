import axios from 'axios';

export const fetchAllData = () => {
    return async (dispatch) => {
        const {data} = await axios.get('http://localhost:3000/data')
        dispatch({type: "getAllData", payload: data})        
    }
}