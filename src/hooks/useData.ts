import { useEffect, useState } from "react";
import stream from "../config";

const useData = (onDataReceived: (data: any) => void) => {
  const [restartCount, setRestartCount] = useState<number>(0);

  const [connected, setConnected] = useState<boolean>(false);

  useEffect(() => {
    if (!connected) {
      const dataStream = new EventSource(stream);

      dataStream.onmessage = (e) => onDataReceived(JSON.parse(e.data));
      dataStream.onopen = (_e) => {
        setConnected(true);
        console.log("connected to data stream");
      };

      dataStream.onerror = (e) => {
        // console.log(e);

        setTimeout(() => {
          setRestartCount(restartCount + 1);
        }, 1000);
      };

      return () => {};
    }
  }, [onDataReceived, restartCount]);
};

export default useData;
