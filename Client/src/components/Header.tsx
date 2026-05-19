import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import type { RootState } from "../Store";
import { useLogoutMutation } from "../slices/userApi";
import { deleteUserInfo } from "../slices/auth";
import { toast } from "react-toastify";

function Header() {
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logout, { isLoading }] = useLogoutMutation();
  const logoutHandler = async () => {
    try {
      await logout({});
      dispatch(deleteUserInfo());
      toast.success("Logout Successful.");
      navigate("/");
    } catch (error: unknown) {
      console.error(error);
      const err = error as {
        data?: { message?: string };
        error?: string;
      };
      toast.error(err?.data?.message || err?.error);
    }
  };
  return (
    <nav className="mx-auto max-w-5xl p-6 border-b-2 flex items-center justify-between">
      <Link to="/" className="font-semibold text-4xl">
        NoteShare
      </Link>
      <div className="flex gap-4">
        {userInfo ? (
          <>
            <Link to="/profile" type="button" className="btn">
              Profile
            </Link>
            <button
              type="button"
              className="btn bg-red-500!"
              onClick={logoutHandler}
              disabled={isLoading}
            >
              {" "}
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className=" btn">
              Login
            </Link>
            <Link
              to="/register"
              className=" text-sm py-2.5 px-4 border-2 border-gray-500 rounded-md hover:bg-gray-200"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Header;
