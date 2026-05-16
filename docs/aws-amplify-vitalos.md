# Deploying VitalOS on AWS Amplify

AWS Amplify Hosting can deploy the VitalOS **PWA shell** quickly from this repo. The current Amplify build uses `amplify.yml`, runs `npm ci`, runs `npm run build`, and publishes the static `dist` folder.

## What Amplify can host

- The React/Vite VitalOS shell.
- The fullscreen PWA manifest and icon.
- Browser-approved hardware probes such as camera, microphone, geolocation, Bluetooth where supported, and motion sensors.
- Client-side fallback previews when the `/api` backend is not connected.

## What Amplify static hosting cannot host by itself

Amplify static hosting does **not** run `server.ts`, so these Express endpoints require a separate backend service:

- `GET /api/vitalos/agent-providers`
- `GET /api/vitalos/blueprint`
- `POST /api/vitalos/apps/generate`
- `POST /api/vitalos/apps/:appId/install`

Use one of these AWS backends for the API layer:

1. **AWS App Runner** with this repo's Dockerfile.
2. **ECS Fargate** with an ECR image built from the Dockerfile.
3. **EC2 + Docker** using the Dockerfile directly.
4. **Lambda/API Gateway** after extracting the Express routes into Lambda handlers.

## Amplify environment variables

In Amplify, open:

```text
App settings → Environment variables
```

Add public frontend values:

```env
VITE_API_URL=https://your-api-domain.example.com/api
APP_URL=https://your-amplify-domain.example.com
```

If you only add Claude/OpenAI/Gemini/Grok keys to Amplify Hosting secrets, nothing visible will happen because Amplify static hosting builds public files and does not run `server.ts`. Provider secrets must be added to the separate backend runtime that serves `/api`.

Do **not** put provider secrets in frontend code. Keep these on the backend service only:

```env
GEMINI_API_KEY=
ANTHROPIC_API_KEY=
OPENAI_API_KEY=
DEEPCODE_API_KEY=
XAI_API_KEY=
CORS_ORIGIN=https://your-amplify-domain.example.com
```

After the backend is deployed, set `VITE_API_URL` in Amplify to that backend URL and redeploy the frontend.

```

## Recommended AWS production layout

```text
Amplify Hosting
  └─ VitalOS PWA frontend

App Runner / ECS / EC2
  └─ Express API from server.ts
     ├─ /api/vitalos/agent-providers
     ├─ /api/vitalos/blueprint
     ├─ /api/vitalos/apps/generate
     └─ /api/vitalos/apps/:appId/install

AWS Secrets Manager or runtime environment variables
  └─ Claude/OpenAI/Gemini/DeepCode/Grok keys
```

## Hardware access note

AWS hosts the control plane, but phone hardware access happens on the device through HTTPS browser APIs or a future native VitalOS device agent. For deeper kernel/HAL access, build and flash a native owner-authorized OS image on supported phone hardware.
