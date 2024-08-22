import {z} from 'zod'

export const signup_schema = z.object({
    
    email:z.string().email(),
    password:z.string().min(6)
})