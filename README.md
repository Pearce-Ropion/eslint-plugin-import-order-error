## Bug Description

Import types can be assigned same rank when using 1 or more `after` statements and 9-10 `before` statements on consecutive import types.

In the base example (run example), there is an `after` group on the `external` import type and 9 `before` groups on the `internal` import type.

The correct result should look like this:

```js
import React from 'react';

import { bar } from '@namespace/bar';
import { foo } from '@namespace/foo';

import { a } from 'a';

import { b } from 'b';

import { c } from 'c';

import { d } from 'd';

import { e } from 'e';

import { f } from 'f';

import { g } from 'g';

import { h } from 'h';

import { i } from 'i';

import { j } from 'j';
import { k } from 'k';
import { l } from 'l';
import { m } from 'm';

import parent from '../parent';

import sibling from './sibling';
```

However, running the linter will result in:

```js
// Notice how `import { a } from 'a'` gets grouped with the `@namespace` imports.

import React from 'react';

import { bar } from '@namespace/bar';
import { foo } from '@namespace/foo';
import { a } from 'a';

import { b } from 'b';

import { c } from 'c';

import { d } from 'd';

import { e } from 'e';

import { f } from 'f';

import { g } from 'g';

import { h } from 'h';

import { i } from 'i';

import { j } from 'j';
import { k } from 'k';
import { l } from 'l';
import { m } from 'm';

import parent from '../parent';

import sibling from './sibling';
```

## How to run

```
yarn install
yarn lint
```

The following error should be printed

```
import-order/index.js
  4:1  error  There should be no empty line within import group  import/order
```

## Try different variations

I added some functionality into the `.eslintrc.js` so that you can see what happens when changing how many groups are available. After each change, run `yarn lint` (or `yarn lint:fix`) to see what happens.

Try changing `INTERNAL_IMPORT_GROUPS` to `8`, `9`, `10` and `11`.

- Path groups should work correctly at `8` and `11`
- Path groups are mixed in with other import types at `9` or `10`

Try changing the `USE_MULTIPLE_NAMESPACE_GROUPS` to `true`.
