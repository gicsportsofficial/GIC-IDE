import {
    TMessageType,
    IMakeOptions,
    IConsole,
    IGetMessageOptions,
} from './interfaces';
import { MessageKeeper } from './MessageKeeper';
import { DEFAULT_MAKE_OPTIONS, ALL_TYPES } from './constants';
import { toHash } from './utils/toHash';
import { identity } from './utils/identity';

export {
    IMakeOptions,
    IConsole,
    IMessage,
    IGetMessageOptions,
} from './interfaces';

declare const VERSION: string;

export const makeConsole = (options?: Partial<IMakeOptions>): IConsole => {
    const makeOptions = { ...DEFAULT_MAKE_OPTIONS, ...(options ?? {}) };
    const keeper = new MessageKeeper(makeOptions.keepMessageCount);
    const logTypes = toHash(makeOptions.logMessageTypes);
    const keepTypes = toHash(makeOptions.keepMessageTypes);

    return ALL_TYPES.reduce(
        (methods: any, type: TMessageType) => {
            const addNamespace =
                makeOptions.namespace != null
                    ? (args: any[]): any[] => [makeOptions.namespace, ...args]
                    : identity;
            const setToConsole = logTypes[type] ? console[type] : identity;
            const setToKeeper = keepTypes[type]
                ? (args: Array<any>): void => keeper.push({ type, args })
                : identity;

            methods[type] = (...args: Array<any>): void => {
                const list = addNamespace(args);

                setToConsole(...list);
                setToKeeper(list);
            };

            return methods;
        },
        {
            getMessages: (options?: IGetMessageOptions) =>
                keeper.getMessages(options),
        }
    ) as IConsole;
};

export const version =
    typeof VERSION !== 'undefined' ? VERSION : 'BUILD_VERSION';

export function makeOptions(
    logLevel: 'verbose' | 'error' | 'production',
    namespace?: string
): IMakeOptions {
    // eslint-disable-next-line default-case
    switch (logLevel) {
        case 'production':
            return {
                ...DEFAULT_MAKE_OPTIONS,
                keepMessageTypes: ['error'],
                logMessageTypes: [],
                namespace,
            };
        case 'error':
            return {
                ...DEFAULT_MAKE_OPTIONS,
                keepMessageTypes: ['warn', 'error'],
                logMessageTypes: ['error'],
                namespace,
            };
        case 'verbose':
            return {
                ...DEFAULT_MAKE_OPTIONS,
                keepMessageTypes: [],
                logMessageTypes: ALL_TYPES.slice(),
                namespace,
            };
    }
}

export default makeConsole;
