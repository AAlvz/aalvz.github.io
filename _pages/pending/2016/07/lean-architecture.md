---
title: What is Lean Architecture?
tags: scrum, agile, software development
---

# What is Lean Architecture?

First things first, we live in an industry lead by buzzwords, everyone wants to be Agile and Lean and have their infrastructure on the cloud and so on, let's start clearing some concepts.

## What is Lean?

Lean was popularized as a concept by the Japanese automobile industry, and it was first called **The Toyota Way**. Its primary focus is to add value. Lean grabs the customer world to the beginning of the development and every subsequent activity should add value. Waste is introduced when errors happen in production, and constant improvement adds more value. The real heart of Lean resides on the **all hands on deck** mentality, which includes managers, suppliers, employees, partners and so on. Contrary to Agile, which centers on customers.

## So, What is Lean Architecture?

Architecture has value, of course, but the main purpose of Lean is up-front planning and "everybody, all together, from early on" approach. Architecture can reduce waste, inconsistent, and irregular development. It serves to remark what is important *now* that will keep the engines running for a long time. However, it's important to differential from traditional software architecture; which is more focused on a lot of artifacts and activities which rarely bring value into the customer value stream.

It focuses more on delivering the artifacts that can support development in the long term. Avoiding constructing things before any demand of it appears. So, this decisions should be captured in code that is delivered as a part of the product so they don't generate waste. Classic architecture is based on the assumption that nothing will change, believing that domain knowledge will reduce the cost of change. So as Agile. Lean focuses on working software, and consequently, code. So the best way to capture the user mental models is code, so yes, the code is the design.

## What about documentation?

Documentation is a good thing, but the objective of documentation is easily missed, which is to remember and communicate perspectives and decisions. Where code can communicate or remember this decisions, redundant documentation can be a waste Alistair Cockburn remembers us the most effective way in engineering communication:

![Richness in communication](http://www.martinbauer.com/var/martinbauer/storage/images/media/images/communication/2852-1-eng-AU/communication.gif)

We should focus on a rich and comprehensive documentation, instead of putting it ahead of the team. Good documentation provides a context and can tell us the *why's*. That is why native auto-generated documentation inside the code can be a great tool to achieve this. But remember, it's better to let someone explain how the system is built with a whiteboard than a multitude of documents.

![Any fool vsn write code that a computer can understand. Good programmers write code that humans can understand. -  Martin Fowler](http://www.azquotes.com/picture-quotes/quote-any-fool-can-write-code-that-a-computer-can-understand-good-programmers-write-code-that-martin-fowler-58-9-0953.jpg)

To wrap this up, follow this points:

- Get every person involved to plan the architecture
- Focus on what brings value to your development
- Don't focus in heavyweight documentation, instead on what suits you best to *communicate* the design
- Remember that the code is YOUR design
- Document the Why, better if it's in the form of autogenerated documentation
