import yaml
import os

NAV_FILE = "_data/navigation.yml"
README_FILE = "README.md"
START_TEXT = "A comprehensive collection of self-written, in-depth articles covering algorithms, data structures, and problem-solving techniques for competitive programming."

def generate_readme():
    if not os.path.exists(NAV_FILE):
        print(f"Error: {NAV_FILE} not found. Ensure it is in the _data folder.")
        return

    with open(NAV_FILE, 'r') as file:
        nav_data = yaml.safe_load(file)

    with open(README_FILE, 'w', encoding='utf-8') as readme:
        readme.write(f"# CP Handbook\n\n{START_TEXT}\n\n")
        readme.write("## Table of Contents\n\n")

        for phase in nav_data.get('phases', []):
            readme.write(f"### {phase['title']}\n")
            for topic in phase.get('topics', []):
                readme.write(f"#### {topic['title']}\n")
                for item in topic.get('items', []):
                    url_parts = item['url'].strip('/').split('/')

                    file_path_base = os.path.join("_pages", *url_parts)
                    exists = os.path.exists(f"{file_path_base}.markdown") or os.path.exists(f"{file_path_base}.md")

                    if exists:
                        readme.write(f"- [{item['title']}](https://siddhartheee.github.io/cp-handbook{item['url']})\n")
                    else:
                        readme.write(f"- {item['title']} (Coming Soon)\n")
                readme.write("\n")

    print(f"Successfully generated {README_FILE}")

if __name__ == "__main__":
    generate_readme()
