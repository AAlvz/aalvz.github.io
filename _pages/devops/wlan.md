---
resource: true
categories: [DevOps]
title: Wlan
description: Wlan
---

```
cat /var/lib/dhcp/dhclient.wlan0.leases
```

```
lease {
  interface "wlan0";
  fixed-address 192.168.1.234;
  option subnet-mask 255.255.255.0;
  option routers 192.168.1.1;
  option dhcp-lease-time 7200;
  option dhcp-message-type 5;
  option domain-name-servers 192.168.1.1;
  option dhcp-server-identifier 192.168.1.1;
  option domain-name "eyeo.intern";
  renew 4 2015/02/05 11:50:27;
  rebind 4 2015/02/05 12:40:43;
  expire 4 2015/02/05 12:55:43;
}
```

```
route -n
```

```
Kernel IP routing table
Destination     Gateway         Genmask         Flags Metric Ref    Use Iface
0.0.0.0         192.168.1.1     0.0.0.0         UG    1024   0        0 wlan0
169.254.0.0     0.0.0.0         255.255.0.0     U     1000   0        0 wlan0
192.168.1.0     0.0.0.0         255.255.255.0   U     0      0        0 wlan0
```

```
# This file describes the network interfaces available on your system
# and how to activate them. For more information, see interfaces(5).

# The loopback network interface
auto lo
iface lo inet loopback


# auto wlan0
# iface wlan0 inet static
#   address 192.168.1.234
#   gateway 192.168.1.1

#   network 192.168.1.0
#   netmask 255.255.255.0
#   broadcast 192.168.1.255
```

```
service networking restart && service network-manager restart
```

http://ubuntuforums.org/showthread.php?t=1426270
https://www.linode.com/docs/networking/linux-static-ip-configuration
