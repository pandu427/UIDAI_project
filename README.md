# UIDAI Verifiable Credential Wallet

React + Redux Toolkit implementation for the UIDAI Sandbox Frontend Developer assignment.

## Features

- Responsive digital credential dashboard
- Redux Toolkit state management
- Mock GET `/api/credentials`
- Loading, Error and Empty states
- Reusable SecureDataMask component
- Automatic 10-second remasking
- Keyboard-accessible reveal/hide control
- ARIA live announcements
- Service Worker offline support using Cache Storage
- Jest + React Testing Library tests

## Requirements

- Node.js 18+ recommended
- npm

## Run in VS Code

1. Extract the ZIP.
2. Open the extracted `uidai-wallet` folder in VS Code.
3. Open Terminal -> New Terminal.
4. Run:

```bash
npm install
npm run dev
```

5. Open the URL shown by Vite, normally `http://localhost:5173`.

## Run tests

```bash
npm test
```

## Production build

```bash
npm run build
```

## Important

The mock API is stored at:

`public/api/credentials`

The Service Worker is:

`public/sw.js`

The reusable secure component is:

`src/components/SecureDataMask.jsx`
