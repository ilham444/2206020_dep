document.addEventListener('DOMContentLoaded', function() {
    // --- KONFIGURASI DAN ELEMEN DOM ---
    const dom = {
        // ... (Elemen lama)
        form: document.getElementById('feeling-form'),
        reflectionForm: document.getElementById('reflection-form'),
        moodSelector: document.getElementById('mood-selector'),
        moodInput: document.getElementById('mood-input'),
        promptElement: document.getElementById('prompt-question'),
        journalInput: document.getElementById('journal'),
        charCounter: document.getElementById('char-counter'),
        resetButton: document.getElementById('reset-button'),

        // Elemen baru untuk konten bertingkat
        reflectionContent: document.getElementById('reflection-content'),
        contentSections: document.querySelectorAll('.content-section'),

        // Elemen baru untuk pesan sukses & afirmasi
        successMessage: document.getElementById('success-message'),
        successEmoji: document.getElementById('success-emoji'),
        successTitle: document.getElementById('success-title'),
        successText: document.getElementById('success-text'),
        affirmationText: document.getElementById('affirmation-text'),

        // Elemen dinamis
        dynamicAccentElements: document.querySelectorAll('.dynamic-accent-text, .dynamic-accent-bg, .dynamic-accent-ring, .dynamic-accent-shadow')
    };

    // --- KONTEN DINAMIS (UPGRADE SANGAT BESAR) ---

    // Pertanyaan kontekstual berdasarkan warna mood
    const prompts = {
        yellow: ["Apa puncak kebahagiaanmu hari ini?", "Siapa yang membuatmu tersenyum lebar?", "Hal apa yang membuatmu bersemangat hari ini?"],
        green: ["Apa yang membuatmu merasa damai dan bersyukur?", "Sebutkan satu kebaikan kecil yang kamu lihat atau lakukan.", "Di mana kamu menemukan keindahan hari ini?"],
        cyan: ["Apa yang membuatmu merasa paling tenang hari ini?", "Suara atau pemandangan apa yang menenangkan pikiranmu?", "Momen hening apa yang paling kamu nikmati?"],
        slate: ["Apa yang paling menguras energimu hari ini?", "Apa satu hal yang bisa kamu lakukan untuk mengisi ulang energimu?", "Istirahat seperti apa yang paling kamu butuhkan saat ini?"],
        stone: ["Apa peristiwa paling netral yang terjadi hari ini?", "Jika hari ini adalah sebuah laporan, apa judulnya?", "Apa yang kamu amati tanpa perasaan kuat hari ini?"],
        indigo: ["Apa yang memicu rasa cemasmu?", "Apa yang bisa kamu kendalikan dari situasi ini?", "Kepada siapa kamu bisa berbicara untuk merasa lebih baik?"],
        blue: ["Apa yang membuat hatimu terasa berat?", "Izinkan dirimu untuk merasakan kesedihan ini. Apa yang ia coba sampaikan?", "Apa satu hal kecil yang bisa menghiburmu saat ini?"],
        red: ["Apa sumber rasa frustrasimu?", "Jika kemarahanmu bisa bicara, apa yang akan dikatakannya?", "Bagaimana kamu bisa menyalurkan energi ini secara konstruktif?"]
    };

    // Kumpulan afirmasi positif
    const affirmations = [
        "Aku berhak merasa damai dan bahagia.",
        "Setiap napas yang kuambil memberiku kekuatan.",
        "Aku melepaskan apa yang tidak bisa kukendalikan.",
        "Aku cukup, apa adanya.",
        "Aku memilih untuk fokus pada hal-hal baik.",
        "Perasaanku valid dan penting.",
        "Aku mampu melewati tantangan apapun.",
        "Hari ini aku lebih kuat dari kemarin.",
        "Aku bersyukur atas perjalanan hidupku."
    ];

    // Palet warna yang diperluas
    const moodColorClasses = {
        yellow: { text: 'text-yellow-400', bg: 'bg-yellow-500', ring: 'focus:ring-yellow-500', shadow: 'shadow-yellow-900/50', hover: 'hover:bg-yellow-400' },
        green:  { text: 'text-green-400', bg: 'bg-green-500', ring: 'focus:ring-green-500', shadow: 'shadow-green-900/50', hover: 'hover:bg-green-400' },
        cyan:   { text: 'text-cyan-400', bg: 'bg-cyan-600', ring: 'focus:ring-cyan-500', shadow: 'shadow-cyan-900/50', hover: 'hover:bg-cyan-500' },
        slate:  { text: 'text-slate-400', bg: 'bg-slate-500', ring: 'focus:ring-slate-500', shadow: 'shadow-slate-900/50', hover: 'hover:bg-slate-400' },
        stone:  { text: 'text-stone-400', bg: 'bg-stone-500', ring: 'focus:ring-stone-500', shadow: 'shadow-stone-900/50', hover: 'hover:bg-stone-400' },
        indigo: { text: 'text-indigo-400', bg: 'bg-indigo-500', ring: 'focus:ring-indigo-500', shadow: 'shadow-indigo-900/50', hover: 'hover:bg-indigo-400' },
        blue:   { text: 'text-blue-400', bg: 'bg-blue-600', ring: 'focus:ring-blue-500', shadow: 'shadow-blue-900/50', hover: 'hover:bg-blue-500' },
        red:    { text: 'text-red-500', bg: 'bg-red-600', ring: 'focus:ring-red-500', shadow: 'shadow-red-900/50', hover: 'hover:bg-red-500' },
    };
    
    // --- FUNGSI-FUNGSI UTAMA ---

    const updatePromptBasedOnMood = (color) => {
        const availablePrompts = prompts[color] || ["Apa yang ada di pikiranmu saat ini?"];
        const randomPrompt = availablePrompts[Math.floor(Math.random() * availablePrompts.length)];
        
        dom.promptElement.style.opacity = 0;
        setTimeout(() => {
            dom.promptElement.textContent = randomPrompt;
            dom.promptElement.style.opacity = 1;
        }, 300);
    };

    const animateContentEntry = () => {
        dom.reflectionContent.classList.remove('hidden');
        dom.contentSections.forEach((el, index) => {
            el.style.opacity = 0;
            el.style.transform = 'translateY(20px)';
            setTimeout(() => {
                el.style.transition = 'opacity 0.5s, transform 0.5s';
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, 100 * (index + 1));
        });
    };

    const handleMoodSelection = (e) => {
        const selectedMood = e.target.closest('.mood-option');
        if (!selectedMood) return;

        // Reset highlight
        document.querySelectorAll('.mood-option').forEach(option => {
            option.classList.remove('ring-2', 'scale-110');
            option.classList.add('bg-slate-800');
        });

        const color = selectedMood.dataset.color;
        const colorClass = moodColorClasses[color].ring.replace('focus:', '');
        
        selectedMood.classList.add('scale-110', 'ring-2', colorClass);
        selectedMood.classList.remove('bg-slate-800');
        
        dom.moodInput.value = selectedMood.dataset.mood;
        applyAccentColor(color);
        updatePromptBasedOnMood(color);
        
        // Ungkap konten refleksi jika belum terlihat
        if (dom.reflectionContent.classList.contains('hidden')) {
            animateContentEntry();
        }
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!dom.moodInput.value) {
            alert('Pilih dulu perasaanmu untuk memulai refleksi.');
            return;
        }

        const selectedOption = document.querySelector(`.mood-option[data-mood="${dom.moodInput.value}"]`);
        dom.successEmoji.textContent = selectedOption.textContent;

        const randomAffirmation = affirmations[Math.floor(Math.random() * affirmations.length)];
        dom.affirmationText.textContent = randomAffirmation;
        
        dom.reflectionForm.classList.add('opacity-0', 'scale-95');
        setTimeout(() => {
            dom.reflectionForm.classList.add('hidden');
            dom.successMessage.classList.remove('hidden');
            setTimeout(() => {
                dom.successMessage.classList.remove('opacity-0', 'scale-95');
            }, 50);
        }, 500);
    };

    const resetState = () => {
        dom.successMessage.classList.add('opacity-0', 'scale-95');
        setTimeout(() => {
            dom.successMessage.classList.add('hidden');
            dom.reflectionForm.classList.remove('hidden');
            
            dom.form.reset();
            dom.moodInput.value = '';
            document.querySelectorAll('.mood-option').forEach(option => {
                option.classList.remove('ring-2', 'scale-110');
                option.classList.add('bg-slate-800');
            });

            // Sembunyikan lagi konten refleksi
            dom.reflectionContent.classList.add('hidden');
            dom.promptElement.textContent = 'Pilih mood untuk melihat pemicu refleksi...';

            updateCharacterCount();
            applyAccentColor('cyan'); // Kembali ke warna default
            
            setTimeout(() => {
                dom.reflectionForm.classList.remove('opacity-0', 'scale-95');
            }, 50);
        }, 500);
    };

    // --- FUNGSI LAINNYA (Helper) & INISIALISASI ---
    const applyAccentColor = (colorName = 'cyan') => { /* ... (kode sama seperti sebelumnya) ... */ const colors = moodColorClasses[colorName]; if (!colors) return; Object.values(moodColorClasses).forEach(c => { dom.dynamicAccentElements.forEach(el => { el.classList.remove(c.text, c.bg, c.ring, c.shadow, c.hover); }); }); dom.dynamicAccentElements.forEach(el => { if (el.classList.contains('dynamic-accent-text')) el.classList.add(colors.text); if (el.classList.contains('dynamic-accent-bg')) el.classList.add(colors.bg, colors.hover); if (el.classList.contains('dynamic-accent-ring')) el.classList.add(colors.ring); if (el.classList.contains('dynamic-accent-shadow')) el.classList.add(colors.shadow); }); };
    const updateCharacterCount = () => { /* ... (kode sama seperti sebelumnya) ... */ if(dom.journalInput) { const count = dom.journalInput.value.length; dom.charCounter.textContent = count > 0 ? `${count} karakter` : ''; } };
    const init = () => {
        if (!dom.form) { return; }
        if (window.lucide) { window.lucide.createIcons(); }
        if (window.particlesJS) { window.particlesJS('particles-js', {"particles":{"number":{"value":60,"density":{"enable":true,"value_area":800}},"color":{"value":"#475569"},"shape":{"type":"circle"},"opacity":{"value":0.5,"random":true},"size":{"value":3,"random":true},"line_linked":{"enable":true,"distance":150,"color":"#334155","opacity":0.2,"width":1},"move":{"enable":true,"speed":1,"direction":"none","random":false,"straight":false,"out_mode":"out","bounce":false}},"interactivity":{"detect_on":"canvas","events":{"onhover":{"enable":true,"mode":"grab"},"onclick":{"enable":false},"resize":true},"modes":{"grab":{"distance":140,"line_linked":{"opacity":0.5}}}},"retina_detect":true}); }
        
        // Animasi awal
        document.querySelectorAll('.initial-hidden').forEach((el, index) => { setTimeout(() => { el.style.transition = 'opacity 0.5s, transform 0.5s'; el.style.opacity = '1'; el.style.transform = 'translateY(0)'; }, 150 * (index + 1)); });
        
        applyAccentColor();
        updateCharacterCount();

        dom.moodSelector.addEventListener('click', handleMoodSelection);
        dom.form.addEventListener('submit', handleSubmit);
        dom.resetButton.addEventListener('click', resetState);
        dom.journalInput.addEventListener('input', updateCharacterCount);
        // Event listener untuk tombol shuffle (pastikan tidak error jika tombol tidak ada)
        const shuffleBtn = document.getElementById('shuffle-prompt');
        if (shuffleBtn) {
            shuffleBtn.addEventListener('click', () => {
                const selectedColor = document.querySelector('.mood-option.ring-2')?.dataset.color || 'cyan';
                updatePromptBasedOnMood(selectedColor);
            });
        }
    };

    init();
});