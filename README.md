# Color Depth Web using the Serverless Framework


Based on the tutorial at https://serverless-stack.com

Build:
```bash
npm install
```

Start dev server:
```bash
npm start
```

Create optimized build for deployment:
```bash
npm run build
```

Deployment to production with Serverless:
```bash
sls client deploy
```

Sync the build folder
```bash
aws s3 sync build/ s3://sle-colordepth-dev
```