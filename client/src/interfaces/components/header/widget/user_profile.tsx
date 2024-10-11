import { UserCircleIcon } from "@heroicons/react/24/outline";
import { useProfileQuery } from "../../../../cores/apis/security.slice";
import { Fetchingdata } from "../../fetching_data";

export const UserProfile = () => {
  const { data: profile, ...profileState } = useProfileQuery("");
  return (
    <Fetchingdata {...profileState}>
      <div id="#" className="flex items-center flex-col justify-center">
        <UserCircleIcon className="size-20" />

        <div className="flex flex-col items-center ">
          <span>
            {profile?.data.firstname} {profile?.data.lastname}
          </span>
          <span>{profile?.data.phone}</span>
        </div>
        <div className="flex flex-col items-center "></div>
      </div>
    </Fetchingdata>
  );
};
