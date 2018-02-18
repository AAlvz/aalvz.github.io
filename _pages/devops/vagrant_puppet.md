---
resource: true
categories: [DevOps]
title: Vagrantfile - PuppetMaster
description: Combine two great technologies
---

Using puppet master - agent in a testable environment is essential to make quick experiments before breaking your production environment… Yes It’ll probably happen anyway…


Here are the configurations you need to deploy quickly a node as a puppet server in vagrant: 


Before you do this, make sure you’re setting up the hostnames in /etc/hosts properly.
* 10.8.0.10 puppetmaster.example.com puppetmaster
* 10.8.0.20 agent.example.com agent


Having a cert name defined in /etc/puppet/puppet.conf avoid dns problems also:
(under the section of [main])
* certname = puppetmaster.adblockplus.org


Since we’re using vagrant we want to make everything quick and automatic, so we need to enable the autosign for agents. Obviously this is not a good practice in production.
* Create a file in the puppetmaster /etc/puppet with an asterisk on it to allow all. 
   * echo '*' >> /etc/puppet/autosign.conf


So here’s the important: 


* Name your machine. Use this line to name your machine. (With this you can do a `vagrant up puppetmaster`)
   * config.vm.define :puppetmaster do |config|
* Set the hostname.
   * config.vm.host_name = "puppetmaster.example.com"
* Share folders you may need. (Check syntax for versions of vagrant)
   * config.vm.share_folder "modules", "/etc/puppet/modules", "./modules"
* Provision your server with a manifest located on manifests folder same place as your Vagrant file. 
   *  config.vm.provision :puppet,
:options => ["--debug", "--verbose", "--summarize"] do |puppet|
  puppet.manifest_file  = "server.pp"       #Default=>manifests/default.pp
end
   * Other options available:
   * puppet.manifests_path = "manifests" 
   * puppet.modules_path = "manifests" 
   * If you use this, the manifests and modules will be placed in /tmp/vagrant-puppet-1/manifests-0 and /tmp/vagrant-puppet-1/modules-0














The complete example of the Vagrantfile:


1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30

	Vagrant::Config.run do |config|

 config.vm.define :puppetmaster do |config|
   config.vm.box = "puppetmaster.example.com"
   config.vm.box_url = "http://files.vagrantup.com/precise64.box"
   config.vm.forward_port 80, 8080
   config.vm.network :hostonly, "10.10.1.100"
   config.vm.host_name = "puppetmaster.example.com"
   config.vm.share_folder "modules", "/etc/puppet/modules", "./modules"

   config.vm.provision :shell, :inline => '
if ! test -f /usr/bin/puppetmaster; then 
  sudo apt-get update && sudo apt-get install -y puppetmaster
fi
'

   config.vm.provision :puppet,
     :options => ["--debug", "--verbose", "--summarize"] do |puppet|
       #puppet.manifests_path = "manifests"    # This is placed in
       #puppet.module_path    = "modules"      # /tmp/vagrant-puppet-1/modules-0
       puppet.manifest_file  = "server.pp"       #Default=>default.pp
     end

   config.vm.provision :puppet_server do |puppet| #This will do a ‘puppet agent’
      puppet.puppet_server = "puppetmaster.example.com"
   end

 end
end    

       







manifests/server.pp
Here’s a quick manifest of what your puppet server should have. We use puppet file


$str = "127.0.0.1 localhost
10.10.1.10 puppetmaster.example.com puppetmaster
10.10.1.110 agent.example.com agent
"


file {'/etc/hosts':
     ensure => file,
     content => $str,
}


file  {/etc/puppet/autosign.conf‘':
     ensure => file, 
     content => '*'
}


# Instead of IPs you could use puppet facters. For example ${ipaddress_eth1} instead the master IP.


Don’t forget to read the official documentation. And check out the agent configuration. 


http://docs.puppetlabs.com/references/latest/type.html#file
http://docs.puppetlabs.com/learning/agent_master_basic.html
https://docs.vagrantup.com/v2/provisioning/puppet_agent.html
http://docs-v1.vagrantup.com/v1/docs/provisioners/puppet_server.html


full example
https://github.com/AAlvz/puppet_MasterAgent_example_Vagrant
