import { useLocalSearchParams } from "expo-router";
import { useUser } from "../../app/context/UserContext";
import DeleteUserHeader from "./DeleteUserHeader";
import ProfileSettingsHeader from "./ProfileSettingsHeader";

const ShowSettingsOrDeleteHeader = () => {
  const { id } = useLocalSearchParams();
  const { user } = useUser();

  if (user?.isAdmin && user?._id !== id) {
    return <DeleteUserHeader />;
  } else {
    return <ProfileSettingsHeader />;
  }
};

export default ShowSettingsOrDeleteHeader;
