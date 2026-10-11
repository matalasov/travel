from pathlib import Path
from PIL import Image

PROJECT = Path(__file__).resolve().parents[1]
SOURCE = Path("/home/ubuntu/webdev-static-assets")
TARGET = PROJECT / "dist" / "public" / "images"

ASSETS = {
    "kurs-likii-mark.png": ("kurs-likii-mark.webp", 480),
    "turkey-yacht-route-hero.jpg": ("route-hero.webp", 1920),
    "dalyan-kaunos-experience.jpg": ("dalyan-kaunos.webp", 1440),
    "gocek-swim-experience.jpg": ("gocek-swim.webp", 1440),
    "asi-koyu-evening.jpg": ("asi-koyu-evening.webp", 1440),
}

TARGET.mkdir(parents=True, exist_ok=True)
for source_name, (target_name, max_width) in ASSETS.items():
    source = SOURCE / source_name
    if not source.exists():
        raise FileNotFoundError(source)
    with Image.open(source) as image:
        image.thumbnail((max_width, 9999), Image.Resampling.LANCZOS)
        if image.mode not in ("RGB", "RGBA"):
            image = image.convert("RGBA" if "A" in image.getbands() else "RGB")
        image.save(TARGET / target_name, "WEBP", quality=84, method=6)
        print(f"{source_name} -> images/{target_name}")
