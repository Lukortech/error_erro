const fs = require('fs');
const { Configuration, OpenAIApi } = require("openai");

// Wczytaj plik tekstowy z artykułem
const articleText = fs.readFileSync('article.txt', 'utf-8');

// Konfiguracja OpenAI API
const configuration = new Configuration({
 
});
const openai = new OpenAIApi(configuration);

// Funkcja do generowania kodu HTML z tekstu artykułu
async function generateArticleHtml() {
  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Wygeneruj kod HTML dla artykułu:\n\n${articleText}\n\nKod powinien zawierać:
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

generateArticleHtml();