import { createBrowserHistory, createHashHistory } from 'history';
import getUserConfirmation from '@/components/Prompt/getUserConfirmation';
import config from '../config';


const history = config.history === 'hash' ? createHashHistory : createBrowserHistory;


export default history({ getUserConfirmation });
