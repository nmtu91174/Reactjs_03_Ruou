import FadeInBlock from "../components/FadeInBlock";
import "../css/SectionFour.css";

export default function SectionFour() {
  // Demo data — có thể bind từ JSON/API
  const articles = [
    {
      id: "a1",
      img: "/assets/hp-sec4/right-1.webp",
      tag: "NEWS",
      title: "Maxwell Restaurant Wins Two Chef Hats",
      url: ""
    },
    {
      id: "a2",
      img: "/assets/hp-sec4/right-2.webp",
      tag: "NEWS",
      title: "Gourmet Traveller Restaurant of the Year, SA",
      url: ""
    }
  ];

  return (
    <>
      {/* ==== PHẦN 1: JOIN THE MAXWELL CLAN WINE CLUB ==== */}
      <section className="section-four">
        <div className="section-image">
          <img
            src="/assets/hp-sec4/sec4.webp"
            alt="Join the Maxwell Clan Wine Club"
            draggable="false"
          />

          <div className="overlay">
            {/* TOP LEFT TITLE + QUOTE */}
            <FadeInBlock className="overlay-top-left">
              <h3>JOIN THE MAXWELL CLAN WINE CLUB</h3>
              <blockquote>
                <em>
                  I love seeing the team at the annual dinners in Brisbane,
                  always great food and generous with the wines!
                </em>
                <br />
              </blockquote>
              <span className="strong">
                <strong>– MATTHIAS, MEMBER SINCE 2017</strong>
              </span>
            </FadeInBlock>

            {/* BOTTOM RIGHT CONTENT */}
            <FadeInBlock className="overlay-bottom-right">
              <div className="overlay-text">
                <p>
                  Choose your favourite wines or meads to come when it suits you.
                  Be welcomed like a member of our extended family with all the
                  benefits that brings. Member-only pricing, events and even
                  member-exclusive wines, plus much more.
                </p>
                <button className="btn-lightline">JOIN THE CLAN →</button>
              </div>
            </FadeInBlock>
          </div>
        </div>
      </section>

      {/* ==== PHẦN 2: ARTICLE STICKY SCROLL 50/50 ==== */}
      <section className="section-four section-four-grid">

        <div className="sf-left">
          <div className="sf-left-media">
            <img
              src="/assets/hp-sec4/left.webp"
              alt="Maxwell Wines"
              draggable="false"
            />
            <div className="sf-left-overlay">
              <div className="content-overlay journal-overlay">
                <FadeInBlock>
                  <div className="text-block">
                    <p>
                      Stay updated with events, winery news, wine releases and restaurant happenings at Maxwell Wines.
                    </p>
                    <button className="btn-hoverline">MAXWELL JOURNAL →</button>
                  </div>
                </FadeInBlock>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SCROLLING ARTICLES */}
        <div className="sf-right">
          {articles.map((a) => (
            <article key={a.id} className="sf-article">
              <a href={a.url} className="article-media">
                <img src={a.img} alt={a.title} />
                <span className="read-overlay">
                  <span className="read-btn">
                    READ ARTICLE →
                    <i className="underline"></i>
                  </span>
                </span>
              </a>

              <div className="article-meta">
                <span className="article-tag">{a.tag}</span>
                <h4 className="article-title">{a.title}</h4>
              </div>
            </article>
          ))}
        </div>
      </section>

    </>
  );
}
