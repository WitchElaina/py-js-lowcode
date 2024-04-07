import { useSelector } from 'react-redux';
import { Setting } from '../types/settings';
import axios from 'axios';

export const useRequests = () => {
  const settings = useSelector<{ settings: Setting }, Setting>(
    (state) => state.settings,
  );
  const { pyAdapterHost, pyAdapterPort } = settings;
  const API_URL = `${pyAdapterHost}${
    pyAdapterPort ? `:${pyAdapterPort}` : ':'
  }`;

  const getFuncList = async () => axios.get(`http://${API_URL}/list/name`);

  const getFuncDetailList = async () => axios.get(`http://${API_URL}/list`);

  const execFunc = async (funcName: string, args: any[]) =>
    axios.post(`http://${API_URL}/exec`, {
      name: funcName,
      args,
    });

  return {
    getFuncList,
    getFuncDetailList,
    execFunc,
  };
};
