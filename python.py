import pdfplumber
import json
import re

pdf_path = "Einfach_gut_A1.1_Wortschatzliste_Englisch.pdf"
output_path = "vocab.json"

vocab_list = []
current_lektion = 0

with pdfplumber.open(pdf_path) as pdf:
    for page in pdf.pages:
        # Extract tables from the page
        tables = page.extract_tables()
        for table in tables:
            for row in table:
                # Clean out empty cells and replace newlines with spaces
                cleaned_row = [str(cell).replace('\n', ' ').strip() if cell else "" for cell in row]
                
                # Skip completely empty rows
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
                    
                # If there's a German word, add it to the JSON array
                if len(cleaned_row) >= 4 and cleaned_row[1] and cleaned_row[1] != "Wörter":
                    vocab_list.append({
                        "lektion": current_lektion,
                        "artikel": cleaned_row[0],
                        "deutsch": cleaned_row[1],
                        "plural": cleaned_row[2],
                        "englisch": cleaned_row[3],
                        "beispiel": cleaned_row[4] if len(cleaned_row) > 4 else ""
                    })

with open(output_path, 'w', encoding='utf-8') as f:
    json.dump(vocab_list, f, ensure_ascii=False, indent=2)

print(f"Successfully extracted {len(vocab_list)} words into {output_path}!")