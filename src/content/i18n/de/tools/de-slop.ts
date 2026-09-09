import type { ToolCopy } from "@/lib/i18n/types";

export const deSlop: ToolCopy = {
  name: "De-slop – KI-Textmuster entfernen",
  title: "De-slop: KI-Textmuster entfernen – online",
  description:
    "KI-Text einfügen, Verräter raus: Gedankenstriche, „delve“-Wörter, „nicht nur X, sondern Y“, aufgeblähte Dreiergruppen, Chatbot-Floskeln. Fakten bleiben.",
  intro:
    "Slop ist der Schreibstil, der ein Sprachmodell verrät: Gedankenstriche als Standardpause, „delve“, „tapestry“ und „testament“, „nicht nur X, sondern auch Y“, jede Liste auf drei Punkte aufgeblasen, Sätze, die mit „highlighting its significance“ enden, ein Schluss, der den Absatz noch einmal zusammenfasst. De-slop schickt deinen Text an ein Sprachmodell, mit einem Redaktionsauftrag, der auf Wikipedias Liste der Anzeichen von KI-Schreibweise aufbaut, und liefert denselben Text ohne diese Muster zurück. Es ist eine Überarbeitung, kein Neuschreiben: Jede Tatsache, Zahl, jeder Name, jedes Zitat und jede URL bleibt wie geschrieben erhalten, die Sprache des Eingabetexts bleibt erhalten, die Länge bleibt innerhalb von etwa fünfzehn Prozent, und Code sowie Markdown mit echter Struktur werden nicht angerührt. Dekorative Formatierung verschwindet: Emoji-Aufzählungszeichen, wahllose Fettung, Überschriften auf einer kurzen Notiz, horizontale Linien. Aktiviere „Änderungen anzeigen“, um eine wortgenaue Gegenüberstellung der Bearbeitung zu sehen. Da jeder Durchlauf Geld kostet, ist der Text auf 8.000 Zeichen begrenzt und ein Besucher erhält eine Handvoll Durchläufe pro Stunde; die mechanischen Werkzeuge auf dieser Seite bleiben unbegrenzt.",
  placeholder:
    "KI-geschriebenen Text hier einfügen, dann De-slop klicken. Gedankenstriche, „delve“, „nicht nur X, sondern auch Y“ und die übrigen Verräter werden entfernt; Bedeutung und Fakten bleiben erhalten.",
  faqs: [
    {
      question: "Was zählt als Slop, und was ändert De-slop?",
      answer:
        "Die Muster, an denen Lektorate maschinengeschriebenen Text erkennen, wie auf Wikipedias Seite zu den Anzeichen von KI-Schreibweise aufgeführt: KI-Vokabular wie delve, tapestry, testament, pivotal, robust und seamless; negative Parallelismen wie „nicht nur X, sondern auch Y“; Listen, die künstlich auf genau drei Punkte aufgefüllt sind; „serves as“ und „boasts“ statt schlichter Aussagen; vage Zuschreibungen wie „Experten sind sich einig“; angehängte Nebensätze wie „was ihre Bedeutung unterstreicht“; leere Wichtigkeitsbehauptungen; Gedankenstriche als Standardpause; Emoji-Aufzählungszeichen, wahllose Fettung und Überschriften auf kurzem Text; Chatbot-typische Einleitungen und Grußformeln. Jedes davon wird durch die schlichte Aussage ersetzt oder gestrichen.",
    },
    {
      question: "Wird mein Text hochgeladen?",
      answer:
        "Ja, aber nur bei diesem Werkzeug. Der Text wird für diese eine Bearbeitung an OpenAIs API (GPT-5.6 Terra) gesendet, und das Ergebnis kommt zurück in deinen Browser. Fix My Formatting speichert weder den Eingabe- noch den Ausgabetext, und OpenAI verarbeitet API-Anfragen nach seinen API-Nutzungsbedingungen, nicht nach den Bedingungen für den ChatGPT-Verbraucherdienst. Alle anderen Werkzeuge auf dieser Seite laufen weiterhin vollständig im Browser.",
    },
    {
      question: "Warum gibt es ein Limit?",
      answer:
        "Jeder Durchlauf kostet echtes Geld für den Modellaufruf, deshalb nimmt das Werkzeug bis zu 8.000 Zeichen pro Durchlauf und erlaubt einer Besucherin oder einem Besucher nur wenige Durchläufe pro Stunde, mit einer Obergrenze pro Tag für die ganze Seite. Ist ein Limit erreicht, erscheint eine klare Meldung, und du kannst es später erneut versuchen. Es gibt kein Konto und keine Zahlung; die mechanischen Werkzeuge auf dieser Seite bleiben unbegrenzt.",
    },
  ],
};
