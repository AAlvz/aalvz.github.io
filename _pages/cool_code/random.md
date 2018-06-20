---
resource: true
categories: [Cool-Code]
title: Renaming enumerating
description: For a bunch of files, this code renames the file adding a number to the beginning of the filename. 
---

```

c=1; for file in `ls -Utp | grep -v / | awk '{ print $9 }' `; do mv "$file" "$[c++]"-"$file"; done

```
