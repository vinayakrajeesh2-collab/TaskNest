import http.server
import socketserver
import mimetypes

# Ensure proper MIME types for JSX, JS, and CSS
mimetypes.add_type('application/javascript', '.jsx')
mimetypes.add_type('application/javascript', '.js')
mimetypes.add_type('text/css', '.css')
mimetypes.add_type('text/html', '.html')

class CustomHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Add CORS and caching headers
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        super().end_headers()

PORT = 5173

if __name__ == '__main__':
    # Use ThreadingHTTPServer for concurrent asset streaming
    with http.server.ThreadingHTTPServer(('', PORT), CustomHandler) as httpd:
        print(f"TaskNest local server running at http://localhost:{PORT}")
        httpd.serve_forever()
