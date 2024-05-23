import { Api } from "@/config/constants";
import axios from "axios";
import { format } from "util";

export const local = axios.create({
    baseURL: format('%s/api', Api().BASE_URL),
    headers: {
        'Authorization': format('Bearer %s', Api().STRAPI_AUTH_TOKEN),
        'Content-Type': 'application/json',
    }
})

local.defaults.params = {
    pagination: {
        limit: 10,
        start: 0
    }
}
