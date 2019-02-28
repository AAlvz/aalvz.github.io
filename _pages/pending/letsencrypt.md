Renew

sudo certbot certonly --standalone -d blog.tinkerware.io -w /opt/tinker/shared_files/ghost/ghost-blog-site.git
disable https redirection. When doing the renew, it looks for the http page, so it should exist instead of redirecting http -> https

sudo certbot renew --pre-hook "service nginx stop" --post-hook "service nginx restart"
