TinkerWare (Tech) Principles
===

Every company is born from an idea that grows.

So far, these are the (technical) Principles behind TinkerWare.
In [TinkerWare (Not So Tech) Principles](https://blog.tinkerware.io) you'll find
the benefits of these technical terms.

## 1. Idempotence
---

**Run it again, get the same result**

Idempotence occurs when a certain operation is called more than once with
the same input parameters and returns exactly the same with no additional effect.

#### How do we Achieve idempotence?

* [Disposable Infrastructure](http://martinfowler.com/bliki/ImmutableServer.html)

---
       - Don't fix it! Throw it away!! -
       Fixing broken things is one of the most time/money consuming tasks there
       exist in Software.

* [Serverless Architecture](http://martinfowler.com/articles/serverless.html)

---
       - Don't worry that much about servers. Outsource those insfrastructure tasks.
       Run your systems on any server-
       Among the benefits we can mention: reduced operational and development costs,
       easier operational management, and reduced environmental impact.

* [Phoenix Servers](http://martinfowler.com/bliki/PhoenixServer.html)

---
       - A server should be like a phoenix, regularly rising from the ashes. -
       Why? It'd be awesome to have a completely inmutable server, but after a
       while of hard work, it's always healty to give that server a proper reset
       and make sure everything is set just as it should be. No more, no less.

* Configuration Managers.

---
       - We've been using tools such as Puppet or Ansible to improve idempotence -
       This brings also the cool fact of having **Executable Documentation**.
       Your coude, if well explained can work for both, working and documenting.
       With infrastructure is the same. We know what we have and what it's supposed
       to do.

* Code Repositories.

---
       - To be able to control any version we have and apply it anytime -
       If you're reading this, you probably already know all the benefits of
       version control systems.

One of our main goals is to achieve idempotency in the whole Software Development
process. How? Making sure that every phase is running under the same characteristics and
configurations. The development stage should not be different from production, QA,
or any stage. Of course they differ in things such as keys and accesses, but the
core of the server should be the same to **ensure compatibility**.

With this, the hassle of Integration

## 2. Quick Improvement.
---

**Feedback -> Improve -> Repeat**

**Customer Driven Development** is our way to work. What does it mean? That we
develop based on our customers needs. Meaning that you always do something valuable.


## 3. DRY & KISS - Don't Repeat Yourself - Keep It Simple, Stupid.
---

**If you can't explain it simply, you don't understand it well enough.**

Human time is important and it costs. That's why we automate all the tasks that
keep us from doing productive tasks and the once that we love. Ironically in my
own case, that task is: Automate.

And one more thing. Don't overthink it too much. The only sure thing is that
something will change. Be sure to have a resilent system ready for change, and
make sure to have a Ready-To-Scale system.

## 4. Transparency
---

**Be water my friend**

In the company, we love open source projects and we contribute to them whenever
it's possible. That's why we open sourced almost everything that we've got and
we will keep doing that. Community matters.

"Nothing to hide, nothing to worry about" ... Lawsuits come anyways...


@aalvz
