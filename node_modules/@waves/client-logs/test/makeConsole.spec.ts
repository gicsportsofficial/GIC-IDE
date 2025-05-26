import { makeConsole, IMessage, makeOptions } from '../src/index';
import { TMessageType, IConsole } from '../src/interfaces';
import { ALL_TYPES } from '../src/constants';

const messages: Array<IMessage> = [];
const consoleMethods = {
    info: console.info,
    log: console.log,
    warn: console.warn,
    error: console.error,
};

ALL_TYPES.forEach((type: TMessageType) => {
    console[type] = (...args: Array<any>): void => {
        messages.push({ type, args });
    };
});

afterAll(() => {
    ALL_TYPES.forEach((type) => {
        console[type] = consoleMethods[type];
    });
});

beforeEach(() => {
    messages.splice(0, messages.length);
});

it('Check log to browser console with namespace', () => {
    const logger = makeConsole(makeOptions('verbose', 'Test'));

    logger.info('Some message');

    expect(messages.length).toBe(1);

    const message = messages[0];

    expect(message.type).toBe('info');
    expect(message.args).toEqual(['Test', 'Some message']);

    expect(logger.getMessages().length).toBe(0);
});

it('Check log to browser console without namespace', () => {
    const logger = makeConsole(makeOptions('verbose'));

    logger.info('Some message');

    expect(messages.length).toBe(1);

    const message = messages[0];

    expect(message.type).toBe('info');
    expect(message.args).toEqual(['Some message']);

    expect(logger.getMessages().length).toBe(0);
});

it('Check ignore borser console logs', () => {
    const logger = makeConsole();

    logger.info('Some message');

    expect(messages.length).toBe(0);
});

it('Check keep error log', () => {
    const logger = makeConsole(makeOptions('production'));

    logger.error('Some error message');

    expect(messages.length).toBe(0);

    const saved = logger.getMessages();

    expect(saved.length).toBe(1);

    const error = saved[0];

    expect(error.type).toBe('error');
    expect(error.args).toEqual(['Some error message']);
});

it('Check filters of method "getMessages"', () => {
    const logger = makeConsole({ keepMessageTypes: ALL_TYPES.slice() });

    logger.info('info');
    logger.log('log');

    const info = logger.getMessages({ messageTypes: ['info'] });

    expect(info.length).toBe(1);
    expect(info[0].type).toBe('info');
    expect(info[0].args).toEqual(['info']);
});

it('Check max keeped messages count', () => {
    const logger = makeConsole({
        keepMessageTypes: ALL_TYPES.slice(),
        keepMessageCount: 3,
    });

    logger.info('info');
    logger.log('log');
    logger.warn('warn');

    expect(logger.getMessages().length).toBe(3);

    logger.error('error');

    const messages = logger.getMessages();

    expect(messages.length).toBe(3);
    expect(messages[0].type).toBe('log');
    expect(messages[1].type).toBe('warn');
    expect(messages[2].type).toBe('error');
});
