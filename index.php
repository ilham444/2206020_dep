<?php 
    // Perluasan pilihan mood untuk nuansa yang lebih kaya
    $moods = [
        [ 'name' => 'Gembira', 'emoji' => '😄', 'color' => 'yellow' ],
        [ 'name' => 'Bersyukur', 'emoji' => '🙏', 'color' => 'green' ],
        [ 'name' => 'Tenang', 'emoji' => '😌', 'color' => 'cyan' ],
        [ 'name' => 'Lelah', 'emoji' => '😫', 'color' => 'slate' ], // Warna baru
        [ 'name' => 'Biasa Saja', 'emoji' => '😐', 'color' => 'stone' ], // Warna baru
        [ 'name' => 'Cemas', 'emoji' => '😟', 'color' => 'indigo' ],// Warna baru
        [ 'name' => 'Sedih', 'emoji' => '😢', 'color' => 'blue' ],
        [ 'name' => 'Marah', 'emoji' => '😠', 'color' => 'red' ],
    ];

    include 'templates/header.php'; 
?>

<!-- KONTEN UTAMA APLIKASI -->
<main id="app-container" class="w-full max-w-2xl mx-auto flex flex-col justify-center min-h-screen py-8">
    
    <!-- Bagian Form Utama -->
    <div id="reflection-form" class="bg-slate-900/70 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-slate-700 transition-all duration-500 w-full">
        
        <header class="text-center mb-8 initial-hidden">
            <h1 id="main-title" class="text-3xl md:text-4xl font-bold transition-colors duration-300 text-cyan-400 dynamic-accent-text">Jeda Sejenak</h1>
            <p class="text-slate-400 mt-2">Sebuah ruang untuk jujur pada diri sendiri.</p>
        </header>

        <form id="feeling-form">
            <!-- TAHAP 1: PEMILIHAN MOOD -->
            <div class="mb-8 initial-hidden">
                <label class="block text-lg font-semibold mb-3 text-slate-300">Bagaimana perasaanmu saat ini?</label>
                <div id="mood-selector" class="grid grid-cols-4 sm:grid-cols-8 gap-3">
                    <?php foreach ($moods as $mood): ?>
                        <div 
                            data-mood="<?= htmlspecialchars($mood['name']) ?>" 
                            data-color="<?= htmlspecialchars($mood['color']) ?>"
                            class="mood-option text-3xl p-3 bg-slate-800 rounded-lg cursor-pointer text-center transition-all duration-200 hover:bg-slate-700 hover:scale-110 flex justify-center items-center aspect-square">
                            <?= $mood['emoji'] ?>
                        </div>
                    <?php endforeach; ?>
                </div>
                <input type="hidden" name="mood" id="mood-input">
            </div>

            <!-- TAHAP 2: KONTEN REFLEKSI (Awalnya tersembunyi) -->
            <div id="reflection-content" class="hidden space-y-8">

                <!-- 2.1. Daftar Rasa Syukur -->
                <section id="gratitude-section" class="content-section">
                    <label class="block text-lg font-semibold mb-3 text-slate-300">3 Hal yang Kamu Syukuri Hari Ini</label>
                    <div class="space-y-3">
                        <input type="text" name="gratitude_1" class="gratitude-input w-full bg-slate-800 p-3 rounded-lg border border-slate-700 focus:outline-none transition-all dynamic-accent-ring" placeholder="1. ...">
                        <input type="text" name="gratitude_2" class="gratitude-input w-full bg-slate-800 p-3 rounded-lg border border-slate-700 focus:outline-none transition-all dynamic-accent-ring" placeholder="2. ...">
                        <input type="text" name="gratitude_3" class="gratitude-input w-full bg-slate-800 p-3 rounded-lg border border-slate-700 focus:outline-none transition-all dynamic-accent-ring" placeholder="3. ...">
                    </div>
                </section>

                <!-- 2.2. Pertanyaan Reflektif Kontekstual -->
                <section id="prompt-section" class="content-section">
                    <div class="flex justify-between items-center mb-3">
                        <label class="block text-lg font-semibold text-slate-300">Pemicu Refleksi</label>
                        <button type="button" id="shuffle-prompt" class="p-1 text-slate-400 hover:text-white transition-colors" title="Dapatkan pertanyaan baru">
                            <i data-lucide="shuffle" class="w-5 h-5"></i>
                        </button>
                    </div>
                    <div class="bg-slate-800 p-4 rounded-lg border border-slate-700 min-h-[70px] flex items-center">
                        <p id="prompt-question" class="text-slate-300 italic transition-opacity duration-300">Pilih mood untuk melihat pemicu refleksi...</p>
                    </div>
                </section>

                <!-- 2.3. Jurnal Bebas -->
                <section id="journal-section" class="content-section">
                    <label for="journal" class="block text-lg font-semibold mb-3 text-slate-300">Ruang Pikiranmu (Opsional)</label>
                    <textarea name="journal" id="journal" rows="5" class="w-full bg-slate-800 p-4 rounded-lg border border-slate-700 focus:outline-none transition-all dynamic-accent-ring" placeholder="Tuangkan lebih banyak pikiranmu di sini..."></textarea>
                    <p id="char-counter" class="text-right text-xs text-slate-500 mt-1 h-4"></p>
                </section>

                <!-- 2.4. Niat untuk Esok -->
                 <section id="intention-section" class="content-section">
                    <label for="intention" class="block text-lg font-semibold mb-3 text-slate-300">Satu Niat Positif untuk Esok Hari</label>
                    <input type="text" name="intention" id="intention" class="w-full bg-slate-800 p-3 rounded-lg border border-slate-700 focus:outline-none transition-all dynamic-accent-ring" placeholder="Contoh: Aku akan lebih sabar saat rapat besok.">
                </section>

                <!-- Tombol Aksi -->
                <div id="submit-section" class="text-center content-section">
                    <button type="submit" id="submit-button" class="font-bold py-3 px-8 rounded-lg transition-all duration-300 shadow-lg dynamic-accent-bg dynamic-accent-shadow">
                        Selesaikan Refleksi Hari Ini
                    </button>
                </div>
            </div>
        </form>
    </div>

    <!-- Bagian Pesan Sukses (tersembunyi) dengan Afirmasi -->
    <div id="success-message" class="hidden opacity-0 scale-95 bg-slate-900/70 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-slate-700 text-center transition-all duration-500 w-full">
        <div id="success-emoji" class="text-6xl mb-4">✨</div>
        <h2 id="success-title" class="text-3xl font-bold transition-colors duration-300 dynamic-accent-text">Refleksi Tersimpan</h2>
        <p id="success-text" class="text-slate-300 mt-2 max-w-md mx-auto">Kamu hebat telah meluangkan waktu untuk dirimu.</p>
        
        <div class="mt-6 bg-slate-800/50 border border-slate-700 rounded-lg p-4 max-w-md mx-auto">
            <p class="text-sm text-slate-400">Afirmasi untukmu hari ini:</p>
            <p id="affirmation-text" class="text-lg italic text-white mt-1">Memuat afirmasi...</p>
        </div>

        <button id="reset-button" class="mt-8 bg-slate-600 hover:bg-slate-500 text-white font-bold py-2 px-6 rounded-lg transition-all">
            Tulis Refleksi Baru
        </button>
    </div>

    <!-- Footer Aplikasi -->
    <footer class="text-center mt-12 text-slate-500 text-xs initial-hidden">
        <p>"Mengenal diri sendiri adalah awal dari semua kebijaksanaan." – Aristoteles</p>
        <p class="mt-2">Aplikasi ini adalah alat bantu refleksi diri dan bukan pengganti saran medis profesional.</p>
    </footer>
</main>

<?php 
    include 'templates/footer.php'; 
?>