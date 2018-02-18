---
resource: true
categories: [@eyeo, Daily_work]
title: Avoid Rules. 
description: Adaptations on workflows
date: 2014-09-21
---

Date: September 21st 2014

When arriving to a new company, is very natural that you have to **adapt to the workflow of the company**. Which apparently it takes up to 4 weeks average and 2 minimum.. depending on how many steps there are for you to work. For example you must know: 

     1. Where are the issues.
     2. How to pick them.
     3. How to take care of an issue. 
     4. Where to present your improvements. 
     5. Where to get the review.... 
    ...
.... repeat from step 3 until the change is applyed and then go back to step 1 and repeat.

If the tools are all mixed up and the steps have no much sense between them, then the company must **teach you how** everything is done. 
In my case some of the basics: 

- The issues are tracked with [Trac](http://trac.edgewall.org). 
- The code reviews in ABP [google code reviews](codereview.adblockplus.org). 
- The changes must be made via patch. 
- The main repository of code is on Mercurial. 

And knowing this, is important to point that: 

- Git and Mercurial repo are not in sync. (Yet...)
- All changes from external contributors are lost.
  - (They don't have access to the mercurial[principal] repo) 
    - When they contribute by a pull request on github, a patch is made there and then added to the main code... So: Lost. 
    - But come on! You don't contribute to an Open source to increase your reputation or geek points or something.. do you?... 
- All improvements and changes must be discussed first on [IRC](irc://irc.mozilla.org/#adblockplus) or Trac.
- Wait for aproval. 
- Each new task, bug, or improvement must be a new ticket on Trac. 
- Since the tools used for each task are different.. the only way to refer to the same stuff in different pages is using links or leaving comments. 
  - This is tough because most of the times you have **no context** of what needs to be done. Also because trac doesn't support recursive issues. 
    - The lack of context slows everythong because you need to ask and someone needs to explain when all this could be avoided. 

Based on this. One should know what to do. The thing is: `This is not obvious`. 

When a **lot of rules** are set before yo even start to work, more [accidental complexity](http://es.wikipedia.org/wiki/Accidental_complexity) is added to the process. Which means *more time* to adapt to a flux of process that is natural for everyone that has worked with it for at least a few months, but the point is make all this easier process to the new people that comes and in a company that expects growth and has been growing a lot the last months, this is a very important area of improvement to consider. 

     1. First go to the issues page.
     2. Pick an issue. By priority or one you like.
    3. Assign it to you using the issues manager tool. (Trac)
    4. 
    
    
To avoid all these steps and try to implement a faster workflow on the DevOps team [B-)] a new approach will be tested having in mind this words: **Use the right tool for your process**. This way you won't feel nor the tool, nor the process.

Our plan? **Git Hub**. Why? ... Here are some reasons: 

    * We're already working with it because:
      * Git and mercurial must be synced. 
        * Our last contributions were made using pull requests
    	1. Track of changes. We want to keep the best track of changes as possible
    	2. Branching. is important to work in parallel. 
    	3. Pull requests. make merging easy. 
    	4. We can track issues and changes refering to a specific branch or code. Wich brings context.
    	5. Everything in the same place: Discussions, issues, code, wikis, merges, pull requests. 
        
**Everything on the same place**. This makes everything **obvious**. The same tool guide you through everything you need to do because *it creates a naturall process*. 

This way. You see an issue refered to a branch where you can see the changes and where you can create the context you need, develop what you must do and make the admin life easy too with a simple click on pull request. 

This is the approach we will apply. That doesn't mean that you must use Git Hub for everything you do. This only point to the *correct choise of the tool for what you do*. 

***KISS***

Remeber who said that? ... **Keep Everything Simple Stupid** . Apply this frase in everything you do and it will be **not only natural but obvious**. 


