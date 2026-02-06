import { playerDB } from "@/db/playerDB";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

type Inputs = {
  username: string;
};

//TODO: check for a better way to do this
playerDB.open();

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    navigate(`/user/${data.username}/dashboard`);
  };

  return (
    <div className="flex justify-center">
      <h1 className="">Sleeper</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          defaultValue="smokealotapotamus"
          {...register("username")}
          className="bg-white text-black ml-5"
        />
        {errors.username && <span>This field is required</span>}
        <input
          type="submit"
          className="cursor-pointer border border-white ml-5 p-2"
        />
      </form>
    </div>
  );
}
