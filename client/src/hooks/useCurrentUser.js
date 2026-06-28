import { useAuth } from "../contexts/AuthContext";

/**
 * Returns formatted information about the
 * authenticated Firebase user.
 */
const useCurrentUser = () => {
  const { user } = useAuth();

  const fullName = user?.displayName ?? "Guest";

  const firstName = fullName.split(" ")[0];

  const email = user?.email ?? "";

  const photoURL = user?.photoURL ?? "";

  const initials = fullName
    .split(" ")
    .map((name) => name[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  return {
    user,
    fullName,
    firstName,
    email,
    photoURL,
    initials,
  };
};

export default useCurrentUser;
