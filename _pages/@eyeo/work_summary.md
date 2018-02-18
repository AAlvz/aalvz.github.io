---
resource: true
categories: [@eyeo]
title: Work Summary
description: What happened after 6 months at AdBlockPlus?
date: 2015-03-15
---

Date: March 15th 2015

###So, What [ IT ] did we really do in there after 6 months? 
--under construction--

It was pretty fun to be honest. Even the freaking legacy server of the Reports server. That was basically our first complicated task, and it was of course accomplished with success... after a few weeks of crying and screams from Matze... Yup, you know it's true... 

There are tasks that are more cool than others, and here is the summary of them: 

**Automate**

To respect the DRY rule (Don’t repeat yourself), an ENC using puppet was introduced as a solution to keep better control of the infrastructure and controling the variables in different configuration files, giving the possibility to scale and automate the infrastructure in a more professional way. What began as a ENC, was improved to integrate Hiera with it, resulting in a complete separation of the configuration files and the automation logic for the infrastructure of ABP, creating a high scalable code with less maintenance effort. 


**Migrate** Reports server. 

A legacy server ... A migration and puppet configuration was required. No documentation at all and a lot of glue scripts made in python. It resulted in a nice documentation, puppet manifest integrated in the vagrant development environment ready to 'puppet apply' in production. No more legacy.


**Continuous Integration.** 

Buildbot was decided to be the best option because of the high flexibility and a lot of python is used in the company, which made the integration with buildbot more natural. Also because of popularity. The build master and build slave manifests for puppet were made. Easy to configure now.


**Real Time Data Monitoring.**

The company needed a way to interpret the logs and answer questions with the data flowing in that precise moment. Present this data in a understandable way for all the stakeholders was important. To do this, ELK was used. Elasticsearch, Logstash and Kibana. The filters for each type of logs were made, processing (logstash) and then storing the valuable information in elasticsearch (ciphered ip's) and using kibana to aggregate and present the information.

**More Stuff**

Fixed POODLE vulnerability. Dealing with SSLv3

**More fixes and upgrades.. **
