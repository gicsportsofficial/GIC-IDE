interface IResp {
    value: string,
    html: boolean
}

import { version } from '@waves/ride-js';

const welcome: () => IResp = () => ({
    value: `GIC console 2.1  Docs can be found <a rel="noopener, noreferrer" target="_blank" href="https://github.com/gicsportsofficial/gic-repl/blob/master/README.md">here</a>
Use <strong>help()</strong> to show commands.
Compiler version ${version} `,
    html: true,
});

const history = async ({app, args: [n = null]}: any) => {
    const history = app.context.store.getState().history;
    if (n === null) {
        return history.map((item: any, i: number) => `${i}: ${item.trim()}`).join('\n');
    }

    // try to re-issue the historical command
    const command = history.find((item: any, i: number) => i === n);
    if (command) {
        app.onRun(command);
    }

    return;
};

const clear = ({console}: any) => {
    console.clear();
};


const commands: any = {
    welcome,
    clear,
    history
};

export default commands;
