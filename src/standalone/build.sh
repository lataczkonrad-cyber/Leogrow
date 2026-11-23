#!/bin/sh
# Builds leogrow-holiday-lesson.html (needs the built site in ../../site, node + playwright)
set -e
cd "$(dirname "$0")"
T=$(mktemp -d)
cp -r ../../site/emoji "$T/"
OUT="$T/lingrow-academy.html" python3 build_standalone.py
SITE_DIR="$T" node ../emoji_post.js            # pictures for any new emoji
for i in 1 2 3; do node walk.js "$T/lingrow-academy.html" "$T" "$T/keys.json" >/dev/null; done   # 3 runs: some pictures are random
python3 inline_emoji.py "$T/lingrow-academy.html" "$T/emoji" "$T/keys.json"
cp "$T/lingrow-academy.html" leogrow-holiday-lesson.html
rm -rf "$T"
