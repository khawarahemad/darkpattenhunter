# DarkPatternHunter

A Browser-Based Smart Detection and Visualization System for Deceptive UX Patterns (Dark Patterns), with Integrated Research and Dataset Generation.

## Overview
DarkPatternHunter is a browser extension that automatically detects and visualizes deceptive UX patterns (dark patterns) on web pages. It empowers users by highlighting manipulative elements and providing inline, dismissible warnings. The project also includes a dataset of real-world dark patterns and a research paper on detection methodology and user impact.

## Features
- **DOM-Based Detection Heuristics**: Detects pre-checked checkboxes, confirmshaming, fake urgency, and visual bias.
- **Inline Warning Bubbles**: Shows dismissible warnings next to detected elements.
- **Smart Top Notification Bar**: Displays a live count of detected dark patterns.
- **User-Friendly UX**: Non-intrusive, per-warning dismissal, and animated highlights.
- **Ignore Logic**: User can ignore warnings per element/site, stored in localStorage.
- **Dataset Generation**: Collects labeled data for research and future ML.
- **Research Paper**: Covers methodology, results, legal/ethical impact, and future work.

## Directory Structure
```
darkpatternhunter/
├── extension/              # Browser extension source
│   ├── content.js          # DOM scanning and warning injection
│   ├── style.css           # Bubble styling
│   └── manifest.json       # Extension config
├── dataset/                # Manually labeled site data
├── screenshots/            # Optional visual captures
├── paper/                  # LaTeX or Word research paper
├── README.md               # GitHub instructions
└── LICENSE
```

## Installation (Chrome/Edge/Brave)
1. Clone or download this repo.
2. Go to `chrome://extensions/` and enable Developer Mode.
3. Click "Load unpacked" and select the `extension/` folder.
4. Browse the web and see inline warnings for dark patterns!

## Demo
*(Link to a demo video will be here)*

## Dataset
- Format: CSV/JSON with fields: `url`, `detected_pattern_type`, `html_snippet`, `screenshot_path`, `ignored_by_user`.
- See `dataset/` for examples and contribute new samples.

## Research Paper
- See `paper/` for the latest draft (LaTeX/Word).
- Structure: Abstract, Introduction, Related Work, Pattern Taxonomy, System Architecture, Detection Methodology, Evaluation, Ethical Implications, Conclusion.

## Contributing
- Fork this repo and submit pull requests.
- Add new detection heuristics or improve UI/UX.
- Contribute to the dataset or research paper.
- Report issues or suggest features.

## License
MIT License (see LICENSE)

## Acknowledgments
- Inspired by privacy and UX research communities.
- See references in the research paper.
