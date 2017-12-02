---
resource: true
categories: [Emacs]
title: Emacs Tips
description: Emacs Stuff that will be useful for the future or someone.
---

Replace-regex Add string to string (Storing matches in variables)
===

This is the string:
my_string2

`M-x replace-regexp` RET
`\(my_string[0-9]\)` RET   # What's included inside () is stored in variables. The first match, stored in `\1`, second in `\2` and so on.
`\1SoCool`

This is the result:
my_string2SoCool

https://www.emacswiki.org/emacs/RegularExpression
https://stackoverflow.com/questions/2003774/emacs-how-to-replace-a-string-using-a-regular-expression

