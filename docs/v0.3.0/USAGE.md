# nofault v0.3.0 使用说明

## 1. 在业务代码里拿请求上下文

```ts
import { currentContext } from '@nofault/context';

@Injectable()
class OrderService {
  create() {
    const ctx = currentContext();
    log.info('order created', { traceId: ctx?.traceId });
  }
}
```

不在请求内时 `currentContext()` 返回 `undefined`。确信用得到时用 `requireContext()`（会抛错）。

## 2. 让每一行日志自动带 traceId

```ts
import { createLogger } from '@nofault/logger';
import { currentContext } from '@nofault/context';

const logger = createLogger({
  contextProvider: () => currentContext()?.toJSON(),
});
```

`contextProvider` 每条日志调用一次，返回值合并进 fields。业务代码零改动。

## 3. 声明请求级服务

```ts