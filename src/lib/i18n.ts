import type { ToolDefinition } from "./tools";
import { getTool } from "./tools";

export const localeCodes = ["es", "pt", "de", "fr", "it", "ja", "ko", "zh", "hi", "ar"] as const;
export type LocaleCode = (typeof localeCodes)[number];
export type SiteLocale = "en" | LocaleCode;

export const localizedToolSlugs = [
  "markdown-to-word",
  "markdown-to-pdf",
  "markdown-to-google-docs",
  "remove-markdown-formatting",
  "markdown-table-to-excel",
  "markdown-table-to-csv",
  "markdown-viewer",
  "markdown-to-html",
  "word-to-markdown",
  "remove-em-dashes",
  "clean-ai-text",
  "remove-invisible-characters",
] as const;

export type LocalizedToolSlug = (typeof localizedToolSlugs)[number];

type ToolTranslation = { name: string; description: string };

export type SiteMessages = {
  languageName: string;
  allTools: string;
  about: string;
  homeEyebrow: string;
  homeTitle: string;
  homeDescription: string;
  homeMetaTitle: string;
  input: string;
  output: string;
  placeholder: string;
  emptyResult: string;
  characters: string;
  report: string;
  preview: string;
  live: string;
  updating: string;
  copy: string;
  copied: string;
  download: string;
  share: string;
  shareCopied: string;
  embed: string;
  embedCopied: string;
  downloadImage: string;
  free: string;
  noSignup: string;
  private: string;
  howTo: string;
  faqTitle: string;
  relatedTools: string;
  stepCopy: string;
  stepPaste: string;
  stepFinish: string;
  freeQuestion: (name: string) => string;
  freeAnswer: string;
  privacyQuestion: string;
  privacyAnswer: string;
  mobileQuestion: string;
  mobileAnswer: string;
  introSuffix: string;
  categories: { markdown: string; cleanup: string };
  tools: Record<LocalizedToolSlug, ToolTranslation>;
};

const tools = (entries: Record<LocalizedToolSlug, [string, string]>): Record<LocalizedToolSlug, ToolTranslation> =>
  Object.fromEntries(Object.entries(entries).map(([slug, [name, description]]) => [slug, { name, description }])) as Record<LocalizedToolSlug, ToolTranslation>;

