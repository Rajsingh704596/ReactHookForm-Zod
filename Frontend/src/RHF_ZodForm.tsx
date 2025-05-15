//! Here install -  npm install @hookform/resolvers   , using zodResolver we easily integrate Zod + RHF 

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userFormSchema, type UserForm } from "./types/userFormSchema";

const RHF_ZodForm = () => {
    // Define default values outside the hook for consistency
  const defaultValues:UserForm = {
    name: "",
    age: undefined,  
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    gender: "male", // Must be one of the enum values
  };
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<UserForm>({
    resolver: zodResolver(userFormSchema),
    defaultValues,
  });

  const onSubmit = async(formdata: UserForm) => { 
      console.log(formdata);
    // Handle form submission here
       try {
      const response = await fetch(`http://localhost:3000/api/user/form`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // it define post data is json format
        },
        body: JSON.stringify(formdata), // state data pass in JSON.stringify format in body
      });
     
      const res_data = await response.json();
      console.log("after json object change response from server", res_data);
      if (response.ok) {
        reset(defaultValues); // Reset to default values after successful submission

        // Optional: Show success message
        alert("Form submitted successfully!");
     
      } else {
          console.error("Error:", res_data.error);
        alert(`Error: ${res_data.error || "Submission failed"}`);
      }
    } catch (error) {
      console.log("registration error", error);
     alert("An unexpected error occurred");
    }
  };

  return (
    <div>
      <h1>User Form</h1>
      <form onSubmit={handleSubmit(onSubmit)} >
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            {...register("name")}
             autoComplete="name"
          />
          {errors.name && <span>{errors.name.message}</span>}
        </div>

        <div>
          <label htmlFor="age">Age</label>
          <input
            type="number"
            id="age"
            {...register("age", { valueAsNumber: true })}
             autoComplete="off" // For fields where autocomplete isn't helpful
          />
          {errors.age && <span>{errors.age.message}</span>}
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            {...register("email")}
             autoComplete="email"
          />
          {errors.email && <span>{errors.email.message}</span>}
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            {...register("password")}
              autoComplete="new-password" // Important for security
          />
          {errors.password && <span>{errors.password.message}</span>}
        </div>

        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            {...register("confirmPassword")}
             autoComplete="new-password" // Important for security  // For password confirmation
          />
          {errors.confirmPassword && (
            <span>{errors.confirmPassword.message}</span>
          )}
        </div>

        <div>
          <label htmlFor="phone">Phone</label>
          <input
            type="tel"
            id="phone"
            {...register("phone")}
             autoComplete="tel"
          />
          {errors.phone && <span>{errors.phone.message}</span>}
        </div>

        <div>
          <label htmlFor="gender">Gender</label>
          <select id="gender" {...register("gender")}>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors.gender && <span>{errors.gender.message}</span>}
        </div>

         {/* Submit Button */}
           <button 
          type="submit" 
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default RHF_ZodForm;