# react-input-overflow

Overflow input for React

[![NPM](https://img.shields.io/npm/v/react-input-overflow.svg)](https://www.npmjs.com/package/react-input-overflow) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)


<div align="center" markdown="1">
  <img src="https://i.imgur.com/yJeLtaq.gif" width="300"/>
</div>

## Install

```bash
npm install --save react-input-overflow
```

## Usage

```tsx
import React from 'react'

import InputOverflow from 'react-input-overflow'

const Example = () => {
  const [name, setName] = useState('Aivan');
  render () {
    return (
      <InputOverflow
        value={name}
        onChange={e => {
          setName(e.target.value);
        }}
      />
    )
  }
}
```

## License

MIT © [Aivan Monceller](https://github.com/geocine)
