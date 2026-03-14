import { AsoOkeBorder } from "@/components/ui/AsoOkeBorder"
import { ChieftaincyCrown } from "@/components/ui/ChieftaincyCrown"
import { ProverbCallout } from "@/components/ui/ProverbCallout"

export function Footer() {
  return (
    <footer className="bg-espresso">
      <AsoOkeBorder />

      <div className="max-w-3xl mx-auto text-center py-16 px-6">
        <ChieftaincyCrown size={48} className="mx-auto mb-6" />

        <h2
          className="font-medium mb-2"
          style={{
            fontFamily: "var(--font-display), Georgia, serif",
            color: "#EDD9BE",
            fontSize: "1.5rem",
          }}
        >
          Chief (Mrs) Temitope Oluwakemi Ogundare, FIWAGBOYE
        </h2>

        <p
          className="italic mb-8"
          style={{
            fontFamily: "var(--font-body), Georgia, serif",
            color: "#C19A6B",
            fontSize: "1rem",
          }}
        >
          1991 – 2026 · 35 Years of Meritorious Service
        </p>

        <ProverbCallout
          yoruba="Ẹni tó bá sọ ọmọ dára, ó sọ orílẹ̀-èdè dára."
          english="He who raises children well, raises the nation well."
        />

        <div
          className="mt-12 text-center text-[0.8rem]"
          style={{ fontFamily: "var(--font-body), Georgia, serif", color: "rgba(237, 217, 190, 0.6)" }}
        >
          <p>Agbado District Comprehensive High School, Senior, Oke Aro · Ogun State, Nigeria</p>
          <p className="mt-1">A celebration by family, students, and colleagues who love her.</p>
        </div>

        <div
          className="mt-8 pt-6 text-center text-[0.75rem]"
          style={{
            borderTop: "1px solid rgba(237, 217, 190, 0.1)",
            fontFamily: "var(--font-body), Georgia, serif",
            color: "rgba(237, 217, 190, 0.4)",
          }}
        >
          <p>
            Designed &amp; built by{" "}
            <a
              href="https://sholajapheth.com"
              target="_blank"
              rel="noopener noreferrer"
              className="no-underline transition-colors hover:text-linen"
              style={{ color: "#D4A017" }}
            >
              Shola Japheth
            </a>
          </p>
        </div>
      </div>

      <AsoOkeBorder />
    </footer>
  )
}
