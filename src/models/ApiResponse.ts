export interface ApiReponse<T>{
    success:boolean,
    data?:T,
    message?:string
}