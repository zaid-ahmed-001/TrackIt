import toast from "react-hot-toast"

export const notify=(msg:any)=> toast.success(msg,{duration:500})
export const failure=(msg:any)=> toast.error(msg)