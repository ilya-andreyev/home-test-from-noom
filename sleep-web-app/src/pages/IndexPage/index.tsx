import { useEffect } from "react";
import { Box } from "@chakra-ui/react";
import { getLastNightSleep } from "../../store/lastNightSleep/thunks";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  selectLastNightSleepData,
  selectLastNightSleepLoading
} from "../../store/lastNightSleep/selectors";
import { NoSleepInformation } from "../../components/NoSleepInformation";
import { SleepInformation } from "../../components/SleepInformation";
import { Loading } from "../../components/Loading";

export function IndexPage() {
  const dispatch = useAppDispatch();
  const lastNightSleepData = useAppSelector(selectLastNightSleepData);
  const lastNightSleepLoading = useAppSelector(selectLastNightSleepLoading);

  useEffect(() => {
    dispatch(getLastNightSleep());
  }, [dispatch]);

  if (lastNightSleepLoading) {
    return <Loading />;
  }

  return (
    <Box mt={16}>
      {lastNightSleepData ? (
        <SleepInformation lastNightSleepData={lastNightSleepData} />
      ) : (
        <NoSleepInformation />
      )}
    </Box>
  );
}
