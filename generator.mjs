import fs from "fs";
import OpenAI from 'openai';
import readline from 'node:readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question(`Skąd zczytać artykuł?`, path => {
  const articleText = fs.readFileSync(`${path}`, 'utf-8');
  generateArticleHtml(articleText)
  rl.close();
});
// Wczytaj plik tekstowy z artykułem


// Konfiguracja OpenAI API
const config = {
  apiKey: "", // your key goes here
}
const client = new OpenAI(config);

// Funkcja do generowania kodu HTML z tekstu artykułu
async function generateArticleHtml(sourceText) {
  try {
    const completion = await client.completions.create({
      model: "davinci-002",
      prompt: `Wygeneruj kod HTML dla artykułu:\n\n${sourceText}\n\nKod powinien zawierać:
- Strukturę HTML z użyciem odpowiednich tagów
- Miejsca, gdzie warto wstawić grafikę oznaczone tagiem <img> z atrybutem src="image_placeholder.jpg" oraz alt z podpowiedzią
- Podpisy pod grafikami w odpowiednich tagach HTML
- Brak kodu CSS oraz JavaScript`,
      max_tokens: 2048,
      n: 1,
      stop: null,
      temperature: 0.7,
    });

    // Zapisz wygenerowany kod HTML do pliku
    fs.writeFileSync('artykul.html', completion.data.choices[0].text);
    console.log('Wygenerowany kod HTML został zapisany do pliku artykul.html');
  } catch (error) {
    console.error('Wystąpił błąd podczas generowania kodu HTML:', error);
  }
}

generateArticleHtml(src);