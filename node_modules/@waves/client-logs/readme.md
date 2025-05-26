# Lite library for console logs from clients.

# Install

```sh
npm i @waves/client-logs
```

# Usage

```typescript
import { makeConsole, makeOptions } from '@waves/client-logs';

const console = makeConsole(makeOptions('verbose'));

console.log('Some arguments');
```

