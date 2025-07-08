# Gunakan base image resmi PHP 8.1 dengan server Apache
FROM php:8.2-apache

# Salin semua file proyek ke dalam direktori web server di dalam container
COPY . /var/www/html/

# Expose port 80 untuk akses HTTP
EXPOSE 80