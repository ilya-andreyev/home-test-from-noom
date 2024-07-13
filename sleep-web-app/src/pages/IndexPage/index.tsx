import { useEffect } from "react";
import { getLastNightSleep } from "../../store/sleep/thunks";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  selectLastNightSleepData,
  selectLastNightSleepLoading
} from "../../store/sleep/selectors";
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

  if (lastNightSleepData) {
    return <SleepInformation lastNightSleepData={lastNightSleepData} />;
  }

  return <NoSleepInformation />;
}
