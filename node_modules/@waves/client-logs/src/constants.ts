import { TMessageType, IMakeOptions } from './interfaces';

export const ALL_TYPES: Array<TMessageType> = ['info', 'log', 'warn', 'error'];

export const DEFAULT_MAKE_OPTIONS: IMakeOptions = {
    keepMessageCount: 100,
    keepMessageTypes: ['error'],
    logMessageTypes: ['error'],
    namespace: undefined,
};
