# Gunakan base image resmi PHP dengan server Apache
FROM php:8.2-apache

# Salin semua file dari direktori proyek saat ini ke dalam direktori web server di dalam container
# Lokasi /var/www/html adalah root folder default untuk Apache di image ini
COPY . /var/www/html/

# (Opsional) Instal ekstensi PHP yang mungkin dibutuhkan di masa depan
# Contoh: RUN docker-php-ext-install mysqli pdo pdo_mysql && docker-php-ext-enable mysqli

# Expose port 80, port default untuk HTTP
EXPOSE 80