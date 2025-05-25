export default function bindKeeper (iframeWindow: any)  {
    Object.defineProperty(iframeWindow, 'WavesKeeper', {
        get: () => {
            const keeper = WavesKeeper;
            if (keeper == null) {
                throw new Error('Gic Wallet Pro API not available. Make sure you have Gic Wallet Pro installed');
            }
            return keeper;
        }
    });
}
