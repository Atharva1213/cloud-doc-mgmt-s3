# Nginx Web Server

## Overview

Nginx (pronounced "engine-x") is a high-performance web server and reverse proxy server designed to efficiently serve static and dynamic content while handling many concurrent connections.

## Features

- **Web Server**: Serves static content like HTML, CSS, and images quickly.
- **Reverse Proxy**: Routes client requests to backend servers, enhancing security and load balancing.
- **Load Balancing**: Distributes incoming traffic across multiple servers to optimize resource use.
- **Caching**: Reduces server load and improves response times by caching frequently accessed content.
- **SSL/TLS Support**: Provides secure connections through HTTPS.
- **HTTP/2 Support**: Supports the latest web protocol for faster content delivery.
- **Asynchronous Processing**: Efficiently handles multiple connections in a single thread.

## Installation

### On Ubuntu

```bash
sudo apt update
sudo apt install nginx
