import os
import yaml
import textwrap

NAV_FILE = "_data/navigation.yml"

with open(NAV_FILE, "r", encoding="utf-8") as f:
    nav = yaml.safe_load(f)

for phase in nav.get("phases", []):
    for topic in phase.get("topics", []):
        for item in topic.get("items", []):
            title = item["title"]
            url = item["url"]

            path = "_pages/" + url.lstrip("/") + ".md"
            directory = os.path.dirname(path)
            os.makedirs(directory, exist_ok=True)

            if os.path.exists(path):
                continue

            content = textwrap.dedent(f"""\
            ---
            layout: default
            title: "{title}"
            difficulty: Very Easy
            importance: 3
            ---

            # {title}
            To be added.
            """)

            with open(path, "w", encoding="utf-8") as f:
                f.write(content)

print("All markdown pages generated from navigation.yml")
