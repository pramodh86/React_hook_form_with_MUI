
import './App.css'
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { TextField } from '@mui/material';


const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type FormFeilds = z.infer<typeof schema>;




function App() {


  const { register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting }

  } = useForm<FormFeilds>({
    // defaultValues: {
    //   email: "test@email.com",
    // },

    resolver: zodResolver(schema),


  });

  const onSubmit: SubmitHandler<FormFeilds> = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log(data)
    } catch (error) {
      setError("root", {
        message: "This email is already taken",
      });

    }


  }


  return (
    <>

      <form onSubmit={handleSubmit(onSubmit)} >
        {/* <input  {...register("email")} type="text" placeholder="Email" />  */}
        <TextField label="Email" type='text' {...register("email")} error={!!errors.email} helperText={errors.email?.message}></TextField>
        {errors.email && (
        <div>{errors.email.message}</div>
      )}

        <input {...register("password")} type="password" placeholder="Password" />
        {errors.password && (
        <div >{errors.password.message}</div>
      )}

        <button disabled={isSubmitting} type="submit"> {isSubmitting ? "Loading..." : "Submit"}</button>
        {errors.root && <div >{errors.root.message}</div>}
      </form>

    </>
  )
}

export default App
