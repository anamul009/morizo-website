import { ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Reveal } from '../components/Reveal';

const EASE = [0.22, 1, 0.36, 1] as const;

// Hero entrance: children fade up one after another on first paint.
const heroContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.16, delayChildren: 0.25 } },
};
const heroItem = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
};

const heroSlides = [
  {
    src: 'https://images.unsplash.com/photo-1517999144091-3d9dca6d1e43?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920',
    alt: '洗練された抽象的なテクスチャー',
  },
  {
    src: 'https://images.unsplash.com/photo-1773701626591-3f7fa7b9addc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920',
    alt: 'ファインダイニングの体験',
  },
  {
    src: 'https://images.unsplash.com/photo-1630595271375-5073a6c0638b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920',
    alt: '美容・ウェルネス',
  },
  {
    src: 'https://images.unsplash.com/photo-1553644446-9f8f2762ea42?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920',
    alt: 'アートギャラリー',
  },
];

// Sister brand websites operated under 株式会社 森蔵.
const brandSites = [
  {
    id: 'lobmeyr',
    eng: "Member's Salon · Takamatsu",
    name: 'LOBMEYR',
    tagline: '洗練を極めた、高松・香川の会員制サロン。',
    href: 'https://lobmeyr.jp/',
    src: 'https://images.unsplash.com/photo-1595871151608-bc7abd1caca3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  },
  {
    id: 'yata',
    eng: 'Members Club · Okayama',
    name: 'CLUB 八咫',
    tagline: '上質な酒と美食を、岡山の隠れ家で。',
    href: 'https://clubyata.jp/',
    src: 'https://images.unsplash.com/photo-1764709124945-56ba2ae2c496?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  },
  {
    id: 'harima',
    eng: 'Live Music Club · Takamatsu',
    name: 'CLUB 播磨',
    tagline: 'ライブ音楽とともに過ごす、極上のひととき。',
    href: 'https://www.morikura.net/club/',
    src: 'https://images.unsplash.com/photo-1553644446-9f8f2762ea42?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  },
];

export function Home() {
  const total = heroSlides.length;
  // Clone the first slide at the end so we can keep moving forward past the
  // last image, then snap back to the real first slide with no transition.
  const slides = [...heroSlides, heroSlides[0]];
  const [current, setCurrent] = useState(0);
  const [animate, setAnimate] = useState(true);

  // Auto-advance the hero slider every 6 seconds (always forward).
  useEffect(() => {
    const id = setInterval(() => {
      setCurrent(c => c + 1);
    }, 6000);
    return () => clearInterval(id);
  }, []);

  // After snapping (transition off) re-enable the transition on the next frame.
  useEffect(() => {
    if (!animate) {
      const r = requestAnimationFrame(() => setAnimate(true));
      return () => cancelAnimationFrame(r);
    }
  }, [animate]);

  // When the clone (index === total) finishes sliding in, jump back to the
  // real first slide instantly so the loop feels endless and circular.
  const handleTransitionEnd = () => {
    if (current === total) {
      setAnimate(false);
      setCurrent(0);
    }
  };

  // Dot indicators track the *logical* slide, accounting for the clone.
  const activeDot = current % total;

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Sliding image track */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="flex h-full"
            onTransitionEnd={handleTransitionEnd}
            style={{
              width: `${slides.length * 100}%`,
              transform: `translateX(-${current * (100 / slides.length)}%)`,
              transition: animate ? 'transform 1200ms ease-in-out' : 'none',
            }}
          >
            {slides.map((slide, i) => (
              <div
                key={`${slide.src}-${i}`}
                className="relative h-full shrink-0"
                style={{ width: `${100 / slides.length}%` }}
              >
                <img
                  src={slide.src}
                  alt={slide.alt}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
          {/* Unifying overlay keeps white text readable across every slide */}
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20"></div>
        </div>

        {/* Slide indicators */}
        <div className="absolute bottom-10 left-0 right-0 z-20 flex justify-center gap-3">
          {heroSlides.map((slide, i) => (
            <button
              key={slide.src}
              onClick={() => setCurrent(i)}
              aria-label={`スライド ${i + 1} を表示`}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                activeDot === i ? 'w-10 bg-white' : 'w-4 bg-white/40 hover:bg-white/70'
              }`}
            />
          ))}
        </div>

        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <motion.div
              className="max-w-3xl space-y-8 text-white pt-20"
              variants={heroContainer}
              initial="hidden"
              animate="show"
            >
              <motion.div
                variants={heroItem}
                className="inline-block px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-sm tracking-widest border border-white/20"
              >
                体験を、より豊かに
              </motion.div>
              <motion.h1
                variants={heroItem}
                className="text-6xl md:text-7xl lg:text-8xl tracking-tight leading-none font-light"
              >
                卓越した価値を<br />
                あらゆる領域で
              </motion.h1>
              <motion.p
                variants={heroItem}
                className="text-xl md:text-2xl text-white/90 max-w-2xl leading-relaxed font-light"
              >
                食の芸術から、美とウェルネス、そして創造的な表現まで。
                株式会社 森蔵は、3つの個性的な事業部門を通じて、現代のラグジュアリーを再定義します。
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Brand Websites — 3 sister sites */}
      <section id="websites" className="bg-[#0a0a0a] text-white">
        <div className="max-w-7xl mx-auto px-6 pt-28 pb-16 text-center">
          <Reveal className="space-y-4">
            <div className="text-sm tracking-widest text-white/50 uppercase">Our Brands</div>
            <h2 className="text-4xl md:text-5xl tracking-tight font-light">関連ブランドサイト</h2>
            <p className="text-white/60 font-light max-w-2xl mx-auto pt-2 leading-relaxed">
              株式会社 森蔵が運営する、3つの会員制ブランド。それぞれの世界へ。
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3">
          {brandSites.map((site, i) => (
            <motion.a
              key={site.id}
              href={site.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block h-[60vh] md:h-[80vh] overflow-hidden"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: i * 0.12, ease: EASE }}
            >
              <img
                src={site.src}
                alt={site.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/55 transition-colors duration-500 group-hover:bg-black/35" />
              <div className="relative z-10 h-full flex flex-col justify-end p-8 md:p-10">
                <div className="text-xs tracking-[0.3em] uppercase text-white/70 mb-3 font-serif">
                  {site.eng}
                </div>
                <h3 className="text-3xl md:text-4xl font-light tracking-tight mb-4">
                  {site.name}
                </h3>
                <p className="text-white/80 font-light leading-relaxed mb-6 max-w-xs">
                  {site.tagline}
                </p>
                <div className="inline-flex items-center gap-3 text-sm tracking-widest uppercase">
                  サイトを見る
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </section>

      {/* Departments Overview - Detailed */}

      {/* Food & Beverage */}
      <section id="food" className="py-32 px-6 bg-[#f7f4e7]">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <Reveal x={-40} className="order-2 lg:order-1">
              <div className="space-y-10">
                <div className="space-y-2">
                  <div className="text-sm tracking-widest text-gray-500 uppercase">事業部門 01</div>
                  <h2 className="text-5xl tracking-tight font-light">飲食事業</h2>
                  <div className="text-xl text-gray-500 font-serif">Food &amp; Beverage</div>
                </div>

                <p className="text-lg text-gray-700 leading-relaxed">
                  私たちは、革新と伝統を融合させた、卓越した食の体験を生み出します。地元の生産者から直接仕入れる最高の食材、比類なき職人技、そして食卓を囲んで共有する深い喜び。それらを大切にした料理の世界を追求しています。
                </p>

                <div className="grid sm:grid-cols-2 gap-8 pt-4 border-t border-black/10">
                  <div className="space-y-3 pt-4">
                    <h4 className="font-semibold text-lg">ファインダイニング</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">季節の食材と、丁寧なおもてなしにこだわった、数々の受賞歴を誇る店舗を運営しています。</p>
                  </div>
                  <div className="space-y-3 pt-4">
                    <h4 className="font-semibold text-lg">アルチザン・カフェ</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">シングルオリジンのコーヒーと、毎日焼き上げる上質なペストリーを提供する、プレミアムなカフェ網。</p>
                  </div>
                  <div className="space-y-3 pt-4">
                    <h4 className="font-semibold text-lg">ビバレッジ・イノベーション</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">一流のソムリエとともに、独自のワインブレンド、クラフトスピリッツ、オーガニックティーを生み出します。</p>
                  </div>
                  <div className="space-y-3 pt-4">
                    <h4 className="font-semibold text-lg">飲食コンサルティング</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">レストランのコンセプト設計、メニュー開発、プロフェッショナル育成まで、戦略的に支援します。</p>
                  </div>
                </div>
              </div>
            </Reveal>
            <Reveal x={40} className="order-1 lg:order-2 grid grid-cols-2 gap-4 h-[500px] md:h-[700px]">
              <div className="self-end h-[85%] overflow-hidden rounded-xl shadow-sm">
                <img
                  src="https://images.unsplash.com/photo-1773701626591-3f7fa7b9addc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                  alt="エレガントな前菜"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-105"
                />
              </div>
              <div className="self-start h-[85%] overflow-hidden rounded-xl shadow-sm">
                <img
                  src="https://images.unsplash.com/photo-1764709124945-56ba2ae2c496?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                  alt="上質なワイングラス"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-105"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Beauty */}
      <section id="beauty" className="py-32 px-6 bg-black/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <Reveal x={-40} className="grid grid-cols-2 gap-4 h-[500px] md:h-[700px]">
              <div className="self-end h-[85%] overflow-hidden rounded-xl shadow-sm">
                <img
                  src="https://images.unsplash.com/photo-1595871151608-bc7abd1caca3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                  alt="ラグジュアリーな美容空間"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-105"
                />
              </div>
              <div className="self-start h-[85%] overflow-hidden rounded-xl shadow-sm">
                <img
                  src="https://images.unsplash.com/photo-1630595271375-5073a6c0638b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                  alt="スパ・ウェルネス"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-105"
                />
              </div>
            </Reveal>
            <Reveal x={40} className="space-y-10">
              <div className="space-y-2">
                <div className="text-sm tracking-widest text-gray-500 uppercase">事業部門 02</div>
                <h2 className="text-5xl tracking-tight font-light">美容事業</h2>
                <div className="text-xl text-gray-500 font-serif">Beauty &amp; Wellness</div>
              </div>

              <p className="text-lg text-gray-700 leading-relaxed">
                私たちの美容部門は、真の美しさは内なる健やかさと外なる輝きの繊細な調和から生まれる、という哲学を体現しています。最先端の皮膚科学と、時代を超えたホリスティックな儀式が出会う、優雅な癒しの空間を創造します。
              </p>

              <div className="space-y-8 pt-4">
                <div className="flex gap-6 border-b border-black/10 pb-6">
                  <div className="text-3xl text-gray-400 font-light">01</div>
                  <div>
                    <h4 className="font-semibold text-lg tracking-wide">ホリスティック・スパリトリート</h4>
                    <p className="text-gray-600 mt-2 leading-relaxed">古来の癒しの技と最先端のセラピーを融合させ、一人ひとりに合わせた施術を提供。心と身体の完全な調和を取り戻すウェルネスセンターです。</p>
                  </div>
                </div>
                <div className="flex gap-6 border-b border-black/10 pb-6">
                  <div className="text-3xl text-gray-400 font-light">02</div>
                  <div>
                    <h4 className="font-semibold text-lg tracking-wide">オーガニック・スキンケア</h4>
                    <p className="text-gray-600 mt-2 leading-relaxed">サステナブルに調達した、動物実験を行わない原料を使用。植物本来の効果と肌へのやさしさを最大限に引き出した、独自のコレクションです。</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="text-3xl text-gray-400 font-light">03</div>
                  <div>
                    <h4 className="font-semibold text-lg tracking-wide">美容クリニック</h4>
                    <p className="text-gray-600 mt-2 leading-relaxed">第一線の皮膚科医が在籍する最新鋭の美容医療施設。低侵襲で、確かな結果を追求する施術を提供します。</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Art */}
      <section id="art" className="py-32 px-6 bg-[#f7f4e7]">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <Reveal x={-40} className="order-2 lg:order-1">
              <div className="space-y-10">
                <div className="space-y-2">
                  <div className="text-sm tracking-widest text-gray-500 uppercase">事業部門 03</div>
                  <h2 className="text-5xl tracking-tight font-light">アート事業</h2>
                  <div className="text-xl text-gray-500 font-serif">Art &amp; Culture</div>
                </div>

                <p className="text-lg text-gray-700 leading-relaxed">
                  私たちは、丁寧にキュレーションした展覧会、協働プロジェクト、そして革新的な文化活動を通じて、現代アートの表現を支援します。創造的なコミュニティをつなぎ、対話を生み出し、アートを日常に溶け込ませることが私たちの使命です。
                </p>

                <div className="border-l border-black/20 pl-8 space-y-8 pt-4">
                  <div>
                    <h4 className="font-semibold text-xl">森蔵ギャラリー</h4>
                    <p className="text-gray-600 mt-3 leading-relaxed">主要都市に構えるフラッグシップの展示空間では、新進気鋭の地元アーティストから世界的に確立された作家まで、多様な表現の企画展を開催しています。</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-xl">アーティスト・イン・レジデンス</h4>
                    <p className="text-gray-600 mt-3 leading-relaxed">アトリエ空間、資金、そして専門的なメンターシップを提供し、現代アートの境界を押し広げる先駆的な作家を総合的に支援するプログラムです。</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-xl">コーポレート・キュレーション</h4>
                    <p className="text-gray-600 mt-3 leading-relaxed">意義あるアートコレクションの構築や、空間を恒久的に高めたい企業向けに、専門的なコンサルティングサービスを提供します。</p>
                  </div>
                </div>
              </div>
            </Reveal>
            <Reveal x={40} className="order-1 lg:order-2 grid grid-cols-2 gap-4 h-[500px] md:h-[700px]">
              <div className="self-end h-[85%] overflow-hidden rounded-xl shadow-sm">
                <img
                  src="https://images.unsplash.com/photo-1643665615671-c9d55c3740dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                  alt="アートギャラリー"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-105"
                />
              </div>
              <div className="self-start h-[85%] overflow-hidden rounded-xl shadow-sm">
                <img
                  src="https://images.unsplash.com/photo-1553644446-9f8f2762ea42?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                  alt="モダンアート空間"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-105"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* EC / Online Store — banner CTA. Replace href + copy with real shop. */}
      <section id="store" className="relative py-32 px-6 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1517999144091-3d9dca6d1e43?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
          alt="オンラインストア"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60"></div>
        <Reveal className="relative z-10 max-w-3xl mx-auto text-center text-white space-y-8">
          <div className="space-y-4">
            <div className="text-sm tracking-widest text-white/60 uppercase">Online Store</div>
            <h2 className="text-4xl md:text-5xl tracking-tight font-light">オンラインストア</h2>
          </div>
          <p className="text-lg md:text-xl text-white/80 font-light leading-relaxed max-w-2xl mx-auto">
            森蔵が手がける逸品の数々を、ご自宅でも。オンラインストアを準備中です。どうぞご期待ください。
          </p>
          <div className="pt-2">
            <span className="inline-flex items-center gap-3 border border-white/40 text-white/90 px-10 py-5 rounded-full text-lg tracking-wide">
              <span className="h-2 w-2 rounded-full bg-white/70 animate-pulse"></span>
              準備中 — Coming Soon
            </span>
          </div>
        </Reveal>
      </section>

      {/* NEWS Section */}
      <section id="news" className="py-32 px-6 bg-black/5 w-full">
        <div className="max-w-5xl mx-auto">
          <Reveal className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-6">
            <div className="space-y-2">
              <div className="text-sm tracking-widest text-gray-500 uppercase">News</div>
              <h2 className="text-5xl tracking-tight font-light">ニュース</h2>
              <div className="text-xl text-gray-500 font-serif">Latest Updates</div>
            </div>
            <a href="#" className="group inline-flex items-center gap-3 text-sm uppercase tracking-widest text-gray-600 hover:text-black transition-colors">
              すべて見る
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </Reveal>

          <div className="border-t border-black/10">
            {[
              { date: "2026.05.20", category: "飲食", title: "今秋、銀座にミシュラン星付きの新コンセプト店をオープン。" },
              { date: "2026.04.15", category: "美容", title: "森蔵ボタニカルズ、待望のサマー保湿ラインを発売。" },
              { date: "2026.03.02", category: "アート", title: "春の展覧会「Echoes of Tomorrow」地元作家10名が参加。" },
              { date: "2026.01.18", category: "コーポレート", title: "株式会社 森蔵、2030年に向けた包括的なサステナビリティ目標を発表。" }
            ].map((news, i) => (
              <motion.a
                key={i}
                href="#"
                className="group block border-b border-black/10 py-8 transition-colors hover:bg-black/[0.02]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}
              >
                <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-10">
                  <div className="text-sm tracking-widest text-gray-400 w-28 shrink-0 font-serif">{news.date}</div>
                  <div className="text-xs tracking-widest text-gray-500 uppercase w-24 shrink-0">{news.category}</div>
                  <div className="flex-1 text-lg md:text-xl font-light text-gray-900 group-hover:text-gray-500 transition-colors">{news.title}</div>
                  <ArrowRight className="hidden md:block w-5 h-5 text-gray-300 group-hover:text-black group-hover:translate-x-1 transition-all shrink-0" />
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* お問い合わせ (Contact/CTA) */}
      <section id="contact" className="py-32 px-6 bg-[#f7f4e7] w-full">
        <Reveal className="max-w-4xl mx-auto text-center space-y-10">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl tracking-tight font-light">
              お問い合わせ
            </h2>
            <p className="text-gray-500 uppercase tracking-widest text-sm">Contact Us</p>
          </div>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto font-light leading-relaxed">
            ともに、特別な何かを創造しましょう。株式会社 森蔵があなたのビジョンを
            どのように実現できるか、ぜひお気軽にお問い合わせください。
          </p>
          <div className="pt-4">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 22 }}
              className="group inline-flex items-center gap-4 bg-black text-white px-10 py-5 rounded-full hover:bg-gray-800 transition-colors text-lg tracking-wide"
            >
              お問い合わせはこちら
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </div>
        </Reveal>
      </section>
    </>
  );
}
