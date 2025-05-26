import { makeOptions } from '../src/index';
import { ALL_TYPES } from '../src/constants';

it('Make verbose options', () => {
    const options = makeOptions('verbose');

    expect(options.logMessageTypes).toEqual(ALL_TYPES);
    expect(options.keepMessageTypes).toEqual([]);
    expect(options.keepMessageCount).toEqual(100);
    expect(options.namespace).toEqual(undefined);
});

it('Make error options', () => {
    const options = makeOptions('error');

    expect(options.logMessageTypes).toEqual(['error']);
    expect(options.keepMessageTypes).toEqual(['warn', 'error']);
    expect(options.keepMessageCount).toEqual(100);
    expect(options.namespace).toEqual(undefined);
});

it('Make production options', () => {
    const options = makeOptions('production');

    expect(options.logMessageTypes).toEqual([]);
    expect(options.keepMessageTypes).toEqual(['error']);
    expect(options.keepMessageCount).toEqual(100);
    expect(options.namespace).toEqual(undefined);
});
