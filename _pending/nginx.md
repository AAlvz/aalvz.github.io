# General stuff

    server {
    listen        8080;
    server_name   www.mysite.com mysite.com;
    error_log     /home/www-data/logs/nginx_www.error.log;
    error_page    404    /404.html;

# No downtime deploy or updates.

```
    upstream eyes_1 {
      server 127.0.0.1:3000;
      server 127.0.0.1:3001 backup;
      keepalive 32;
    }

    upstream eyes_2 {
      server 127.0.0.1:3000 backup;
      server 127.0.0.1:3001;
      keepalive 32;
    }

    server {
        listen 443 ssl;
        server_name provision.tinkerware.io;
        root /opt/tinker/shared_files/tinkerware_react/eyes.git;
        index index.html index.htm


        location / {
        proxy_set_header    Host $http_host;
        proxy_set_header    X-Real-IP $remote_addr;
        proxy_pass          http://eyes_1;                # HERE'S THE MAGIC
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        }
    }

    server {
        listen 8080;
        server_name _;
        root /opt/tinker/shared_files/tinkerware_react/eyes.git.test;
        index index.html index.htm;

        location / {
            proxy_set_header    Host $http_host;
            proxy_set_header    X-Real-IP $remote_addr;
            proxy_pass          http://eyes_2;              # HERE'S THE MAGIC
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "upgrade";
        }
        location /browser-sync/socket.io/ {
           proxy_pass http://127.0.0.1:3001;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection "upgrade";
        }
    }
    
```


# Serve static files

http://stackoverflow.com/questions/10631933/nginx-static-file-serving-confusion-with-root-alias

```
location /static/ {
    root /var/www/app/;
    autoindex off;
}
```

or 

```
location /static/ {
    alias /var/www/app/static/;
    autoindex off;
}
```

# prevent nginx from serving dotfiles (.htaccess, .svn, .git, etc.)

```
location ~ /\. {
    deny all;
    access_log off;
    log_not_found off;

}
```


# 504 gateway timeout 

## Proxy

```
proxy_connect_timeout       600;
proxy_send_timeout          600;
proxy_read_timeout          600;
send_timeout                600;
```


# FastCGI

## Basic proxy

```
location ~ \.php$ {
    fastcgi_pass 127.0.0.1:9000;
}
```
    
``` 
location /scripts {
    fastcgi_param REQUEST_METHOD $request_method;
    fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
    fastcgi_index index.php;
    fastcgi_pass unix:/var/run/php5-fpm.sock;
}
```

```
location ~ \.php$ {
    include fastcgi_common;
    fastcgi_param QUERY_STRING $query_string;
    fastcgi_param CONTENT_TYPE $content_type;
    fastcgi_param CONTENT_LENGTH $content_length;
    
    fastcgi_index index.php;
    fastcgi_pass 127.0.0.1:9000;
}
                        
```



## 504 gateway timeout
```
    location ~ \.php$ {
    fastcgi_pass unix:/var/run/php5-fpm.sock;
    fastcgi_index index.php;
    fastcgi_param   SCRIPT_FILENAME $document_root$fastcgi_script_name;
    fastcgi_read_timeout 180;   ## Magic line
    include fastcgi_params;
    } 
    
```

