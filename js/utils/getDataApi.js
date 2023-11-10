class GetrResultsApi {
    async getData(url) {
        try {
            const response = await axios.get(url);
            return response.data.results
        } catch (error) {
            console.log(error.message);
            return false;
        } 
    }
}

class GetDataApi {
    async getData(url) {
        try {
            const response = await axios.get(url);
            return response.data
        } catch (error) {
            console.log(error.message);
            return false;
        } 
    }
}

export const getDataApi = new GetDataApi();

export const getResultsApi = new GetrResultsApi();