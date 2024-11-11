---
sidebar_position: 85
---

# Testing

Both the Accelerator App and its constituent packages have access to Jest & React Testing Library (@testing-library)

Please refer to their documentation to learn more about their individual strengths and features:

- [Jest](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/example-intro)

## Running Tests

To run all of the projects tests, simple run `pnpm test` in the projects root directory.

Likewise, inside of `apps/storefront`, `packages/<ts project>` or `scripts/...`, the commands `pnpm test` or `pnpm test:watch` will run *only that sub-project's tests*.

:::info
Regardless of which command and where you run the tests, each derives from Jest's CLI. Learn more about [Jest CLI Options](https://jestjs.io/docs/cli) to tailor your use to your liking.
:::

## Adding Tests

### *Simple Unit Tests*

In order to create a test you should create a new `<test subject>.test.ts(x)` file adjacent to the file being tested. For test cases with few dependencies, simply import the items to be tested–*you will find `describe` and `it` primitives are available w/o import.*

```ts title='packages/commercetools/.../get-variant-by-id.test.ts'
import { getVariantById } from './get-variant-by-id'

function fakeVariant(id: number) {
  return { id, sku: `FOO-${id}`, images: [], attributesRaw: [] }
}

describe('getVariantById', () => {
  const skuOne = fakeVariant(1)
  const skuTwo = fakeVariant(2)
  const product = {
    id: 'FOO', version: 42,
    masterVariant: skuOne,
    variants: [
      skuTwo
    ]
  }

  it('should return variants that match by-id.', () => {
    const variantOne = getVariantById({ id: 1, product })
    expect(variantOne).toBeDefined()
    const variantTwo = getVariantById({ id: 2, product })
    expect(variantTwo).toBeDefined()
  })

  it('should return the master variant when the id is not found.', () => {
    const id = 13
    const variant = getVariantById({ id, product })
    expect(variant).toBe(skuOne)
  })
})
```

### *DOM element validation*

In order to render the react component we use the `render` function from `react-testing-library`. To select DOM elements/texts, we use the `screen` utility.

```ts
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
const SampleComponent = () => {
  return <div data-testid="SampleComponent">Sample Text</div>;
};
describe('Sample', () => {
  it('DOM', () => {
    // Render component
    const { container } = render(<SampleComponent />);
    // Find contents
    const compContainer = screen.getByTestId('SampleComponent');
    // Validation
    expect(compContainer).toBeInTheDocument();
    // Find contents
    const textContainer = screen.getByText('Sample Text');
    // Validation
    expect(textContainer).toBeInTheDocument();
  });
});
```

### *Snapshot tests*

Snapshot testing is an approach where we store a “snapshot” of the generated HTML and compare it to the new generated HTML to check for differences.
In the first run we store the HTML and the future runs will compare the HTML output to the stored snapshot

```ts
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
const SampleComponent = () => {
  return <div data-testid="SampleComponent">Sample Text</div>;
};
describe('Sample', () => {
  it('Snapshot', () => {
    // Render
    const { container } = render(<SampleComponent />);
    // Compare with previous screenshot
    expect(container).toMatchSnapshot();
  });
});
```

If the component must change it’s output run `pnpm test --updateSnapshot`

### *Hook Tests*

Testing hooks is not possible with just JEST. Since hooks are just functions it seems that we could test them as other JS/TS code, but the hook only works when rendered inside the React context.

To that end, react-testing-library provides the `renderHook` function:

```ts
import '@testing-library/jest-dom';
import { renderHook, act } from '@testing-library/react-hooks';

const useSampleHook = () => {
  const [text, setText] = useState('');
  useEffect(() => {
    setText('Hook Text');
  }, []);
  return {
    text,
    setText,
  };
};

describe('Sample', () => {
  it('Hook', async () => {
    // "render" the hook
    const { result } = renderHook(useSampleHook);
    // Validate initial state
    expect(result.current.text).toEqual('Hook Text');
    // Perform changes on the hook
    act(() => {
      result.current.setText('New Text');
    });
    // Validate the new state
    expect(result.current.text).toEqual('New Text');
  });
});
```
