import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../Store";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProfileSchema } from "../schemas/Profile";
import type z from "zod";
import { useProfileMutation } from "../slices/userApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { createUserInfo } from "../slices/auth";

export type profileType = z.infer<typeof ProfileSchema>;
function Profile() {
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const [profile, { isLoading }] = useProfileMutation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<profileType>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      username: userInfo?.username,
      email: userInfo?.email,
    },
  });

  const dispatch = useDispatch();

  const submit = async (data: profileType) => {
    try {
      const res = await profile(data).unwrap();
      dispatch(createUserInfo(res));
      navigate("/");
      toast.success("Profile Update Successful.");
    } catch (error) {
      const err = error as {
        data?: { message?: string };
        error?: string;
      };
      toast.error(err?.data?.message || err?.error);
    }
  };
  return (
    <section>
      <h2 className="text-3xl font-bold text-center my-6"> Profile </h2>
      <form
        className="flex flex-col items-center gap-4"
        onSubmit={handleSubmit(submit)}
      >
        <div>
          <label className="label">Username</label>
          <input type="text" className="input" {...register("username")} />
        </div>
        <div>
          <label className="label">Email</label>
          <input type="text" className="input" {...register("email")} />
        </div>
        <div>
          <label className="label">Password</label>
          <input type="password" className="input" {...register("password")} />
        </div>
        <button
          type="submit"
          className="btn"
          disabled={isSubmitting || isLoading}
        >
          Update Profile
        </button>
      </form>
    </section>
  );
}

export default Profile;
