#!/usr/bin/env python3
"""Dode-linkcontrole op de LIVE handleiding (docs.creditsoft.be) — 11/10/2026.

Vlootafspraak: adm-appkit/docs/docs-site-vormgeving.md, "Vindbaar, deelbaar en strikt gebouwd". Overgenomen van
cleanops-docs (19ad4d8) en aangepast aan deze site: de basis en de naam in de aanvraagkop.

    python3 tools/linkcheck.py            # de live site
    python3 tools/linkcheck.py <basis>    # een andere basis, bv. een lokale `mkdocs serve`

Wat ze doet: elke pagina uit sitemap.xml ophalen en van elke <a href> nagaan
  - intern: geeft het doel 200, en bestaat het #anker als id op de doelpagina?
  - extern: welke status geeft het doel?
en van elke <img> of het beeld er staat.

⚠️ De BOUW bewaakt de interne links al (`mkdocs build --strict` + `validation:` in mkdocs.yml). Dit script meet wat
de bouw niet ziet: wat er werkelijk ONLINE staat, de beelden, en de externe links.
⚠️ Een controle die niets vindt, zegt pas iets als ze kán vinden: ze begint daarom met twee tegenproeven (een pagina
en een anker die niet bestaan) en stopt als die niet afgaan.
Slaagcode 0 = niets dood; 1 = iets gevonden; 2 = de controle zelf werkt niet.
"""
import collections, html, re, sys, urllib.error, urllib.parse, urllib.request

BASIS = (sys.argv[1] if len(sys.argv) > 1 else "https://docs.creditsoft.be/").rstrip("/") + "/"


def haal(url, methode="GET"):
    try:
        verzoek = urllib.request.Request(url, method=methode, headers={"User-Agent": "Mozilla/5.0 (linkcontrole handleiding CreditSoft)"})
        with urllib.request.urlopen(verzoek, timeout=25) as antwoord:
            return antwoord.status, (antwoord.read().decode("utf-8", "replace") if methode == "GET" else "")
    except urllib.error.HTTPError as fout:
        return fout.code, ""
    except Exception as fout:  # geen verbinding, time-out, certificaat …
        return "FOUT " + type(fout).__name__, ""


def ids_van(tekst):
    return set(re.findall(r'\bid="([^"]+)"', tekst))


def main():
    status, sitemap = haal(BASIS + "sitemap.xml")
    paginas = re.findall(r"<loc>([^<]+)</loc>", sitemap)
    if status != 200 or not paginas:
        print(f"DE CONTROLE WERKT NIET: sitemap.xml gaf {status} en {len(paginas)} adressen."); return 2
    # De sitemap noemt het PUBLIEKE adres; bij een andere basis (lokaal) vragen we dezelfde paden daar op.
    publiek = re.match(r"https?://[^/]+/", paginas[0]).group(0)
    paginas = [p.replace(publiek, BASIS, 1) for p in paginas]

    bron = {p: haal(p) for p in paginas}
    slecht = [(p, s) for p, (s, _) in bron.items() if s != 200]
    ids = {p: ids_van(t) for p, (_, t) in bron.items()}

    # Tegenproeven: kan de controle een dode pagina en een dood anker ZIEN?
    if haal(BASIS + "deze-pagina-bestaat-niet/")[0] == 200 or "dit-anker-bestaat-niet" in ids[paginas[0]] or not ids[paginas[0]]:
        print("DE CONTROLE WERKT NIET: een onbestaande pagina gaf 200, of de eerste pagina draagt geen enkel id."); return 2

    intern, extern, ankers, beelden = (collections.defaultdict(set) for _ in range(4))
    links = 0
    for p, (_, tekst) in bron.items():
        for h in re.findall(r'<a\b[^>]*?\bhref="([^"]*)"', tekst):
            h = html.unescape(h).strip(); links += 1
            if not h or h.startswith(("mailto:", "tel:", "javascript:")): continue
            kaal, _, anker = urllib.parse.urljoin(p, h).partition("#")
            if kaal.startswith(BASIS):
                intern[kaal].add(p)
                if anker: ankers[(kaal, urllib.parse.unquote(anker))].add(p)
            elif kaal.startswith("http"):
                extern[kaal].add(p)
        for src in re.findall(r'<img\b[^>]*?\bsrc="([^"]*)"', tekst):
            if not src.startswith("data:"): beelden[urllib.parse.urljoin(p, html.unescape(src))].add(p)

    print(f"{len(paginas)} pagina's · {links} links gelezen · {len(intern)} interne doelen · {len(ankers)} ankers · "
          f"{len(beelden)} beelden · {len(extern)} externe doelen")
    dood = 0
    for p, s in slecht:
        dood += 1; print(f"PAGINA {s}  {p}")
    for doel in sorted(intern):
        if doel in bron: continue
        s, tekst = haal(doel)
        if s == 200: ids[doel] = ids_van(tekst)
        else: dood += 1; print(f"DODE LINK {s}  {doel}  ← o.a. {sorted(intern[doel])[0]}")
    for (doel, anker), van in sorted(ankers.items()):
        if doel in ids and anker not in ids[doel] and not anker.startswith("__"):
            dood += 1; print(f"ANKER ONTBREEKT  {doel}#{anker}  ← o.a. {sorted(van)[0]}")
    for beeld in sorted(beelden):
        s, _ = haal(beeld, "HEAD")
        if s != 200: dood += 1; print(f"BEELD {s}  {beeld}  ← o.a. {sorted(beelden[beeld])[0]}")
    for doel in sorted(extern):
        s, _ = haal(doel, "HEAD")
        if s != 200: s, _ = haal(doel)     # sommige sites weigeren HEAD
        if s != 200: dood += 1; print(f"EXTERN {s}  {doel}  ← op {len(extern[doel])} pagina's")
    print("niets dood gevonden." if dood == 0 else f"{dood} dode link(s), anker(s) of beeld(en).")
    return 0 if dood == 0 else 1


if __name__ == "__main__":
    sys.exit(main())
