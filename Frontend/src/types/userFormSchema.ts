
import {z} from "zod";

// schema define
export const userFormSchema = z.object({
    name:z.string().min(3,'Name must be at least 3 characters'),
    email:z.string().email("Invalid email"),
    age:z.number().min(18,"Age must be at least 18").max(100,"Invalid Age"),
   password:z.string().min(8,"Password must be at least 8 character").regex(/[A-Z]/,"Password must contain at least one Uppercase letter").regex(/[0-9]/,"Password must contain at least one number"),
    confirmPassword:z.string(),
    phone: z.string()
    .regex(/^\d{10}$/, "Phone number must be 10 digits")
,
    // enum used b/c we have 3 option only
    gender:z.enum(['male','female','other'],{
        errorMap:()=>({message:"Please select a valid gender"})
    })
}).refine(data => data.password === data.confirmPassword, {  //refine use to access any data so here we compare password or confirmPassword 
    message:"Password does not match",
    path:['confirmPassword']   //here error pass to confirmPassword  //attach path to confirmPassword field
});

// type define
export type UserForm = z.infer<typeof userFormSchema>  //here schema type get 

// type define for Error
export type FormError = Partial<Record<keyof UserForm, string[]>>;   //Partial means error which exist and which resolved so updated