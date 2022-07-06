var frenchTextarea = document.querySelector("#french_textarea");
var englishTextarea = document.querySelector("#english_textarea");
var copyFrenchTextBtn = document.querySelector(".copy_french_text");
var copyEnglishTextBtn = document.querySelector(".copy_english_text");
var translateBtn = document.querySelector(".translate_button");
frenchTextarea.value = "";
englishTextarea.value = "";


copyFrenchTextBtn.addEventListener("click", () =>
{
	copyFunc("French");
});

copyEnglishTextBtn.addEventListener("click", () =>
{
	copyFunc("English");
});


translateBtn.addEventListener("click", () =>
{
	async function getTranslatedText()
	{
		if(englishTextarea.value != "" && frenchTextarea.value === "")
		{
			frenchTextarea.value = await translateFunc();
		}
		else if(frenchTextarea.value != "" && englishTextarea.value === "")
		{
			englishTextarea.value = await translateFunc();
		}
		else if(frenchTextarea.value != "" && englishTextarea.value != "")
		{
			alert("Please input only one language in one input field to be translated.\nVeuillez saisir une seule langue dans un champ de saisie pour être.")
			englishTextarea.value = "";
			frenchTextarea.value = "";
		}
		else if(englishTextarea.value === "" && frenchTextarea.value === "")
		{
			alert("Please input a language to translate.\nVeuillez saisir une langue à traduire")
		}
		else{}
	}
	getTranslatedText();
});

async function translateFunc()
{
	if(englishTextarea.value != "" && frenchTextarea.value === "")
	{
		var response = await fetch("https://deep-translate1.p.rapidapi.com/language/translate/v2",
		{
			"method": "POST",
			"headers": {
				"content-type": "application/json",
				"x-rapidapi-host": "deep-translate1.p.rapidapi.com",
				"x-rapidapi-key": "fb96e11e83mshae568a6d53582a5p154072jsn72047d0c9ab0" },
			"body": JSON.stringify({
				"q": englishTextarea.value,
				"source": "en",
				"target": "fr" })
		});

		var dataReturned = await response.json();
		if(dataReturned.data != undefined)
		{
			return dataReturned.data.translations.translatedText;
		}
		else if(dataReturned.data === undefined)
		{
			alert("Sorry, but the maximum number of translations have been reached this month.");
			return "";
		}
		else{}
	}
	else if(frenchTextarea.value != "" && englishTextarea.value === "")
	{
		var response = await fetch("https://deep-translate1.p.rapidapi.com/language/translate/v2",
		{
			"method": "POST",
			"headers": {
				"content-type": "application/json",
				"x-rapidapi-host": "deep-translate1.p.rapidapi.com",
				"x-rapidapi-key": "fb96e11e83mshae568a6d53582a5p154072jsn72047d0c9ab0" },
			"body": JSON.stringify({
				"q": frenchTextarea.value,
				"source": "fr",
				"target": "en" })
		});

		var dataReturned = await response.json();
		if(dataReturned.data != undefined)
		{
			return dataReturned.data.translations.translatedText;
		}
		else if(dataReturned.data === undefined)
		{
			alert("Sorry, but the maximum number of translations have been reached this month.");
			return "";
		}
		else{}
	}
	else{}
}


function copyFunc(language)
{
	if(language === "English" && englishTextarea.value != "")
	{
		navigator.clipboard.writeText(englishTextarea.value).then(() =>
        {
            alert("Text copied.")
        })
        .catch(err => {
            alert("Something went wrong, please try again.");
            console.log(err);
        })
	}
	else if(language === "French" && frenchTextarea.value != "")
	{
		navigator.clipboard.writeText(frenchTextarea.value).then(() =>
        {
            alert("Texte copié.")
        })
        .catch(err => {
            alert("Quelque chose a mal tourné, veuillez réessayer");
            console.log(err);
        })
	}
	else{}
}
