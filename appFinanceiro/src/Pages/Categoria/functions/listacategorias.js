import api from '../../../Services/API';

export const getListaCategorias = async (setData, setLoading, setError) => {

    setLoading(true);

    try{
        console.log("Entrou Try")

        const response = await api.get("/categoria/lista");
        console.log("response", response)
        
        setData(response?.data);
        setLoading(false)

    }
    catch(e){
     
        setError(true);
        setLoading(false);
    
    }

}