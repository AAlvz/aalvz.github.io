htop

sudo apt-get install apache2-utils
http://stackoverflow.com/questions/15060762/httperf-command-options

ab -k -r -h -c 3000 -n 80000 http://192.168.33.100:3000/

OUTPUT:

```
LOG: header received:
HTTP/1.1 200 OK
Accept-Ranges: bytes
Cache-Control: public, max-age=0
Last-Modified: Mon, 25 Jul 2016 18:57:25 GMT
ETag: W/"1dd-156236b3c70"
Content-Type: text/html; charset=UTF-8
Content-Length: 477
Date: Mon, 25 Jul 2016 20:04:43 GMT
Connection: keep-alive


Completed 80000 requests
Finished 80000 requests


Server Software:        
Server Hostname:        192.168.33.100
Server Port:            3000

Document Path:          /
Document Length:        477 bytes

Concurrency Level:      3000
Time taken for tests:   78.357 seconds
Complete requests:      80000
Failed requests:        4077
   (Connect: 0, Receive: 1359, Length: 1359, Exceptions: 1359)
   Keep-Alive requests:    78641
   Total transferred:      58744827 bytes
   HTML transferred:       37511757 bytes
   Requests per second:    1020.97 [#/sec] (mean)
   Time per request:       2938.369 [ms] (mean)
   Time per request:       0.979 [ms] (mean, across all concurrent requests)
   Transfer rate:          732.14 [Kbytes/sec] received
   
   Connection Times (ms)
                 min  mean[+/-sd] median   max
                 Connect:        0  320 2008.9      0   15063
                 Processing:   364 2559 2272.5   1828   32693
                 Waiting:        0 2441 2272.9   1709   32692
                 Total:        402 2879 3230.9   1856   32735
                 
```



sudo apt-get install httperf
http://www.xenoclast.org/doc/benchmark/HTTP-benchmarking-HOWTO/node6.html
httperf --hog --server 192.168.33.100 --port 3000 --uri "/" --rate 2000 --num-con 75000 --num-call 10 --timeout 5 


OUTPUT: 

```
httperf --hog --timeout=5 --client=0/1 --server=192.168.33.100 --port=3000 --uri=/ --rate=2000 --send-buffer=4096 --recv-buffer=16384 --num-conns=75000 --num-calls=10
httperf: warning: open file limit > FD_SETSIZE; limiting max. # of open files to FD_SETSIZE
Maximum connect burst length: 3

Total: connections 8151 requests 190 replies 0 test-duration 45.479 s

Connection rate: 179.2 conn/s (5.6 ms/conn, <=1022 concurrent connections)
Connection time [ms]: min 0.0 avg 0.0 max 0.0 median 0.0 stddev 0.0
Connection time [ms]: connect 500.4
Connection length [replies/conn]: 0.000

Request rate: 4.2 req/s (239.4 ms/req)
Request size [B]: 67.0

Reply rate [replies/s]: min 0.0 avg 0.0 max 0.0 stddev 0.0 (9 samples)
Reply time [ms]: response 0.0 transfer 0.0
Reply size [B]: header 0.0 content 0.0 footer 0.0 (total 0.0)
Reply status: 1xx=0 2xx=0 3xx=0 4xx=0 5xx=0

CPU time [s]: user 0.56 system 44.86 (user 1.2% system 98.6% total 99.9%)
Net I/O: 0.3 KB/s (0.0*10^6 bps)

Errors: total 75000 client-timo 8151 socket-timo 0 connrefused 0 connreset 0
Errors: fd-unavail 66849 addrunavail 0 ftab-full 0 other 0
```
