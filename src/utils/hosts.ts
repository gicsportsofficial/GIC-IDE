const isDevEnv = process.env.NODE_ENV === 'development'

const depricatedHosts = {
    mainnet: {
        secure: isDevEnv ? 'http://0.0.0.0:8082' : 'https://ide.gscscan.com',
        insecure: undefined
    }
}

const activeHosts = {
    mainnet: {
        secure: isDevEnv ? 'http://0.0.0.0:8083' : 'https://ide.gscscan.com',
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