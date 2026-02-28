import pdfplumber
import json
import re
import os

# Paths for the new PDF and the existing JSON
pdf_path = "Einfach_gut_A1.2_Wortschatzliste_Englisch.pdf"
output_path = "vocab.json"

# 1. Load existing data if the file exists, otherwise start with an empty list
if os.path.exists(output_path):
    with open(output_path, 'r', encoding='utf-8') as f:
        vocab_list = json.load(f)
    print(f"Loaded {len(vocab_list)} existing words from {output_path}")
else:
    vocab_list = []
    print("No existing vocab.json found. Creating a new list.")

current_lektion = 0

# 2. Extract data from the new PDF
with pdfplumber.open(pdf_path) as pdf:
    for page in pdf.pages:
        tables = page.extract_tables()
        for table in tables:
            for row in table:
                cleaned_row = [str(cell).replace('\n', ' ').strip() if cell else "" for cell in row]
                
                if not any(cleaned_row):
                    continue
                    
                row_text = " ".join(cleaned_row)
                
                # Detect which Chapter (Lektion) we are in
                if "Wortschatz zu Lektion" in row_text:
                    match = re.search(r'Lektion (\d+)', row_text)
                    if match:
                        current_lektion = int(match.group(1))
                    continue
                
                # Skip the header row
                if len(cleaned_row) > 1 and "Deutsch" in cleaned_row[1]:
                    continue
                
                # If there's a German word, add it to our list
                if len(cleaned_row) >= 4 and cleaned_row[1] and cleaned_row[1] != "Wörter":
                    vocab_list.append({
                        "lektion": current_lektion,
                        "artikel": cleaned_row[0],
                        "deutsch": cleaned_row[1],
                        "plural": cleaned_row[2],
                        "englisch": cleaned_row[3],
                        "beispiel": cleaned_row[4] if len(cleaned_row) > 4 else ""
                    })

# 3. Save the combined list (1-12) back to the same file
with open(output_path, 'w', encoding='utf-8') as f:
    json.dump(vocab_list, f, ensure_ascii=False, indent=2)

print(f"Update complete! Total words in {output_path}: {len(vocab_list)}")