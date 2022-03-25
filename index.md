{% for cat in site.category-list %}
### {{ cat }}
I'm an SRE that optimize processes also in life and help teams to be more efficient with DevOps practices.
Reach out if you think I can help out. alfonso@tinkerware.io
I like learning new human languages, playing any musical instrument and competitive ssmb.

Engineering Posts: https://medium.com/@alfonso_17637
Tribu Posts: https://medium.com/@alfonso_91284
Personal Posts: https://medium.com/@aalvz
Github: https://github.com/AAlvz
Linkedin: https://www.linkedin.com/in/aalvz

More Posts:

<ul>
  {% for page in site.pages %}
    {% if page.resource == true %}
      {% for pc in page.categories %}
        {% if pc == cat %}
          <li><a href="{{ site.github.url }}{{ page.url }}">{{ page.title }}</a></li>
        {% endif %}
      {% endfor %}
    {% endif %}
  {% endfor %}
</ul>
{% endfor %}