export const messages: Record<LocaleCode, SiteMessages> = {
  es: {
    languageName: "Español", allTools: "Todas las herramientas", about: "Acerca de",
    homeEyebrow: "12 herramientas gratuitas", homeTitle: "Corrige textos copiados de la IA.",
    homeDescription: "Convierte Markdown, limpia el formato de ChatGPT, repara tablas y elimina caracteres invisibles. Todo funciona de forma privada en tu navegador.",
    homeMetaTitle: "Herramientas gratuitas para formatear textos de IA",
    input: "Entrada", output: "Resultado", placeholder: "Pega aquí el texto que quieres convertir o limpiar…", emptyResult: "El resultado aparecerá aquí mientras escribes.", characters: "caracteres", report: "informe", preview: "Vista previa", live: "En vivo", updating: "Actualizando…",
    copy: "Copiar", copied: "Copiado", download: "Descargar", share: "Copiar enlace", shareCopied: "Enlace copiado",
    embed: "Insertar", embedCopied: "Código copiado", downloadImage: "Descargar imagen",
    free: "Gratis", noSignup: "Sin registro", private: "El procesamiento ocurre en tu navegador; el texto no se sube.",
    howTo: "Cómo usar", faqTitle: "Preguntas frecuentes", relatedTools: "Herramientas relacionadas",
    stepCopy: "Copia el texto o la tabla que quieres corregir.", stepPaste: "Pégalo arriba. El resultado se actualiza al instante.", stepFinish: "Copia, descarga, comparte o inserta el resultado.",
    freeQuestion: (name) => `¿${name} es gratis?`, freeAnswer: "Sí. Es gratis, no requiere cuenta y no tiene límite de uso.",
    privacyQuestion: "¿Se sube mi texto?", privacyAnswer: "No. El procesamiento ocurre en tu navegador. Solo se guarda si creas explícitamente un enlace compartido.",
    mobileQuestion: "¿Funciona en el móvil?", mobileAnswer: "Sí. El editor funciona en navegadores actuales de móvil y escritorio.",
    introSuffix: "Pega tu contenido arriba para ver el resultado al instante, sin subir el texto ni crear una cuenta.",
    categories: { markdown: "Markdown y documentos", cleanup: "Limpieza de texto de IA" },
    tools: tools({
      "markdown-to-word": ["Convertir Markdown a Word", "Convierte Markdown en un documento Word bien formateado, gratis y de forma privada."],
      "markdown-to-pdf": ["Convertir Markdown a PDF", "Convierte Markdown en un PDF limpio directamente desde tu navegador."],
      "markdown-to-google-docs": ["Convertir Markdown a Google Docs", "Copia Markdown a Google Docs conservando títulos, listas, enlaces y tablas."],
      "remove-markdown-formatting": ["Eliminar formato Markdown", "Elimina asteriscos, almohadillas y otros símbolos Markdown sin perder el texto."],
      "markdown-table-to-excel": ["Convertir tabla Markdown a Excel", "Convierte tablas con barras verticales en filas y columnas de Excel."],
      "markdown-table-to-csv": ["Convertir tabla Markdown a CSV", "Convierte una tabla Markdown en un archivo CSV limpio y compatible."],
      "markdown-viewer": ["Visor de Markdown online", "Visualiza Markdown con formato en tiempo real y sin subir archivos."],
      "markdown-to-html": ["Convertir Markdown a HTML", "Genera HTML semántico y limpio a partir de Markdown al instante."],
      "word-to-markdown": ["Convertir Word a Markdown", "Pega texto enriquecido de Word o Google Docs y conviértelo a Markdown."],
      "remove-em-dashes": ["Eliminar rayas largas del texto", "Busca y sustituye rayas largas por puntuación más sencilla."],
      "clean-ai-text": ["Limpiar texto de ChatGPT e IA", "Limpia rayas, comillas tipográficas, emojis y caracteres ocultos del texto de IA."],
      "remove-invisible-characters": ["Eliminar caracteres invisibles", "Detecta y elimina espacios de ancho cero, guiones suaves y marcas direccionales."],
    }),
  },
  pt: {
    languageName: "Português", allTools: "Todas as ferramentas", about: "Sobre",
    homeEyebrow: "12 ferramentas gratuitas", homeTitle: "Corrija textos copiados da IA.",
    homeDescription: "Converta Markdown, limpe a formatação do ChatGPT, corrija tabelas e remova caracteres invisíveis. Tudo funciona com privacidade no navegador.",
    homeMetaTitle: "Ferramentas grátis para formatar textos de IA",
    input: "Entrada", output: "Resultado", placeholder: "Cole aqui o texto que deseja converter ou limpar…", emptyResult: "O resultado aparecerá aqui enquanto você digita.", characters: "caracteres", report: "relatório", preview: "Prévia", live: "Ao vivo", updating: "Atualizando…",
    copy: "Copiar", copied: "Copiado", download: "Baixar", share: "Copiar link", shareCopied: "Link copiado",
    embed: "Incorporar", embedCopied: "Código copiado", downloadImage: "Baixar imagem",
    free: "Grátis", noSignup: "Sem cadastro", private: "O processamento acontece no navegador; seu texto não é enviado.",
    howTo: "Como usar", faqTitle: "Perguntas frequentes", relatedTools: "Ferramentas relacionadas",
    stepCopy: "Copie o texto ou a tabela que deseja corrigir.", stepPaste: "Cole acima. O resultado é atualizado na hora.", stepFinish: "Copie, baixe, compartilhe ou incorpore o resultado.",
    freeQuestion: (name) => `${name} é grátis?`, freeAnswer: "Sim. É grátis, não exige conta e não tem limite de uso.",
    privacyQuestion: "Meu texto é enviado?", privacyAnswer: "Não. O processamento ocorre no navegador. O texto só é armazenado se você criar um link compartilhado.",
    mobileQuestion: "Funciona no celular?", mobileAnswer: "Sim. O editor funciona em navegadores atuais para celular e computador.",
    introSuffix: "Cole o conteúdo acima para ver o resultado imediatamente, sem enviar o texto nem criar uma conta.",
    categories: { markdown: "Markdown e documentos", cleanup: "Limpeza de texto de IA" },
    tools: tools({
      "markdown-to-word": ["Converter Markdown para Word", "Converta Markdown em um documento Word bem formatado, grátis e com privacidade."],
      "markdown-to-pdf": ["Converter Markdown para PDF", "Converta Markdown em um PDF limpo diretamente no navegador."],
      "markdown-to-google-docs": ["Converter Markdown para Google Docs", "Leve Markdown ao Google Docs preservando títulos, listas, links e tabelas."],
      "remove-markdown-formatting": ["Remover formatação Markdown", "Remova asteriscos, cerquilhas e outros símbolos Markdown sem perder o texto."],
      "markdown-table-to-excel": ["Converter tabela Markdown para Excel", "Transforme tabelas com barras verticais em linhas e colunas do Excel."],
      "markdown-table-to-csv": ["Converter tabela Markdown para CSV", "Converta uma tabela Markdown em CSV limpo e compatível."],
      "markdown-viewer": ["Visualizador de Markdown online", "Visualize Markdown formatado em tempo real sem enviar arquivos."],
      "markdown-to-html": ["Converter Markdown para HTML", "Gere HTML semântico e limpo a partir de Markdown instantaneamente."],
      "word-to-markdown": ["Converter Word para Markdown", "Cole texto rico do Word ou Google Docs e converta para Markdown."],
      "remove-em-dashes": ["Remover travessões do texto", "Encontre e substitua travessões por pontuação mais simples."],
      "clean-ai-text": ["Limpar texto do ChatGPT e IA", "Limpe travessões, aspas curvas, emojis e caracteres ocultos do texto de IA."],
      "remove-invisible-characters": ["Remover caracteres invisíveis", "Detecte e remova espaços de largura zero, hífens suaves e marcas direcionais."],
    }),
  },
  de: {
    languageName: "Deutsch", allTools: "Alle Werkzeuge", about: "Über uns",
    homeEyebrow: "12 kostenlose Werkzeuge", homeTitle: "Formatierung aus KI-Texten reparieren.",
    homeDescription: "Markdown konvertieren, ChatGPT-Formatierung bereinigen, Tabellen reparieren und unsichtbare Zeichen entfernen. Alles läuft privat im Browser.",
    homeMetaTitle: "Kostenlose Werkzeuge für KI-Textformatierung",
    input: "Eingabe", output: "Ergebnis", placeholder: "Füge hier den Text ein, den du umwandeln oder bereinigen möchtest…", emptyResult: "Das Ergebnis erscheint hier während der Eingabe.", characters: "Zeichen", report: "Bericht", preview: "Vorschau", live: "Live", updating: "Wird aktualisiert…",
    copy: "Kopieren", copied: "Kopiert", download: "Herunterladen", share: "Link kopieren", shareCopied: "Link kopiert",
    embed: "Einbetten", embedCopied: "Code kopiert", downloadImage: "Bild herunterladen",
    free: "Kostenlos", noSignup: "Ohne Anmeldung", private: "Die Verarbeitung erfolgt im Browser; der Text wird nicht hochgeladen.",
    howTo: "Anleitung für", faqTitle: "Häufige Fragen", relatedTools: "Ähnliche Werkzeuge",
    stepCopy: "Kopiere den Text oder die Tabelle, die du korrigieren möchtest.", stepPaste: "Füge den Inhalt oben ein. Das Ergebnis erscheint sofort.", stepFinish: "Kopiere, lade, teile oder bette das Ergebnis ein.",
    freeQuestion: (name) => `Ist ${name} kostenlos?`, freeAnswer: "Ja. Das Werkzeug ist kostenlos, benötigt kein Konto und hat kein Nutzungslimit.",
    privacyQuestion: "Wird mein Text hochgeladen?", privacyAnswer: "Nein. Die Verarbeitung erfolgt im Browser. Text wird nur gespeichert, wenn du ausdrücklich einen Freigabelink erstellst.",
    mobileQuestion: "Funktioniert es auf Mobilgeräten?", mobileAnswer: "Ja. Der Editor funktioniert in aktuellen mobilen und Desktop-Browsern.",
    introSuffix: "Füge deinen Inhalt oben ein und erhalte sofort das Ergebnis – ohne Upload und ohne Konto.",
    categories: { markdown: "Markdown und Dokumente", cleanup: "KI-Text bereinigen" },
    tools: tools({
      "markdown-to-word": ["Markdown in Word umwandeln", "Markdown kostenlos und privat in ein korrekt formatiertes Word-Dokument umwandeln."],
      "markdown-to-pdf": ["Markdown in PDF umwandeln", "Markdown direkt im Browser in ein übersichtliches PDF umwandeln."],
      "markdown-to-google-docs": ["Markdown in Google Docs umwandeln", "Markdown mit Überschriften, Listen, Links und Tabellen in Google Docs übernehmen."],
      "remove-markdown-formatting": ["Markdown-Formatierung entfernen", "Sternchen, Rauten und andere Markdown-Zeichen entfernen, ohne den Text zu verlieren."],
      "markdown-table-to-excel": ["Markdown-Tabelle in Excel umwandeln", "Markdown-Tabellen in echte Excel-Zeilen und -Spalten umwandeln."],
      "markdown-table-to-csv": ["Markdown-Tabelle in CSV umwandeln", "Eine Markdown-Tabelle in eine saubere, kompatible CSV-Datei konvertieren."],
      "markdown-viewer": ["Markdown-Viewer online", "Formatiertes Markdown in Echtzeit und ohne Datei-Upload anzeigen."],
      "markdown-to-html": ["Markdown in HTML umwandeln", "Sofort sauberes, semantisches HTML aus Markdown erzeugen."],
      "word-to-markdown": ["Word in Markdown umwandeln", "Formatierten Text aus Word oder Google Docs einfügen und in Markdown umwandeln."],
      "remove-em-dashes": ["Gedankenstriche aus Text entfernen", "Lange Gedankenstriche finden und durch einfachere Satzzeichen ersetzen."],
      "clean-ai-text": ["ChatGPT- und KI-Text bereinigen", "Gedankenstriche, typografische Anführungszeichen, Emojis und versteckte Zeichen bereinigen."],
      "remove-invisible-characters": ["Unsichtbare Zeichen entfernen", "Nullbreitenzeichen, weiche Trennzeichen und Richtungsmarken erkennen und entfernen."],
    }),
  },
  fr: {
    languageName: "Français", allTools: "Tous les outils", about: "À propos",
    homeEyebrow: "12 outils gratuits", homeTitle: "Corrigez les textes copiés depuis une IA.",
    homeDescription: "Convertissez le Markdown, nettoyez la mise en forme de ChatGPT, réparez les tableaux et supprimez les caractères invisibles. Tout reste dans votre navigateur.",
    homeMetaTitle: "Outils gratuits de mise en forme des textes IA",
    input: "Entrée", output: "Résultat", placeholder: "Collez ici le texte à convertir ou à nettoyer…", emptyResult: "Le résultat apparaîtra ici pendant la saisie.", characters: "caractères", report: "rapport", preview: "Aperçu", live: "En direct", updating: "Mise à jour…",
    copy: "Copier", copied: "Copié", download: "Télécharger", share: "Copier le lien", shareCopied: "Lien copié",
    embed: "Intégrer", embedCopied: "Code copié", downloadImage: "Télécharger l’image",
    free: "Gratuit", noSignup: "Sans inscription", private: "Le traitement s’effectue dans votre navigateur ; le texte n’est pas envoyé.",
    howTo: "Comment utiliser", faqTitle: "Questions fréquentes", relatedTools: "Outils associés",
    stepCopy: "Copiez le texte ou le tableau à corriger.", stepPaste: "Collez-le ci-dessus. Le résultat est mis à jour immédiatement.", stepFinish: "Copiez, téléchargez, partagez ou intégrez le résultat.",
    freeQuestion: (name) => `${name} est-il gratuit ?`, freeAnswer: "Oui. L’outil est gratuit, sans compte et sans limite d’utilisation.",
    privacyQuestion: "Mon texte est-il envoyé ?", privacyAnswer: "Non. Le traitement se fait dans le navigateur. Le texte n’est stocké que si vous créez explicitement un lien de partage.",
    mobileQuestion: "Est-ce compatible avec les mobiles ?", mobileAnswer: "Oui. L’éditeur fonctionne dans les navigateurs mobiles et de bureau récents.",
    introSuffix: "Collez votre contenu ci-dessus pour obtenir le résultat immédiatement, sans envoi et sans compte.",
    categories: { markdown: "Markdown et documents", cleanup: "Nettoyage des textes IA" },
    tools: tools({
      "markdown-to-word": ["Convertir Markdown en Word", "Convertissez gratuitement et en privé du Markdown en document Word bien structuré."],
      "markdown-to-pdf": ["Convertir Markdown en PDF", "Transformez du Markdown en PDF propre directement dans votre navigateur."],
      "markdown-to-google-docs": ["Convertir Markdown en Google Docs", "Copiez du Markdown dans Google Docs en conservant titres, listes, liens et tableaux."],
      "remove-markdown-formatting": ["Supprimer le formatage Markdown", "Retirez astérisques, dièses et autres symboles Markdown sans perdre le texte."],
      "markdown-table-to-excel": ["Convertir un tableau Markdown en Excel", "Transformez les tableaux Markdown en véritables lignes et colonnes Excel."],
      "markdown-table-to-csv": ["Convertir un tableau Markdown en CSV", "Convertissez un tableau Markdown en fichier CSV propre et compatible."],
      "markdown-viewer": ["Visionneuse Markdown en ligne", "Affichez le Markdown mis en forme en temps réel, sans envoyer de fichier."],
      "markdown-to-html": ["Convertir Markdown en HTML", "Générez instantanément un HTML propre et sémantique depuis du Markdown."],
      "word-to-markdown": ["Convertir Word en Markdown", "Collez du texte enrichi de Word ou Google Docs et convertissez-le en Markdown."],
      "remove-em-dashes": ["Supprimer les tirets cadratins", "Repérez et remplacez les tirets cadratins par une ponctuation plus simple."],
      "clean-ai-text": ["Nettoyer les textes ChatGPT et IA", "Nettoyez tirets, guillemets courbes, emojis et caractères cachés des textes IA."],
      "remove-invisible-characters": ["Supprimer les caractères invisibles", "Détectez et supprimez espaces sans chasse, césures et marques directionnelles."],
    }),
  },
  it: {
    languageName: "Italiano", allTools: "Tutti gli strumenti", about: "Informazioni",
    homeEyebrow: "12 strumenti gratuiti", homeTitle: "Correggi il testo copiato dall’IA.",
    homeDescription: "Converti Markdown, pulisci la formattazione di ChatGPT, correggi le tabelle e rimuovi i caratteri invisibili. Tutto avviene privatamente nel browser.",
    homeMetaTitle: "Strumenti gratuiti per formattare testi IA",
    input: "Testo", output: "Risultato", placeholder: "Incolla qui il testo da convertire o pulire…", emptyResult: "Il risultato apparirà qui mentre scrivi.", characters: "caratteri", report: "rapporto", preview: "Anteprima", live: "Live", updating: "Aggiornamento…",
    copy: "Copia", copied: "Copiato", download: "Scarica", share: "Copia link", shareCopied: "Link copiato",
    embed: "Incorpora", embedCopied: "Codice copiato", downloadImage: "Scarica immagine",
    free: "Gratis", noSignup: "Senza registrazione", private: "L’elaborazione avviene nel browser; il testo non viene caricato.",
    howTo: "Come usare", faqTitle: "Domande frequenti", relatedTools: "Strumenti correlati",
    stepCopy: "Copia il testo o la tabella da correggere.", stepPaste: "Incollalo qui sopra. Il risultato si aggiorna subito.", stepFinish: "Copia, scarica, condividi o incorpora il risultato.",
    freeQuestion: (name) => `${name} è gratuito?`, freeAnswer: "Sì. È gratuito, non richiede un account e non ha limiti di utilizzo.",
    privacyQuestion: "Il mio testo viene caricato?", privacyAnswer: "No. L’elaborazione avviene nel browser. Il testo viene salvato solo se crei esplicitamente un link condiviso.",
    mobileQuestion: "Funziona su smartphone?", mobileAnswer: "Sì. L’editor funziona nei browser moderni per smartphone e desktop.",
    introSuffix: "Incolla il contenuto qui sopra per ottenere subito il risultato, senza caricare il testo o creare un account.",
    categories: { markdown: "Markdown e documenti", cleanup: "Pulizia del testo IA" },
    tools: tools({
      "markdown-to-word": ["Convertire Markdown in Word", "Converti Markdown in un documento Word ben formattato, gratis e in privato."],
      "markdown-to-pdf": ["Convertire Markdown in PDF", "Trasforma Markdown in un PDF pulito direttamente nel browser."],
      "markdown-to-google-docs": ["Convertire Markdown in Google Docs", "Porta Markdown in Google Docs conservando titoli, elenchi, link e tabelle."],
      "remove-markdown-formatting": ["Rimuovere la formattazione Markdown", "Elimina asterischi, cancelletti e altri simboli Markdown senza perdere il testo."],
      "markdown-table-to-excel": ["Convertire tabella Markdown in Excel", "Trasforma le tabelle Markdown in vere righe e colonne Excel."],
      "markdown-table-to-csv": ["Convertire tabella Markdown in CSV", "Converti una tabella Markdown in un file CSV pulito e compatibile."],
      "markdown-viewer": ["Visualizzatore Markdown online", "Visualizza Markdown formattato in tempo reale senza caricare file."],
      "markdown-to-html": ["Convertire Markdown in HTML", "Genera subito HTML pulito e semantico a partire da Markdown."],
      "word-to-markdown": ["Convertire Word in Markdown", "Incolla testo formattato da Word o Google Docs e convertilo in Markdown."],
      "remove-em-dashes": ["Rimuovere i trattini lunghi", "Trova e sostituisci i trattini lunghi con una punteggiatura più semplice."],
      "clean-ai-text": ["Pulire il testo di ChatGPT e IA", "Pulisci trattini, virgolette curve, emoji e caratteri nascosti dai testi IA."],
      "remove-invisible-characters": ["Rimuovere caratteri invisibili", "Rileva e rimuovi spazi a larghezza zero, trattini morbidi e segni direzionali."],
    }),
  },
  ja: {
    languageName: "日本語", allTools: "すべてのツール", about: "サイトについて",
    homeEyebrow: "無料ツール12種類", homeTitle: "AIからコピーした文章の書式を修正。",
    homeDescription: "Markdown変換、ChatGPTの書式整理、表の修復、不可視文字の削除をブラウザ内で安全に行えます。",
    homeMetaTitle: "AI文章向け無料書式ツール",
    input: "入力", output: "結果", placeholder: "変換または整理する文章をここに貼り付けてください…", emptyResult: "入力すると、ここに結果が表示されます。", characters: "文字", report: "レポート", preview: "プレビュー", live: "リアルタイム", updating: "更新中…",
    copy: "コピー", copied: "コピーしました", download: "ダウンロード", share: "共有リンクをコピー", shareCopied: "リンクをコピーしました",
    embed: "埋め込み", embedCopied: "コードをコピーしました", downloadImage: "画像をダウンロード",
    free: "無料", noSignup: "登録不要", private: "処理はブラウザ内で行われ、文章はアップロードされません。",
    howTo: "使い方：", faqTitle: "よくある質問", relatedTools: "関連ツール",
    stepCopy: "修正したい文章または表をコピーします。", stepPaste: "上の入力欄に貼り付けると、結果がすぐに更新されます。", stepFinish: "結果をコピー、ダウンロード、共有、または埋め込みます。",
    freeQuestion: (name) => `${name}は無料ですか？`, freeAnswer: "はい。無料で、アカウント登録も利用制限もありません。",
    privacyQuestion: "文章はアップロードされますか？", privacyAnswer: "いいえ。処理はブラウザ内で行われます。共有リンクを明示的に作成した場合のみ保存されます。",
    mobileQuestion: "スマートフォンでも使えますか？", mobileAnswer: "はい。最新のモバイルおよびデスクトップブラウザで動作します。",
    introSuffix: "上に内容を貼り付けるだけで、アップロードや登録なしですぐに結果を確認できます。",
    categories: { markdown: "Markdownと文書", cleanup: "AI文章の整理" },
    tools: tools({
      "markdown-to-word": ["MarkdownをWordに変換", "Markdownを整ったWord文書に無料で安全に変換します。"],
      "markdown-to-pdf": ["MarkdownをPDFに変換", "Markdownをブラウザから読みやすいPDFに変換します。"],
      "markdown-to-google-docs": ["MarkdownをGoogleドキュメントに変換", "見出し、リスト、リンク、表を保ったままGoogleドキュメントへ移せます。"],
      "remove-markdown-formatting": ["Markdown書式を削除", "本文を残したまま、アスタリスクやシャープなどのMarkdown記号を削除します。"],
      "markdown-table-to-excel": ["Markdown表をExcelに変換", "Markdownのパイプ表をExcelの行と列に変換します。"],
      "markdown-table-to-csv": ["Markdown表をCSVに変換", "Markdown表を互換性の高いCSVファイルに変換します。"],
      "markdown-viewer": ["オンラインMarkdownビューア", "ファイルを送信せず、Markdownの書式をリアルタイムで確認できます。"],
      "markdown-to-html": ["MarkdownをHTMLに変換", "Markdownからクリーンで意味的なHTMLをすぐに生成します。"],
      "word-to-markdown": ["WordをMarkdownに変換", "WordやGoogleドキュメントのリッチテキストをMarkdownに変換します。"],
      "remove-em-dashes": ["文章から長いダッシュを削除", "長いダッシュを見つけて、より一般的な句読点に置換します。"],
      "clean-ai-text": ["ChatGPT・AI文章クリーナー", "AI文章のダッシュ、曲線引用符、絵文字、隠し文字を整理します。"],
      "remove-invisible-characters": ["不可視文字を削除", "ゼロ幅スペース、ソフトハイフン、方向制御文字を検出して削除します。"],
    }),
  },
  ko: {
    languageName: "한국어", allTools: "모든 도구", about: "소개",
    homeEyebrow: "무료 도구 12개", homeTitle: "AI에서 복사한 텍스트의 서식을 고치세요.",
    homeDescription: "Markdown 변환, ChatGPT 서식 정리, 표 복구, 보이지 않는 문자 제거를 브라우저에서 안전하게 처리합니다.",
    homeMetaTitle: "AI 텍스트용 무료 서식 도구",
    input: "입력", output: "결과", placeholder: "변환하거나 정리할 텍스트를 여기에 붙여넣으세요…", emptyResult: "입력하면 결과가 여기에 표시됩니다.", characters: "자", report: "보고서", preview: "미리보기", live: "실시간", updating: "업데이트 중…",
    copy: "복사", copied: "복사됨", download: "다운로드", share: "공유 링크 복사", shareCopied: "링크 복사됨",
    embed: "삽입", embedCopied: "코드 복사됨", downloadImage: "이미지 다운로드",
    free: "무료", noSignup: "가입 불필요", private: "처리는 브라우저에서 이루어지며 텍스트는 업로드되지 않습니다.",
    howTo: "사용 방법:", faqTitle: "자주 묻는 질문", relatedTools: "관련 도구",
    stepCopy: "수정할 텍스트나 표를 복사하세요.", stepPaste: "위 입력란에 붙여넣으면 결과가 즉시 업데이트됩니다.", stepFinish: "결과를 복사, 다운로드, 공유 또는 삽입하세요.",
    freeQuestion: (name) => `${name}은 무료인가요?`, freeAnswer: "네. 무료이며 계정이나 사용 제한이 없습니다.",
    privacyQuestion: "텍스트가 업로드되나요?", privacyAnswer: "아니요. 브라우저에서 처리됩니다. 공유 링크를 직접 만들 때만 저장됩니다.",
    mobileQuestion: "모바일에서도 사용할 수 있나요?", mobileAnswer: "네. 최신 모바일 및 데스크톱 브라우저에서 작동합니다.",
    introSuffix: "내용을 위에 붙여넣으면 업로드나 가입 없이 결과를 바로 확인할 수 있습니다.",
    categories: { markdown: "Markdown 및 문서", cleanup: "AI 텍스트 정리" },
    tools: tools({
      "markdown-to-word": ["Markdown을 Word로 변환", "Markdown을 올바르게 서식화된 Word 문서로 무료로 변환합니다."],
      "markdown-to-pdf": ["Markdown을 PDF로 변환", "Markdown을 브라우저에서 깔끔한 PDF로 변환합니다."],
      "markdown-to-google-docs": ["Markdown을 Google Docs로 변환", "제목, 목록, 링크와 표를 유지해 Google Docs로 옮깁니다."],
      "remove-markdown-formatting": ["Markdown 서식 제거", "본문은 유지하면서 별표, 해시 등 Markdown 기호를 제거합니다."],
      "markdown-table-to-excel": ["Markdown 표를 Excel로 변환", "Markdown 파이프 표를 Excel 행과 열로 변환합니다."],
      "markdown-table-to-csv": ["Markdown 표를 CSV로 변환", "Markdown 표를 호환 가능한 깔끔한 CSV로 변환합니다."],
      "markdown-viewer": ["온라인 Markdown 뷰어", "파일을 업로드하지 않고 서식이 적용된 Markdown을 실시간으로 확인합니다."],
      "markdown-to-html": ["Markdown을 HTML로 변환", "Markdown에서 깔끔하고 의미 있는 HTML을 즉시 생성합니다."],
      "word-to-markdown": ["Word를 Markdown으로 변환", "Word나 Google Docs의 서식 있는 텍스트를 Markdown으로 변환합니다."],
      "remove-em-dashes": ["텍스트에서 긴 대시 제거", "긴 대시를 찾아 더 일반적인 문장 부호로 바꿉니다."],
      "clean-ai-text": ["ChatGPT 및 AI 텍스트 정리", "AI 텍스트의 대시, 곡선 따옴표, 이모지와 숨은 문자를 정리합니다."],
      "remove-invisible-characters": ["보이지 않는 문자 제거", "폭이 0인 공백, 소프트 하이픈과 방향 표시를 찾아 제거합니다."],
    }),
  },
  zh: {
    languageName: "简体中文", allTools: "所有工具", about: "关于",
    homeEyebrow: "12 个免费工具", homeTitle: "修复从 AI 复制的文本格式。",
    homeDescription: "转换 Markdown、清理 ChatGPT 格式、修复表格并删除不可见字符。所有处理都在浏览器中私密完成。",
    homeMetaTitle: "免费的 AI 文本格式工具",
    input: "输入", output: "结果", placeholder: "在此粘贴需要转换或清理的文本…", emptyResult: "输入时，结果会显示在这里。", characters: "字符", report: "报告", preview: "预览", live: "实时", updating: "更新中…",
    copy: "复制", copied: "已复制", download: "下载", share: "复制分享链接", shareCopied: "链接已复制",
    embed: "嵌入", embedCopied: "代码已复制", downloadImage: "下载图片",
    free: "免费", noSignup: "无需注册", private: "处理在浏览器中完成，文本不会上传。",
    howTo: "使用方法：", faqTitle: "常见问题", relatedTools: "相关工具",
    stepCopy: "复制需要修复的文本或表格。", stepPaste: "粘贴到上方，结果会立即更新。", stepFinish: "复制、下载、分享或嵌入处理结果。",
    freeQuestion: (name) => `${name}免费吗？`, freeAnswer: "是的。完全免费，无需账户，也没有使用次数限制。",
    privacyQuestion: "我的文本会上传吗？", privacyAnswer: "不会。处理在浏览器中进行。只有主动创建分享链接时才会保存文本。",
    mobileQuestion: "手机上可以使用吗？", mobileAnswer: "可以。编辑器支持现代手机和桌面浏览器。",
    introSuffix: "将内容粘贴到上方即可立即查看结果，无需上传文本或创建账户。",
    categories: { markdown: "Markdown 与文档", cleanup: "AI 文本清理" },
    tools: tools({
      "markdown-to-word": ["Markdown 转 Word", "免费、私密地将 Markdown 转换为格式规范的 Word 文档。"],
      "markdown-to-pdf": ["Markdown 转 PDF", "直接在浏览器中将 Markdown 转换为清晰的 PDF。"],
      "markdown-to-google-docs": ["Markdown 转 Google 文档", "将 Markdown 复制到 Google 文档并保留标题、列表、链接和表格。"],
      "remove-markdown-formatting": ["删除 Markdown 格式", "保留正文，同时删除星号、井号等 Markdown 符号。"],
      "markdown-table-to-excel": ["Markdown 表格转 Excel", "将 Markdown 竖线表格转换为 Excel 的行和列。"],
      "markdown-table-to-csv": ["Markdown 表格转 CSV", "将 Markdown 表格转换为干净、兼容的 CSV 文件。"],
      "markdown-viewer": ["在线 Markdown 查看器", "无需上传文件，实时查看格式化后的 Markdown。"],
      "markdown-to-html": ["Markdown 转 HTML", "立即从 Markdown 生成干净、语义化的 HTML。"],
      "word-to-markdown": ["Word 转 Markdown", "粘贴 Word 或 Google 文档的富文本并转换为 Markdown。"],
      "remove-em-dashes": ["删除文本中的长破折号", "查找长破折号并替换为更常用的标点。"],
      "clean-ai-text": ["清理 ChatGPT 和 AI 文本", "清理 AI 文本中的破折号、弯引号、表情符号和隐藏字符。"],
      "remove-invisible-characters": ["删除不可见字符", "检测并删除零宽空格、软连字符和方向控制标记。"],
    }),
  },
  hi: {
    languageName: "हिन्दी", allTools: "सभी टूल", about: "परिचय",
    homeEyebrow: "12 मुफ़्त टूल", homeTitle: "AI से कॉपी किए गए टेक्स्ट की फ़ॉर्मैटिंग ठीक करें।",
    homeDescription: "Markdown बदलें, ChatGPT की फ़ॉर्मैटिंग साफ़ करें, टेबल सुधारें और छिपे अक्षर हटाएँ। सारी प्रोसेसिंग आपके ब्राउज़र में निजी रूप से होती है।",
    homeMetaTitle: "AI टेक्स्ट के लिए मुफ़्त फ़ॉर्मैटिंग टूल",
    input: "इनपुट", output: "नतीजा", placeholder: "बदलने या साफ़ करने वाला टेक्स्ट यहाँ पेस्ट करें…", emptyResult: "टाइप करते समय नतीजा यहाँ दिखाई देगा।", characters: "अक्षर", report: "रिपोर्ट", preview: "प्रीव्यू", live: "लाइव", updating: "अपडेट हो रहा है…",
    copy: "कॉपी करें", copied: "कॉपी हो गया", download: "डाउनलोड", share: "शेयर लिंक कॉपी करें", shareCopied: "लिंक कॉपी हो गया",
    embed: "एम्बेड", embedCopied: "कोड कॉपी हो गया", downloadImage: "इमेज डाउनलोड करें",
    free: "मुफ़्त", noSignup: "साइनअप नहीं", private: "प्रोसेसिंग ब्राउज़र में होती है; टेक्स्ट अपलोड नहीं होता।",
    howTo: "इस्तेमाल कैसे करें:", faqTitle: "अक्सर पूछे जाने वाले सवाल", relatedTools: "संबंधित टूल",
    stepCopy: "जिस टेक्स्ट या टेबल को ठीक करना है उसे कॉपी करें।", stepPaste: "ऊपर पेस्ट करें। नतीजा तुरंत अपडेट होगा।", stepFinish: "नतीजे को कॉपी, डाउनलोड, शेयर या एम्बेड करें।",
    freeQuestion: (name) => `क्या ${name} मुफ़्त है?`, freeAnswer: "हाँ। यह मुफ़्त है, अकाउंट की ज़रूरत नहीं और उपयोग की कोई सीमा नहीं है।",
    privacyQuestion: "क्या मेरा टेक्स्ट अपलोड होता है?", privacyAnswer: "नहीं। प्रोसेसिंग ब्राउज़र में होती है। टेक्स्ट तभी सेव होता है जब आप खुद शेयर लिंक बनाते हैं।",
    mobileQuestion: "क्या यह मोबाइल पर चलता है?", mobileAnswer: "हाँ। एडिटर आधुनिक मोबाइल और डेस्कटॉप ब्राउज़र में चलता है।",
    introSuffix: "ऊपर सामग्री पेस्ट करें और बिना अपलोड या अकाउंट के तुरंत नतीजा देखें।",
    categories: { markdown: "Markdown और दस्तावेज़", cleanup: "AI टेक्स्ट की सफ़ाई" },
    tools: tools({
      "markdown-to-word": ["Markdown को Word में बदलें", "Markdown को सही फ़ॉर्मैट वाले Word दस्तावेज़ में मुफ़्त और निजी रूप से बदलें।"],
      "markdown-to-pdf": ["Markdown को PDF में बदलें", "Markdown को सीधे ब्राउज़र में साफ़ PDF में बदलें।"],
      "markdown-to-google-docs": ["Markdown को Google Docs में बदलें", "शीर्षक, सूची, लिंक और टेबल बचाते हुए Markdown को Google Docs में ले जाएँ।"],
      "remove-markdown-formatting": ["Markdown फ़ॉर्मैटिंग हटाएँ", "टेक्स्ट बचाते हुए तारांकन, हैश और अन्य Markdown चिन्ह हटाएँ।"],
      "markdown-table-to-excel": ["Markdown टेबल को Excel में बदलें", "Markdown पाइप टेबल को Excel की पंक्तियों और कॉलम में बदलें।"],
      "markdown-table-to-csv": ["Markdown टेबल को CSV में बदलें", "Markdown टेबल को साफ़ और अनुकूल CSV फ़ाइल में बदलें।"],
      "markdown-viewer": ["ऑनलाइन Markdown व्यूअर", "फ़ाइल अपलोड किए बिना फ़ॉर्मैट किया हुआ Markdown लाइव देखें।"],
      "markdown-to-html": ["Markdown को HTML में बदलें", "Markdown से तुरंत साफ़ और अर्थपूर्ण HTML बनाएँ।"],
      "word-to-markdown": ["Word को Markdown में बदलें", "Word या Google Docs का रिच टेक्स्ट पेस्ट करके Markdown में बदलें।"],
      "remove-em-dashes": ["टेक्स्ट से लंबे डैश हटाएँ", "लंबे डैश खोजें और उन्हें आसान विराम चिह्न से बदलें।"],
      "clean-ai-text": ["ChatGPT और AI टेक्स्ट साफ़ करें", "AI टेक्स्ट से डैश, घुमावदार उद्धरण, इमोजी और छिपे अक्षर साफ़ करें।"],
      "remove-invisible-characters": ["अदृश्य अक्षर हटाएँ", "ज़ीरो-विथ स्पेस, सॉफ्ट हाइफ़न और दिशा चिह्न खोजकर हटाएँ।"],
    }),
  },
  ar: {
    languageName: "العربية", allTools: "كل الأدوات", about: "حول الموقع",
    homeEyebrow: "12 أداة مجانية", homeTitle: "أصلح تنسيق النص المنسوخ من الذكاء الاصطناعي.",
    homeDescription: "حوّل Markdown ونظّف تنسيق ChatGPT وأصلح الجداول واحذف المحارف غير المرئية. تتم المعالجة بخصوصية داخل متصفحك.",
    homeMetaTitle: "أدوات مجانية لتنسيق نصوص الذكاء الاصطناعي",
    input: "النص", output: "النتيجة", placeholder: "الصق هنا النص الذي تريد تحويله أو تنظيفه…", emptyResult: "ستظهر النتيجة هنا أثناء الكتابة.", characters: "محرف", report: "تقرير", preview: "معاينة", live: "مباشر", updating: "جارٍ التحديث…",
    copy: "نسخ", copied: "تم النسخ", download: "تنزيل", share: "نسخ رابط المشاركة", shareCopied: "تم نسخ الرابط",
    embed: "تضمين", embedCopied: "تم نسخ الرمز", downloadImage: "تنزيل الصورة",
    free: "مجاني", noSignup: "بلا تسجيل", private: "تتم المعالجة في متصفحك ولا يُرفع النص.",
    howTo: "طريقة استخدام", faqTitle: "الأسئلة الشائعة", relatedTools: "أدوات ذات صلة",
    stepCopy: "انسخ النص أو الجدول الذي تريد إصلاحه.", stepPaste: "الصقه أعلاه وستتحدث النتيجة فورًا.", stepFinish: "انسخ النتيجة أو نزّلها أو شاركها أو ضمّنها.",
    freeQuestion: (name) => `هل ${name} مجاني؟`, freeAnswer: "نعم. الأداة مجانية ولا تتطلب حسابًا ولا تفرض حدًا للاستخدام.",
    privacyQuestion: "هل يُرفع النص؟", privacyAnswer: "لا. تتم المعالجة داخل المتصفح. لا يُحفظ النص إلا إذا أنشأت رابط مشاركة بنفسك.",
    mobileQuestion: "هل تعمل على الهاتف؟", mobileAnswer: "نعم. يعمل المحرر في متصفحات الهاتف وسطح المكتب الحديثة.",
    introSuffix: "الصق محتواك أعلاه لترى النتيجة فورًا من دون رفع النص أو إنشاء حساب.",
    categories: { markdown: "Markdown والمستندات", cleanup: "تنظيف نصوص الذكاء الاصطناعي" },
    tools: tools({
      "markdown-to-word": ["تحويل Markdown إلى Word", "حوّل Markdown إلى مستند Word منسّق مجانًا وبخصوصية."],
      "markdown-to-pdf": ["تحويل Markdown إلى PDF", "حوّل Markdown إلى ملف PDF واضح مباشرة في المتصفح."],
      "markdown-to-google-docs": ["تحويل Markdown إلى Google Docs", "انقل Markdown إلى Google Docs مع الحفاظ على العناوين والقوائم والروابط والجداول."],
      "remove-markdown-formatting": ["إزالة تنسيق Markdown", "احذف النجوم وعلامات الشباك ورموز Markdown الأخرى مع إبقاء النص."],
      "markdown-table-to-excel": ["تحويل جدول Markdown إلى Excel", "حوّل جداول Markdown إلى صفوف وأعمدة حقيقية في Excel."],
      "markdown-table-to-csv": ["تحويل جدول Markdown إلى CSV", "حوّل جدول Markdown إلى ملف CSV نظيف ومتوافق."],
      "markdown-viewer": ["عارض Markdown على الإنترنت", "اعرض Markdown منسقًا لحظيًا من دون رفع الملفات."],
      "markdown-to-html": ["تحويل Markdown إلى HTML", "أنشئ HTML نظيفًا ودلاليًا من Markdown فورًا."],
      "word-to-markdown": ["تحويل Word إلى Markdown", "الصق نصًا منسقًا من Word أو Google Docs وحوّله إلى Markdown."],
      "remove-em-dashes": ["إزالة الشرطات الطويلة", "اعثر على الشرطات الطويلة واستبدلها بعلامات ترقيم أبسط."],
      "clean-ai-text": ["تنظيف نص ChatGPT والذكاء الاصطناعي", "نظّف الشرطات والاقتباسات المنحنية والرموز التعبيرية والمحارف المخفية."],
      "remove-invisible-characters": ["إزالة المحارف غير المرئية", "اكتشف واحذف المسافات الصفرية والواصلات الناعمة وعلامات الاتجاه."],
    }),
  },
};

