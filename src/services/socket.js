import { io } from 'socket.io-client';

import { base } from './config';

export const socket = io(base);
