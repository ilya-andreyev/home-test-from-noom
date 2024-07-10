import { useEffect } from "react";
import { Box } from "@chakra-ui/react";
import { login } from "../store/auth/thunks";
import { getLastNightSleep } from "../store/lastNightSleep/thunks";
import { useAppDispatch } from "../store/hooks";
import { formatDate } from "../utils/date";

export function IndexPage() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const loginData = {
      username: "johndoe",
      password: "test123"
    };
    const lastNightDate = formatDate(new Date(), "yyyy-MM-dd");

    const qwe = async () => {
      await dispatch(login(loginData));
      await dispatch(getLastNightSleep(lastNightDate));
    };

    qwe();
  }, [dispatch]);

  return <Box>Hello Noomer!</Box>;
}
