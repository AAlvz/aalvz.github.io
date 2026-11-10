---
resource: true
categories: [DevOps-Cases]
title: The Life of a Request in the Cloud
description: A four-minute animated walkthrough of one HTTPS request through DNS, a CDN, a load balancer and a service-mesh gateway, with the config behind every hop.
---

You type a URL and a page comes back. In between, the request crosses half a dozen systems, each configured in a different place and usually owned by a different team.

This film came out of a small redirect change. It follows one request from the browser to the answer, so the whole path is in one place.

**[Watch the film →](/case-studies/request-path/)**

The stops:

1. **DNS:** Route 53 answers with an alias to the CDN.
2. **CDN edge:** CloudFront ends TLS, upgrades HTTP to HTTPS and picks an origin by path.
3. **Load balancer:** an ALB built from a Kubernetes Ingress, accepting only traffic that came through the CDN.
4. **Gateway pods:** the service mesh's Envoy pods receive the request and clean it up.
5. **Gateway and routes:** the Gateway says which hosts it accepts, and the VirtualService rules run top to bottom.
6. **The answer:** a rule matches and Envoy sends the redirect itself. The browser follows it on a second trip.

The lesson I keep coming back to: when something breaks, first ask which layer answered.

Hostnames, paths, repository and rule names, line numbers and header names in the film are made up or changed. The architecture and the order of the hops are real.
