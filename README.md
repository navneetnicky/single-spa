# Single-SPA Micro-Frontend Project

This project demonstrates a **Single-SPA** implementation with:
- **React 16 app** (routes: `/home`, `/about`, `/contact`)
- **Vite app with React 18** (routes: `/dashboard`, `/profile`, `/settings`)

## ✨ Features

✅ **Separate Routes** - Each app manages its own routes independently
✅ **Shared localStorage & Cookies** - Data automatically shared between apps
✅ **Deep Linking** - All routes work with browser back/forward buttons
✅ **Independent Development** - Run and develop each app separately
✅ **Different React Versions** - React 16 and React 18 coexist without conflicts

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ installed
- npm or yarn

### Installation & Running

**Option 1: Run all apps manually**

```bash
# Terminal 1 - Root Config
cd root-config
npm install
npm start
# Runs on http://localhost:9000

# Terminal 2 - React 16 App
cd react16-app
npm install
npm start
# Runs on http://localhost:8080

# Terminal 3 - Vite App
cd vite-app
npm install
npm run dev
# Runs on http://localhost:5173
```

**Option 2: Use the provided script (Unix/Mac)**

```bash
chmod +x start-all.sh
./start-all.sh
```

### Access the Application

Open your browser to: **http://localhost:9000**

## 📂 Project Structure

```
single-spa-project/
├── root-config/          # Single-SPA orchestrator
│   ├── src/
│   │   ├── index.html    # Main HTML with import maps
│   │   └── index.js      # App registration
│   └── package.json
│
├── react16-app/          # React 16 micro-frontend
│   ├── src/
│   │   ├── pages/        # Home, About, Contact pages
│   │   ├── Root.jsx      # Root component with routing
│   │   └── index.js      # Single-SPA lifecycle
│   └── package.json
│
└── vite-app/             # Vite + React 18 micro-frontend
    ├── src/
    │   ├── pages/        # Dashboard, Profile, Settings pages
    │   ├── Root.jsx      # Root component with routing
    │   └── main.jsx      # Single-SPA lifecycle
    └── package.json
```

## 🎯 How It Works

### Route Distribution

**React 16 App handles:**
- `/` (redirects to /home)
- `/home`
- `/about`
- `/contact`

**Vite App (React 18) handles:**
- `/dashboard`
- `/profile`
- `/settings`

### Navigation

You can navigate between apps using regular React Router Links:

```jsx
// From React 16 app to Vite app
<Link to="/dashboard">Go to Dashboard</Link>

// From Vite app to React 16 app
<Link to="/home">Go to Home</Link>
```

### Shared Data

Both apps share the same `localStorage` and cookies:

```jsx
// In React 16 app
localStorage.setItem('user', JSON.stringify(userData));

// In Vite app - automatically accessible!
const user = JSON.parse(localStorage.getItem('user'));
```

## 🔧 Development

### Modifying React 16 App

```bash
cd react16-app
# Make your changes
# Hot reload will automatically update
```

### Modifying Vite App

```bash
cd vite-app
# Make your changes
# Vite's HMR will automatically update
```

### Adding New Routes

**To React 16 app:**
1. Add route in `react16-app/src/Root.jsx`
2. Update `activeWhen` in `root-config/src/index.js`

**To Vite app:**
1. Add route in `vite-app/src/Root.jsx`
2. Update `activeWhen` in `root-config/src/index.js`

## 📦 Building for Production

```bash
# Build all apps
cd root-config && npm run build
cd ../react16-app && npm run build
cd ../vite-app && npm run build
```

The built files will be in each app's `dist/` folder.

## 🐛 Troubleshooting

### Apps not loading?

1. Make sure all three servers are running
2. Check browser console for errors
3. Verify ports: 9000 (root), 8080 (React 16), 5173 (Vite)

### Routes not working?

1. Clear browser cache and localStorage
2. Check `activeWhen` configuration in `root-config/src/index.js`
3. Ensure both apps are using correct router (BrowserRouter)

### localStorage not shared?

- localStorage and cookies are automatically shared when apps run on the same domain
- In development (different ports), they still share the same localStorage

## 📝 Key Implementation Details

### SystemJS Import Maps

The root config uses SystemJS import maps to load apps:

```html
<script type="systemjs-importmap">
{
  "imports": {
    "@myapp/react16": "http://localhost:8080/myapp-react16.js",
    "@myapp/vite": "http://localhost:5173/dist/myapp-vite.js"
  }
}
</script>
```

### Single-SPA Lifecycle

Each app exports these lifecycle functions:
- `bootstrap` - Initialize the app
- `mount` - Render the app
- `unmount` - Clean up the app

### React Version Isolation

- React 16 is bundled in the React 16 app
- React 18 is bundled in the Vite app
- They don't conflict because each app uses its own React instance

## 🌟 Features Demo

### localStorage Sharing
1. Go to `/home` (React 16)
2. Increment the counter
3. Go to `/dashboard` (Vite)
4. See the same counter value!

### Deep Linking
1. Navigate to `/profile`
2. Copy the URL
3. Open in new tab - loads directly to Profile page!

### Browser Navigation
- Click browser back/forward buttons
- Works seamlessly across both apps

## 📚 Resources

- [Single-SPA Documentation](https://single-spa.js.org/)
- [React 16 Docs](https://legacy.reactjs.org/)
- [React 18 Docs](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)

## 🤝 Contributing

Feel free to modify and extend this project for your needs!

## 📄 License

MIT License - feel free to use this project as a template.
