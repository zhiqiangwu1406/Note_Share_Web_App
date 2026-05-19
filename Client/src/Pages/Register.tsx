import { useForm, type SubmitHandler } from "react-hook-form";
import { registerSchema } from "../schemas/Register";
import { zodResolver } from "@hookform/resolvers/zod";
import type z from "zod";
import { useRegisterMutation } from "../slices/userApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

type registerType = z.infer<typeof registerSchema>;
function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<registerType>({
    resolver: zodResolver(registerSchema),
  });

  const [registerUser, { isLoading }] = useRegisterMutation();

  const navigate = useNavigate();

  const submit: SubmitHandler<registerType> = async (data) => {
    try {
      await registerUser(data).unwrap();
      reset();
      toast.success("Registration Successful.");
      navigate("/login");
    } catch (error) {
      const err = error as {
        data?: { message?: string };
        error?: string;
      };
      toast.error(err?.data?.message || err?.error);
    }
  };
  return (
    <section className="flex flex-col items-center">
      <h2 className="title">Register</h2>
      <form
        className="flex flex-col items-center gap-4"
        onSubmit={handleSubmit(submit)}
      >
        <div>
          <label htmlFor="username" className="label">
            Username
          </label>
          <input type="text" className="input" {...register("username")} />
          {errors.username && (
            <p className="text-red-500">{errors.username.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="email" className="label">
            Email
          </label>
          <input type="email" className="input" {...register("email")} />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="password" className="label">
            Password
          </label>
          <input type="password" className="input" {...register("password")} />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
        </div>
        <button
          type="submit"
          className="btn"
          disabled={isLoading || isSubmitting}
        >
          Register
        </button>
      </form>
    </section>
  );
}

export default Register;
