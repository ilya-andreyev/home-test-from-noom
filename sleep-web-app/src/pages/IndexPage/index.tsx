import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  selectLastNightSleepDataIsLoading,
  selectLast30NightsSleepDataIsLoading,
  selectLastNightSleepData,
  selectLast30NightsSleepData
} from "../../store/sleep/selectors";
import {
  getLastNightSleep,
  getLast30NightsSleep
} from "../../store/sleep/thunks";
import { Loading } from "../../components/Loading";
import { SleepInfo } from "../../components/SleepInfo";
import { NoSleepInfo } from "../../components/NoSleepInfo";

export function IndexPage() {
  const dispatch = useAppDispatch();

  const lastNightSleepDataIsLoading = useAppSelector(
    selectLastNightSleepDataIsLoading
  );
  const last30NightsSleepDataIsLoading = useAppSelector(
    selectLast30NightsSleepDataIsLoading
  );
  const lastNightSleepData = useAppSelector(selectLastNightSleepData);
  const last30NightsSleepData = useAppSelector(selectLast30NightsSleepData);

  useEffect(() => {
    dispatch(getLastNightSleep());
    dispatch(getLast30NightsSleep());
  }, [dispatch]);

  const isLoading =
    lastNightSleepDataIsLoading || last30NightsSleepDataIsLoading;

  const isSleepDataReady = lastNightSleepData && last30NightsSleepData;

  if (isLoading) {
    return <Loading />;
  }

  if (isSleepDataReady) {
    return (
      <SleepInfo
        lastNightSleepData={lastNightSleepData}
        last30NightsSleepData={last30NightsSleepData}
      />
    );
  }

  return <NoSleepInfo />;
}
