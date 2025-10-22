# Installing googleapis dependency

If you encounter permission issues when installing `googleapis`, try these solutions:

## Solution 1: Close development server
```bash
# Stop the development server (Ctrl+C)
# Then install the dependency
yarn add googleapis
# Restart the development server
yarn dev
```

## Solution 2: Clear node_modules
```bash
# Remove node_modules and package-lock.json
rm -rf node_modules package-lock.json
# Clean yarn cache
yarn cache clean
# Reinstall all dependencies
yarn install
# Add googleapis
yarn add googleapis
```

## Solution 3: Use npm instead temporarily
```bash
npm install googleapis
```

## Alternative: Manual installation
If all else fails, you can manually add the dependency to package.json:

```json
{
  "dependencies": {
    "googleapis": "^134.0.0"
  }
}
```

Then run `yarn install`.

## Note
The googleapis package is essential for Google Drive integration. Without it, the file upload functionality will not work.
