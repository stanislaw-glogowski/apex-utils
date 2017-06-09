# Apex Utils

Collection of helpers useful in a work with Node.js on [AWS Lambda](http://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-handler.html) inspired by [node-apex](https://github.com/apex/node-apex).

## Installation

```bash
$ npm install apex-utils --save
```

## Features

- Build on promises
- Throws uncaught errors to lambda callback
- [API Gateway](https://aws.amazon.com/api-gateway/) handler creator
- TypeScript ready
- No external dependencies

## Examples

```typescript
import { createLambda } from "apex-utils";

interface IEvent {
  name: string;
}

export const handler = createLambda(({event, context}) => {
  const { name } = event as IEvent;
  if (name === "world") {
    throw "error"; // call callback with throwed error and null data
  }
  return `Hello ${name}!`; // call callback with null error and returned value
});

export const asyncHandler = createLambda(async ({event, context}) => {
  const name = await new Promise((resolve, reject) => {
    const { name } = event as IEvent;
    if (name === "world") {
      reject("error"); // call callback with rejected error and null data
    } else {
      resolve(name);
    }
  });
  return `Hello ${name}!`; // call callback with null error and returned value
});

```

[More Examples](https://github.com/stanislaw-glogowski/apex-typescript-example)

## License

The MIT License