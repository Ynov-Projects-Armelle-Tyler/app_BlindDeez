import { IP } from '@env'
import { URL } from '@env'
import { URL_DEEZER } from '@env'

export const auth = `http://${IP}:8001/auth`
export const user = `http://${IP}:8001/api/v1/general/user`
export const party = `http://${IP}:8001/api/v1/general/party`
export const random = `http://${IP}:8001/api/v1/general/random`
export const deezerSearch = `${URL_DEEZER}search?q=`
export const deezerTrack = `${URL_DEEZER}track/`
