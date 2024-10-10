import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { auth } from "../lib/firebase";
import Container from "../ui/Container";
import Registration from "../ui/Registration";
import UserInfo from "../ui/UserInfo";
import Loading from "../ui/Loading";
import { setLoading, getUserInfo ,clearUserInfo} from "../lib/storeSlice"; // Import actions

const Profile = () => {
  const dispatch = useDispatch();
  const { currentUser, isLoading } = useSelector((state) => state.store);

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setLoading(true)); // Set loading state while fetching user info
        dispatch(getUserInfo(user.uid));
      } else {
        dispatch(clearUserInfo());
        dispatch(setLoading(false));
      }
    });

    return () => {
      unSub();
    };
  }, [dispatch]);

  return (
    <Container>
      {isLoading ? (
        <Loading />
      ) : (
        currentUser ? <UserInfo /> : <Registration />
      )}
    </Container>
  );
};

export default Profile;