export function isLocale(value: string): value is LocaleCode {
  return localeCodes.includes(value as LocaleCode);
}

export function isLocalizedToolSlug(value: string): value is LocalizedToolSlug {
  return localizedToolSlugs.includes(value as LocalizedToolSlug);
}

export function localizeTool(slug: LocalizedToolSlug, locale: LocaleCode): ToolDefinition {
  const source = getTool(slug);
  if (!source) throw new Error(`Unknown localized tool: ${slug}`);
  const translation = messages[locale].tools[slug];
  const faq = messages[locale];
  return {
    ...source,
    name: translation.name,
    title: translation.name,
    description: translation.description,
    intro: `${translation.description} ${faq.introSuffix}`,
    placeholder: faq.placeholder,
    faqs: [
      { question: faq.freeQuestion(translation.name), answer: faq.freeAnswer },
      { question: faq.privacyQuestion, answer: faq.privacyAnswer },
      { question: faq.mobileQuestion, answer: faq.mobileAnswer },
    ],
  };
}

export function localizedPath(locale: SiteLocale, path = "") {
  const suffix = path ? `/${path.replace(/^\/+/, "")}` : "";
  return locale === "en" ? suffix || "/" : `/${locale}${suffix}`;
}

export function languageAlternates(path = "") {
  return {
    en: `https://fixmyformatting.com${localizedPath("en", path)}`,
    ...Object.fromEntries(localeCodes.map((locale) => [locale, `https://fixmyformatting.com${localizedPath(locale, path)}`])),
    "x-default": `https://fixmyformatting.com${localizedPath("en", path)}`,
  };
}
