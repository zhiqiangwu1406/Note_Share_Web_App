import { useForm, type SubmitHandler } from "react-hook-form";
import { loginSchema } from "../schemas/Login";
import type z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoginMutation } from "../slices/userApi";
import { createUserInfo } from "../slices/auth";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../Store";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useNavigate } from "react-router";

type loginType = z.infer<typeof loginSchema>;

function Login() {
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<loginType>({
    resolver: zodResolver(loginSchema),
  });
  const submit: SubmitHandler<loginType> = async (data) => {
    try {
      const res = await login(data).unwrap();
      dispatch(createUserInfo(res));
      reset();
      toast.success("Login Successful.");
      navigate("/");
    } catch (error: unknown) {
      const err = error as {
        data?: { message?: string };
        error?: string;
      };
      toast.error(err?.data?.message || err?.error);
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [userInfo, navigate]);

  return (
    <section className="flex flex-col m-6 items-center">
      <h2 className="title">Login</h2>
      <form
        className="flex flex-col gap-2 items-center"
        onSubmit={handleSubmit(submit)}
      >
        <div>
          <label htmlFor="email" className="label">
            Email
          </label>
          <input type="email" className="input" {...register("email")} />
          {errors.email && (
            <p className=" text-red-500">{errors.email.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="password" className="label">
            Password
          </label>
          <input type="password" className="input" {...register("password")} />
          {errors.password && (
            <p className=" text-red-500">{errors.password.message}</p>
          )}
        </div>
        <button
          type="submit"
          className="btn"
          disabled={isSubmitting || isLoading}
        >
          Login
        </button>
      </form>
    </section>
  );
}

export default Login;
