---
resource: true
categories: [Aws]
title: Aws Cheatsheet
description: Commands to use in aws
---

# Add expire policy to a bunch of old buckets (So AWS deletes them in 1 day)

```
ENVIRONMENT=myBucketGrep
DATE=2018-06-29
WS_PROFILE=myProfile
AWS_REGION=us-east-1
```

```
aws s3api list-buckets --query "Buckets[?CreationDate<='${DATE}' && contains(Name,'${ENVIRONMENT}')].[Name]"   --profile=$AWS_PROFILE --region=$AWS_REGION --output=text |   xargs -I {} aws s3api put-bucket-lifecycle-configuration --bucket {} --lifecycle-configuration file://lifecycles3expire.json --profile=$AWS_PROFILE --region=$AWS_REGION
```

lifecycles3expire.json
```
{
    "Rules": [
        {
            "Filter": {
                "Prefix": ""
            },
            "Status": "Enabled",
            "Expiration": {
                "Days": 1
            },
            "ID": "ExpireeRule"
        }
    ]
}
```

