<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Carefree Chelsea Admin</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
        [x-cloak] { display: none !important; }
        body { font-family: 'Plus Jakarta Sans', sans-serif; }
    </style>
</head>
<body class="bg-slate-50 text-slate-800 antialiased" x-data="{ sidebarOpen: false }">
    <div class="min-h-screen flex flex-col lg:flex-row">

        <!-- Mobile Top Navbar -->
        <header class="lg:hidden bg-slate-900 text-white px-4 py-3.5 flex items-center justify-between sticky top-0 z-40 shadow-md">
            <div class="flex items-center gap-3">
                <div class="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white text-lg shadow-lg">C</div>
                <div>
                    <h1 class="text-base font-bold text-white leading-tight">Carefree Chelsea</h1>
                    <p class="text-[10px] text-blue-400 font-semibold uppercase tracking-wider">Admin Portal</p>
                </div>
            </div>
            <button @click="sidebarOpen = !sidebarOpen" class="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white focus:outline-none" aria-label="Toggle Sidebar Menu">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
            </button>
        </header>

        <!-- Backdrop Overlay for Mobile -->
        <div x-show="sidebarOpen"
             x-cloak
             @click="sidebarOpen = false"
             x-transition:enter="transition ease-out duration-200"
             x-transition:enter-start="opacity-0"
             x-transition:enter-end="opacity-100"
             x-transition:leave="transition ease-in duration-150"
             x-transition:leave-start="opacity-100"
             x-transition:leave-end="opacity-0"
             class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden">
        </div>

        <!-- Sidebar Drawer -->
        <aside :class="sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'"
               class="fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white flex flex-col justify-between shrink-0 shadow-2xl transition-transform duration-300 ease-in-out lg:static lg:z-auto lg:shadow-xl">
            <div>
                <div class="p-6 border-b border-slate-800 flex items-center justify-between">
                    <div class="flex items-center gap-3">
                        <div class="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white text-xl shadow-lg">C</div>
                        <div>
                            <h1 class="text-lg font-bold tracking-tight text-white">Carefree Chelsea</h1>
                            <p class="text-xs text-blue-400 font-semibold tracking-wider uppercase">Admin Portal</p>
                        </div>
                    </div>
                    <button @click="sidebarOpen = false" class="lg:hidden text-slate-400 hover:text-white p-1">
                        ✕
                    </button>
                </div>
                <nav class="p-4 space-y-1">
                    <a href="{{ route('admin.dashboard') }}"
                       @click="sidebarOpen = false"
                       class="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition {{ request()->routeIs('admin.dashboard') ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' : 'text-slate-400 hover:text-white hover:bg-slate-800' }}">
                        📊 Dashboard
                    </a>
                    <a href="{{ route('admin.products.index') }}"
                       @click="sidebarOpen = false"
                       class="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition {{ request()->routeIs('admin.products.*') ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' : 'text-slate-400 hover:text-white hover:bg-slate-800' }}">
                        📦 Products
                    </a>
                    <a href="{{ route('admin.orders.index') }}"
                       @click="sidebarOpen = false"
                       class="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition {{ request()->routeIs('admin.orders.*') ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' : 'text-slate-400 hover:text-white hover:bg-slate-800' }}">
                        🛒 Orders
                    </a>
                </nav>
            </div>
            <div class="p-4 border-t border-slate-800">
                <a href="{{ env('FRONTEND_URL', 'http://127.0.0.1:5173') }}" target="_blank" class="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition">
                    🌐 Visit Main Store ↗
                </a>
            </div>
        </aside>

        <!-- Main Content Area -->
        <main class="flex-1 flex flex-col min-w-0">
            <header class="bg-white border-b border-slate-200 px-4 sm:px-8 py-4 flex justify-between items-center sticky top-0 z-30 shadow-sm">
                <div>
                    <h2 class="text-base sm:text-xl font-bold text-slate-900 tracking-tight">Carefree Chelsea Management</h2>
                    <p class="text-xs text-slate-500 hidden sm:block">Real-time database and store controller</p>
                </div>
                <div class="flex items-center gap-4">
                    <span class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200">
                        <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> DB Sync Active
                    </span>
                </div>
            </header>

            <div class="p-4 sm:p-6 lg:p-8 flex-1">
                @if(session('success'))
                    <div class="mb-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 px-5 py-4 flex items-center justify-between shadow-sm">
                        <span class="font-medium text-sm sm:text-base">✨ {{ session('success') }}</span>
                        <button onclick="this.parentElement.remove()" class="text-emerald-500 hover:text-emerald-700">✕</button>
                    </div>
                @endif

                @yield('content')
            </div>
        </main>
    </div>
</body>
</html>