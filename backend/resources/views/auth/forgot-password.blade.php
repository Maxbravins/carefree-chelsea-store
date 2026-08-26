<!DOCTYPE html>
<html>
<head>
    <title>Forgot Password - Carefree Chelsea Store</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        body { font-family: system-ui, sans-serif; background: #f3f4f6; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; }
        form { background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); width: 340px; }
        h1 { font-size: 1.25rem; margin-bottom: 0.5rem; color: #034694; }
        p { font-size: 0.875rem; color: #6b7280; margin-bottom: 1.5rem; }
        label { display: block; font-size: 0.875rem; margin-bottom: 0.25rem; color: #374151; }
        input { width: 100%; padding: 0.6rem; margin-bottom: 1rem; border: 1px solid #d1d5db; border-radius: 6px; box-sizing: border-box; }
        button { width: 100%; padding: 0.7rem; background: #034694; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; }
        .error { color: #dc2626; font-size: 0.875rem; margin-bottom: 1rem; }
        .status { color: #059669; font-size: 0.875rem; margin-bottom: 1rem; }
        .back { display: block; text-align: center; margin-top: 1rem; font-size: 0.875rem; color: #034694; text-decoration: none; }
    </style>
</head>
<body>
    <form method="POST" action="{{ route('password.email') }}">
        @csrf
        <h1>Reset Password</h1>
        <p>Enter your admin email and we'll send you a reset link.</p>

        @if (session('status'))
            <div class="status">{{ session('status') }}</div>
        @endif

        @if ($errors->any())
            <div class="error">{{ $errors->first() }}</div>
        @endif

        <label for="email">Email</label>
        <input type="email" name="email" id="email" required autofocus>

        <button type="submit">Send Reset Link</button>

        <a class="back" href="{{ route('login') }}">Back to login</a>
    </form>
</body>
</html>
