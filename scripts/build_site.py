from pathlib import Path
from html import escape
from urllib.parse import quote
import json
import re
import shutil
import zipfile

ROOT = Path(__file__).resolve().parent.parent
SOURCE = ROOT / 'files'
TARGET = ROOT

def excluded(file):
    parts = file.relative_to(ROOT).parts
    return (any(p in {'.git', '.vercel', 'node_modules', '__pycache__'} or p.endswith('-frames') for p in parts)
            or file.name.startswith('.env') or file.suffix in {'.zip', '.pem', '.key', '.pyc'}
            or file.name in {'.DS_Store', 'credentials.json'})

main = (SOURCE / 'Keemakr business operator explained.html').read_text()
main = main.replace(
    '<a href="Keemakr%20technical%20reference.html">Earlier long-form reference ↗</a>',
    '<div style="display:flex;gap:18px;align-items:center"><a href="files.html">Files &amp; downloads</a><a href="Keemakr%20technical%20reference.html">Technical reference ↗</a></div>',
)
(TARGET / 'index.html').write_text(main)
(TARGET / 'Keemakr business operator explained.html').write_text(main)
reference = (SOURCE / 'Keemakr technical reference.html').read_text()
(TARGET / 'Keemakr technical reference.html').write_text(reference)
(TARGET / 'reference.html').write_text(reference)

groups = {'Guides and documents': [], 'GIFs and illustrations': [], 'Research notes': [], 'Build sources and verification': []}
for folder in ('files', 'research'):
    for file in sorted((TARGET / folder).rglob('*')):
        if not file.is_file() or excluded(file):
            continue
        relative = file.relative_to(TARGET).as_posix()
        if folder == 'research':
            group = 'Research notes'
        elif file.suffix.lower() in ('.gif', '.png', '.svg'):
            group = 'GIFs and illustrations'
        elif file.suffix.lower() in ('.html', '.md'):
            group = 'Guides and documents'
        else:
            group = 'Build sources and verification'
        groups[group].append((relative, file.stat().st_size))

sections = ''
for title, rows in groups.items():
    sections += '<section><h2>' + escape(title) + '</h2><ul>'
    for relative, size in rows:
        sections += '<li><a href="' + quote(relative, safe='/') + '">' + escape(relative) + '</a><small>' + f'{size / 1024:,.1f} KB' + '</small></li>'
    sections += '</ul></section>'

(TARGET / 'files.html').write_text('''<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="referrer" content="no-referrer"><title>Keemakr guide files and downloads</title><style>
:root{color-scheme:light;--paper:#f7f7f1;--ink:#172d2b;--accent:#09675f;--line:#d1ddd5}*{box-sizing:border-box}body{max-width:1100px;margin:0 auto;padding:40px 24px;background:var(--paper);color:var(--ink);font:16px/1.65 system-ui,sans-serif}a{color:var(--accent);overflow-wrap:anywhere}a:focus-visible{outline:3px solid var(--accent);outline-offset:4px}h1{font-size:36px;line-height:1.15}h2{font-size:22px;margin-top:40px}ul{padding:0;list-style:none}li{display:flex;gap:24px;justify-content:space-between;padding:10px 0;border-bottom:1px solid var(--line)}small{white-space:nowrap}.actions{display:flex;flex-wrap:wrap;gap:18px}.actions a{border:1px solid var(--line);padding:10px 16px;border-radius:6px;text-decoration:none;background:white}@media(max-width:600px){body{padding:24px 18px}li{display:block}small{display:block}}
</style></head><body><p><a href="index.html">← Back to the animated guide</a></p><h1>All guide files</h1><p>The visual guide, technical reference, research notes, media, source builders and verification results. The ZIP includes this complete static site for offline use.</p><div class="actions"><a href="keemakr-guide-complete.zip" download>Download everything · ZIP</a><a href="reference.html">Read the technical reference</a></div>''' + sections + '</body></html>')

(TARGET / 'vercel.json').write_text(json.dumps({
    'framework': None,
    'buildCommand': None,
    'installCommand': None,
    'outputDirectory': '.',
    'headers': [{
        'source': '/(.*)',
        'headers': [
            {'key': 'X-Content-Type-Options', 'value': 'nosniff'},
            {'key': 'Referrer-Policy', 'value': 'no-referrer'},
            {'key': 'X-Frame-Options', 'value': 'DENY'},
            {'key': 'Permissions-Policy', 'value': 'camera=(), microphone=(), geolocation=()'},
        ],
    }],
}, indent=2))

archive = TARGET / 'keemakr-guide-complete.zip'
with zipfile.ZipFile(archive, 'w', compression=zipfile.ZIP_DEFLATED) as bundle:
    for file in sorted(TARGET.rglob('*')):
        if file.is_file() and file != archive and not excluded(file):
            bundle.write(file, file.relative_to(TARGET))

# Keep the ZIP fully self-contained, while serving media lazily on the web.
# The complete original embedded HTML also remains under files/.
hosted = main
data_match = re.search(r'<script type="application/json" id="scene-data">(.*?)</script>', main, re.S)
media_manifest = SOURCE / 'visual-media.json'
if data_match and media_manifest.exists():
    embedded_media = json.loads(data_match.group(1))['media']
    media_files = json.loads(media_manifest.read_text())
    assert len(embedded_media) == len(media_files), 'Media manifest must match the generated guide'
    for embedded, file in zip(embedded_media, media_files):
        assert embedded['title'] == file['title'], 'Media order must match the guide'
        for kind in ('still', 'gif'):
            value = embedded.get(kind)
            if value and value.startswith('data:'):
                asset = Path(file[kind]); asset = asset if asset.is_absolute() else SOURCE / asset
                relative = asset.relative_to(SOURCE).as_posix()
                hosted = hosted.replace(value, quote('files/' + relative, safe='/'))
    hosted = hosted.replace('img-src data:', "img-src 'self' data:")
(TARGET / 'index.html').write_text(hosted)
(TARGET / 'Keemakr business operator explained.html').write_text(hosted)
print(json.dumps({'directory': str(TARGET), 'files': sum(len(r) for r in groups.values()), 'zip_bytes': archive.stat().st_size, 'hosted_html_bytes': len(hosted.encode()), 'offline_html_bytes': len(main.encode())}, indent=2))
