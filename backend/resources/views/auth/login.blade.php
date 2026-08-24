<!DOCTYPE html>
<html>
<head>
    <title>Admin Login - Carefree Chelsea Store</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        body { font-family: system-ui, sans-serif; background: #f3f4f6; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; }
        form { background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); width: 320px; }
        h1 { font-size: 1.25rem; margin-bottom: 1.5rem; color: #034694; }
        label { display: block; font-size: 0.875rem; margin-bottom: 0.25rem; color: #374151; }
        input { width: 100%; padding: 0.6rem; margin-bottom: 1rem; border: 1px solid #d1d5db; border-radius: 6px; box-sizing: border-box; }
        button { width: 100%; padding: 0.7rem; background: #034694; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; }
        .error { color: #dc2626; font-size: 0.875rem; margin-bottom: 1rem; }
    </style>
</head>
<body>
    <form method="POST" action="{{ route('login.attempt') }}">
        @csrf
        <h1>Carefree Chelsea Admin</h1>

        @if ($errors->any())
            <div class="error">{{ $errors->first() }}</div>
        @endif

        <label for="email">Email</label>
        <input type="email" name="email" id="email" value="{{ old('email') }}" required autofocus>

        <label for="password">Password</label>
        <input type="password" name="password" id="password" required>

        <button type="submit">Log In</button>
    </form>
</body>
</html>