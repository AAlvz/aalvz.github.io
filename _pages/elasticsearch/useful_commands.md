---
resource: true
categories: [Elasticsearch]
title: Elasticsearch Cheatsheet
description: Commands to use in elasticsearch
---

## Create content
`curl -XPOST "http://localhost:9200/sampleindex/sampletype/sampleuniqueid2" -H "Content-Type: application/json" -d "{ \"sample_field3\" : \"sample_value3\"}"`

## Get all the content inside ES
`curl -XGET "localhost:9200/_search?pretty=true&q=*:*"`

## Get indices
`curl -X GET "localhost:9200/sampleindex/_cat/indices?pretty=true"`

## Get repositories for snapshots and S3 integrations with plugin
`curl -X GET "localhost:9200/_cat/repositories?v"`

## List snapshots from repository
curl -X GET "localhost:9200/_cat/snapshots/test_snapshot_s3?v&s=id"

## Start backup
`curl -X PUT "localhost:9200/_snapshot/my_s3_repository/snapshot_1?wait_for_completion=false"`

## Restore
curl -X POST "172.30.52.223:9200/sampleindex/_close"
curl -X POST "localhost:9200/_snapshot/my_s3_repository/snapshot_1/_restore"
curl -X POST "172.30.52.223:9200/sampleindex/_open
"

## Close all indexes
curl -XPOST "localhost:9200/_all/_close"

## Get document types in these indexes
curl -XGET 'http://localhost:9200/_mapping?pretty=true'


