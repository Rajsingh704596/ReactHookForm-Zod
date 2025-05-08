import { useState } from "react"
import { userFormSchema, type FormError, type UserForm } from "./types/userFormSchema";

const Form = () => {

    const[userData,setUserData]=useState<UserForm>({
        name:"",
        age:0,
        email:"",
        password:"",
        confirmPassword:"",
        phone:"",
        gender:"male"
    })

    const [error, setError]=useState<FormError>({});

    const handleInputChange=(e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>)=>{
         const {name,value} = e.target;

         setUserData({
            ...userData,
            [name]:name==="age"?(value ? Number(value):0) : value,
         })

        //  Clear error message
        setError((prev)=>({...prev, [name]:undefined}));
    }

    const handleFormSubmit=(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();

        const result = userFormSchema.safeParse(userData);    //userFormSchema basis safeParse validate userData 

        if(!result.success){   //means error exist
            setError(result.error.formErrors.fieldErrors);
        }
        else{    //error not exist
            setError({});
            console.log(userData);
        }

    }

 return (
    <div>
        <h1>User Form</h1>
        <form onSubmit={handleFormSubmit}>
            <div>
                <label htmlFor="name">Name</label>
                <input type="text" value={userData.name} required onChange={handleInputChange} id="name" name="name"/>
                {error.name && ( <span>{error.name[0]}</span>)}
            </div>
            <div>
                <label htmlFor="age">Age</label>
                <input type="number" value={userData.age} required onChange={handleInputChange} id="age" name="age"/>
                {error.age && ( <span>{error.age[0]}</span>)}
            </div>
        
            <div>
                <label htmlFor="email">Email</label>
                <input type="email" value={userData.email} required onChange={handleInputChange} id="email" name="email"/>
                {error.email && ( <span>{error.email[0]}</span>)}
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input type="password" value={userData.password} required onChange={handleInputChange} id="password" name="password"/>
                {error.password && ( <span>{error.password[0]}</span>)}
            </div>
            <div>
                <label htmlFor="confirmPassword">Password</label>
                <input type="password" value={userData.confirmPassword} required onChange={handleInputChange} id="confirmPassword" name="confirmPassword"/>

                {error.confirmPassword && ( <span>{error.confirmPassword[0]}</span>)}
            </div>
            <div>
                <label htmlFor="phone">Phone</label>
                <input type="text" value={userData.phone} required onChange={handleInputChange} id="phone" name="phone"/>
                {error.phone && ( <span>{error.phone[0]}</span>)}
            </div>
            <div>
                <label htmlFor="gender">Gender</label>
                <select name="gender" id="gender" value={userData.gender} onChange={handleInputChange}>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>
                {error.gender && ( <span>{error.gender[0]}</span>)}
            </div>

            <button type="submit">Submit</button>
        </form>
    </div>
  )
}

export default Form