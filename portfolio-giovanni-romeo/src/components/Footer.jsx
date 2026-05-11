import "./Footer.css";

export default function Footer({ t }) {
  return (
    <footer className="shell foot">
      <div>{t("foot.copy")}</div>
      <div className="center">{t("foot.built")}</div>
      <div className="right">{t("foot.ver")}</div>
    </footer>
  );
}
