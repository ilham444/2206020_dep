<!DOCTYPE html>
<html lang="id" class="dark">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ruang Refleksi: Mendalami Perasaan</title>
    
    <!-- Tailwind CSS via CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    
    <!-- Lucide Icons -->
    <script src="https://unpkg.com/lucide-static@latest/dist/lucide.min.js"></script>

    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">

    <style>
        /* Container untuk animasi partikel */
        #particles-js {
            position: fixed;
            width: 100%;
            height: 100%;
            background-color: #020617; /* Warna dasar dark blue-black */
            z-index: -1; /* Posisikan di paling belakang */
        }
        /* Style untuk menyembunyikan elemen sebelum dianimasikan oleh JS */
        .initial-hidden {
            opacity: 0;
            transform: translateY(20px);
        }
    </style>
</head>
<body class="font-sans text-slate-300 antialiased">
    
    <!-- Latar Belakang Animasi Partikel -->
    <div id="particles-js"></div>

    <!-- Kontainer utama halaman -->
    <div class="min-h-screen flex flex-col items-center justify-center p-4 relative z-10">