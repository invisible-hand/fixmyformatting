import { fontGuide } from "@/content/i18n/en/fonts";
import { renderGuideMarkdown } from "@/lib/guide-markdown";
import { fontStyles, fontTableSample } from "@/lib/unicode-fonts";

/**
 * Static sections under the fonts-copy-and-paste workspace: a table of every
 * style, printed into the HTML by the same converter the workspace runs, then
 * the questions the page answers (are these fonts, upside-down text,
 * superscript, small caps). English only until a locale ships its own copy.
 */
export function FontGuide() {
  const copy = fontGuide;
  return (
    <>
      <section className="reference-section" id="styles">
        <h2>{copy.tableHeading}</h2>
        <p>{copy.tableNote}</p>
        <div className="reference-scroll" role="region" aria-label={copy.tableHeading} tabIndex={0}>
          <table className="reference-table font-table">
            <thead>
              <tr>
                <th scope="col">{copy.headers.style}</th>
                <th scope="col">{copy.headers.sample}</th>
                <th scope="col">{copy.headers.source}</th>
                <th scope="col">{copy.headers.covers}</th>
              </tr>
            </thead>
            <tbody>
              {fontStyles.map((style) => (
                <tr key={style.id} id={`about-${style.id}`}>
                  <th scope="row">{style.name}</th>
                  <td className="font-table-sample" dir="ltr">{style.convert(fontTableSample)}</td>
                  <td>{style.source}</td>
                  <td>{style.covers}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      {copy.sections.map((section) => (
        <section key={section.id} id={section.id}>
          <h2>{section.heading}</h2>
          <div className="guide-content" dangerouslySetInnerHTML={{ __html: renderGuideMarkdown(section.body) }} />
        </section>
      ))}
    </>
  );
}
