const isDevEnv = process.env.NODE_ENV === 'development'

const depricatedHosts = {
    mainnet: {
        secure: undefined,
        insecure: undefined
    }
}

const activeHosts = {
    mainnet: {
        secure: undefined,
        insecure: undefined
    }
}

const depricatedHostSecure = depricatedHosts.mainnet.secure;
const activeHostSecure = activeHosts.mainnet.secure;

const isDepricatedHost = depricatedHostSecure.includes(window.origin);
const isActiveHost = activeHostSecure.includes(window.origin);

const formatHost = (host: string) =>  host.replace(/^https?:\/\//, '');

export {
    depricatedHosts,
    activeHosts,
    depricatedHostSecure,
    activeHostSecure,
    isDepricatedHost,
    isActiveHost,
    formatHost
}