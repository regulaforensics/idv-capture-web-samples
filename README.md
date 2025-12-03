# idv-capture-web-samples

A collection of simple integration examples for **`idv-capture-web`**.

This repository includes several approaches showing how to embed the `idv-capture-web` module into different environments and frameworks.

- The **cdn** folder contains a plain HTML example.  
- The **react-ts**, **angular**, and **webpack** folders contain examples of integrating `idv-capture-web` as a module into popular frameworks.

---

## 📁 Repository Structure

```
idv-capture-web-samples/
│
├─ cdn/               # Plain HTML example using CDN
├─ react-ts/          # React + TypeScript integration examples
├─ angular/           # Angular integration examples
├─ webpack/           # Webpack-based integration examples
│
└─ ... approaches inside each framework (user-pass, token, api-key)
```

---

## 🚀 Running Examples

### For frameworks (React, Angular, Webpack)

1. Navigate into the folder of the required framework.
2. Then go to the folder of the desired integration approach.
3. If the folder contains a `package.json`, run:

```
npm install
```

4. Start the project (in examples that contain scripts):

```
npm run serve
```

---

### For CDN examples

1. Navigate to the `cdn` folder.
2. Open the desired approach folder.
3. Start a **Live Server** in your IDE or run any static HTTP server.

---

## 💡 Integration Approaches

Each approach corresponds to the name of the folder.

---

## 🔐 `user-pass-approach`

This approach uses **username/password authentication** to connect to the IDV platform.

### Steps

If the folder contains a `package.json`:

```
npm install
```

Then fill in the required connection fields:

```ts
baseUrl: "",   // set host to your platform
userName: "",  // set user name
password: ""   // set password
```

Additional setup:

1. Set the `workflowId` in the `prepareWorkflow` method.
2. **Important: ONLY DEVELOPER MODE. DON'T USE Base64License FOR PRODUCTION.**
   For the DocumentReader module to work correctly, specify your DocumentReader license in **Base64 format** in the `initialize` method.  
   Look for the placeholder:

```
Base64License
```

---

## 🔗 `token-approach`

This approach uses a **workflow URL with an embedded token**, passed through the connection parameter `url`.

### Steps

If the folder contains a `package.json`:

```
npm install
```

Start the project:

```
npm run serve
```

Then configure:

1. Set the `workflowId` in the `prepareWorkflow` method.
2. Provide the workflow URL in the `workflow` query parameter.

Example:

```
http://localhost:5173/?workflow=https://your-domain.com/mobile?authorization=Token xx-xxxxxxxxx_xxxxx_xxxxxxxx
```

3. **Important: ONLY DEVELOPER MODE. DON'T USE Base64License FOR PRODUCTION.**
   Add your DocumentReader Base64 license in the `initialize` method (search for `Base64License`).

---

## 🔑 `api-key-approach`

This approach uses an **API Key** to connect to the platform.

To get an API Key, refer to the documentation:  
https://regulaforensics.atlassian.net/wiki/spaces/IDV/pages/191561880/Authorization+Schemas#API-Key

### Steps

If the folder contains a `package.json`:

```
npm install
```

Start the project:

```
npm run serve
```

Then fill in the platform connection parameters:

```ts
baseUrl: "", // set host
apiKey: "",  // set API key
ttl: 86400,  // set ephemeral device time-to-live
```

Additional setup:

1. Set the `workflowId` inside the `prepareWorkflow` method.
2. **Important: ONLY DEVELOPER MODE. DON'T USE Base64License FOR PRODUCTION.**
   Provide the DocumentReader license in Base64 format in the `initialize` method (search for `Base64License`).

---

## ⚠️ Important Notes
- To convert regula.license to base64 you can check this resource https://support.regulaforensics.com/hc/en-us/articles/15378060500881-How-to-convert-a-license-file-to-BASE64 

- Once the development is finished and your product is ready to be exposed to the internet, make sure that you have removed the license from your source code.

- Use `Base64License` only when your product is under development or testing, and you still don't expose your application to the internet. Make sure that you have removed the `Base64License` before publishing the code in production.
- In every example, placeholders marked `Base64License` indicate where the license must be added. (Only for development!)
- Make sure to provide a correct `workflowId` for your environment.

---
