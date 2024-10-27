import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react"
import { axiosInstance } from "../../lib/axios";
import toast from "react-hot-toast";
import { Loader } from "lucide-react";


const LoginForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const queryClient = useQueryClient();

    const {mutate: loginMutation, isLoading} = useMutation({
      mutationFn: (userData) => axiosInstance.post("/auth/login", userData),
      onSuccess: () => {
        queryClient.invalidateQueries({queryKey: ["authUser"]});
      },
      onError: (error) => {
        toast.error(error.response.data.message || "Something went wrong");
      },
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      loginMutation({ username, password });
    };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        className="input input-bordered w-full"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="input input-bordered w-full"
      />
      <button
        type="submit"
        className="btn btn-primary w-full"
      >
        {isLoading ? <Loader className="size-5 animate-spin" /> : "Login"}
      </button>
    </form>
  );
};

export default LoginForm