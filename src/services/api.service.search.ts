import { ITEMS_PER_PAGE } from 'utils/constants'
import { request } from './api.config'

type SearchByQuery = {
    query: string,
    page: number,
}

/**
 * Request to search posts and pagination based on a text and a page number
 *
 * @param {Object} query text used to search post related
 * @param {Object} page 
 * @return {Object} 
 */
const seachByQuery = async ({ query, page }: SearchByQuery) => {
    try {
        const { data } = await request.get(`/search_by_date?query=${query}&page=${page}&hitsPerPage=${ITEMS_PER_PAGE}`)
     
        return data
    } catch (error) {
        return error
    }
}

export {
    seachByQuery
}