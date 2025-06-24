# DarkPatternHunter Dataset

This directory contains labeled data of real-world dark patterns detected on websites.

## Format
- `url`: The website URL
- `detected_pattern_type`: Type of dark pattern (e.g., pre-checked checkbox, confirmshaming)
- `html_snippet`: The relevant HTML snippet
- `screenshot_path`: Path to a screenshot (if available)
- `ignored_by_user`: true/false

## Files
- `dark_patterns.json`: JSON array of samples
- `dark_patterns.csv`: CSV version of the dataset

## Contributing
- Add new samples in either JSON or CSV format.
- Ensure all fields are filled and screenshots are saved in `../screenshots/` if possible. 