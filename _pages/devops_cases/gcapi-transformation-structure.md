Post 1.

The Problem, the current state and the How
=======

- "Production is down!"

Rings any bell? That happened the week I joined the project. The same week the project was launched to production. Apparently the whole team stayed up working (or available) until around 11pm... (Maybe later? I don't remember really...) when Production was working again.

Of course there were kudos for everyone at the next day for showing interest. And of course, the fear for the `On Call` role started. 

But this was not the only issue. There were a lot of problems to be able to develop features, the way we were handling branches and the whole workflow was not really clear to everyone and it was not optimal... The team didn't get along... well.. let's go to facts.  Here are a couple of things I remember:

We started like this: 
===

BEFORE: 
===

|    Task     | Besct Case Scenario  | Worst Case Scenario |
|-------------|----------------------|---------------------|
| Create new Dev Environment | 4 hours | 5 days |
| Production deployments | 4 features/ 2 weeks | 4 features / 2 weeks|
| NonProd Deployment | 4 hours | 2 days |
| Production failures / Week| 1 | 5 |
| (MTTR) Media time to repair | 1 day | 2 days|

Other metrics we had:
---

  * 4 feature deployment every two weaks (Avg)
  * 3 development environments only. 1 of them for QA Only
  * 9/10 NonProd deployments failed. 
  * Infrastructure code fixed to work in only one landing zone.
  * ~11 repositories to handle the whole service

Mindset.
---

  - **Automation**. 
    When we used to talk about automation, the response was basically "Why would we?"
    At first, it was complicated trying to make some members of the team visualize the benefits of automation
  - **Infrastructure as code**
    A lot of manual steps happened before, so we were lost if we tried to replicate our servers. 
    Everything was fixed or hardcoded and our scripts wouldn't work out of the environment we had set. 


AFTER
===

 
|    Task     | Besct Case Scenario  | Worst Case Scenario |
|-------------|----------------------|---------------------|
| Create new Dev Environment | 30 minutes | 50 minutes |
| Production deployments | 5 features/ day | 4 features / 2 weeks|
| NonProd Deployment | 4 hours | 2 days |
| Production failures / Week| 1 | 5 |
| (MTTR) Media time to repair | 1 day | 2 days|

Other metrics we had:
---

  * 4 feature deployment every two weaks (Avg)
  * 3 development environments only. 1 of them for QA Only
  * 9/10 NonProd deployments failed. 
  * Infrastructure code fixed to work in only one landing zone.
  * 2 repositories. One for code, one for infra.

Mindset.
---

  - **Automation**. 
    When we used to talk about automation, the response was basically "Why would we?"
    At first, it was complicated trying to make some members of the team visualize the benefits of automation
  - **Infrastructure as code**
    A lot of manual steps happened before, so we were lost if we tried to replicate our servers. 
    Everything was fixed or hardcoded and our scripts wouldn't work out of the environment we had set. 

IN SUMMARY
===

This shows that we improved:

**Lead time**: Reduced by 200% (Based on deployments per day)
**MTTR**: 500%



HOW? 

Here are 6 very important things to keep in mind when starting a DevOps transformation story: 

1. Focus on the team. 
   - Tips on how to improve the team. 
2. Don't repeat yourself.
3. Focus efforts. 
   - The client asked for documents. 
   - First issue: We created a document and we put a lot of effort into it.
   - When we presented the index to the client, he didn't care. We started making a diagram to replace the doc. 
   - Talk as much as you can with the client. Don't waste efforts Making up things by yourself. 
4. Reduce complexity. 
   - This one plays along with point number 3. 
   - parametrize. Now we're able to deploy to any landing zone
5. Break things fast. Fix them fast. 
6. You cant improve what you can't measure. 
   - Break steps as much as you can. 
   - We measure cloning time, build time, each deploy phase time. 
   - This helps us understand which parts make sense to try to improve


DevOps Stuff:
- *Automated GCAPI Deployment to any LZ*.
- *Lead Time. Deploy multiple on demand features per day*. (It used to take at least two weeks)
- *Unlimited development environments on demand*. (We used to have 3 and 3 fixed environments only)
- *Avg Failure rate*: 1 failure out of 15 deployments fail. (Before: 9 out of 10 deployments failed in nonprod)
- *MTTF* (Mean time to failure): 1 low priority issue in Prod per *month*. (Before: 1 - 5 Production issues per *Week*)
- *Environments spin up time*: 30-40 mins. (It used to take at least 4 hours)
