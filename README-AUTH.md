# Authentication Implementation

This project now includes a complete Auth0-based authentication system following the specified architecture.

## Features Implemented

### 1. Custom `useAuth` Hook (`lib/auth.ts`)

- Session state management
- User authentication status
- Login/logout functionality
- Automatic auth checking
- Auth state subscription system

### 2. API Client with Auth (`lib/api.ts`)

- Automatic credential inclusion
- 401 error handling with redirect
- RESTful methods (GET, POST, PUT, DELETE, PATCH)
- Auth state integration

### 3. UI Components

- `AuthButton` - Login/logout button with user display
- `LoginPage` - Full page login interface
- Integrated into existing navigation bar

### 4. Route Protection

- `withAuth` HOC for protecting pages
- Automatic redirect to login for unauthenticated users
- Loading states during auth checks

## Usage Examples

### Using the Auth Hook

```tsx
import { useAuth } from "@/lib/auth";

function MyComponent() {
  const { user, isAuthenticated, loading, login, logout } = useAuth();

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {isAuthenticated ? (
        <div>Welcome {user?.name}!</div>
      ) : (
        <button onClick={login}>Login</button>
      )}
    </div>
  );
}
```

### Making API Calls

```tsx
import { apiClient } from "@/lib/api";

// Authenticated API calls
const response = await apiClient.get("user/profile");
const user = await response.json();
```

### Protecting Routes

```tsx
import { withAuth } from "@/components/auth/withAuth";

function ProtectedPage() {
  return <div>This page requires authentication</div>;
}

export default withAuth(ProtectedPage);
```

### Using AuthButton

```tsx
import { AuthButton } from "@/components/auth/AuthButton";

function Navigation() {
  return (
    <nav>
      <AuthButton />
    </nav>
  );
}
```

## Auth Flow

1. User clicks login → redirects to `api.cynxio.com/auth0/login`
2. Auth0 handles authentication → redirects to callback
3. Backend sets HTTP-only session cookie → redirects to frontend
4. Frontend checks auth status via `/auth0/me` endpoint
5. User state is managed globally via the auth hook

## API Endpoints Expected

The system expects these backend endpoints:

- `GET /auth0/login` - Initiate Auth0 login
- `GET /auth0/logout?type=full|local` - Logout
- `GET /auth0/me` - Get current user info

## File Structure

```
lib/
├── auth.ts              # Auth hook and manager
└── api.ts               # API client with auth

components/
└── auth/
    ├── AuthButton.tsx   # Login/logout button
    ├── LoginPage.tsx    # Login page component
    └── withAuth.tsx     # Route protection HOC

app/
├── login/
│   └── page.tsx        # Login page route
└── resume/
    └── page.tsx        # Protected page example
```

## Environment Variables

Required in `.env`:

```
NEXT_PUBLIC_JANUS_BASE_URL=https://api.cynxio.com/
```

## Security Features

- HTTP-only cookies (managed by backend)
- Automatic token refresh handling
- 401 error interception and redirect
- CSRF protection (via backend state parameter)
- Secure credential transmission

The authentication system is now fully integrated and ready for use!
