import axios from "axios";

const Api = axios.create({
    baseURL:'https://sistema.imuneweb6.com.br/api/imuneweb/v1'
})

export default Api;