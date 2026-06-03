import { motion } from 'motion/react';
import { Reveal } from '../components/Reveal';

const EASE = [0.22, 1, 0.36, 1] as const;

const profile = [
  { label: '社名', value: <>株式会社 森蔵</> },
  {
    label: '所在地',
    value: (
      <>
        〒760-0008<br />
        香川県高松市中野町29番地2号 高松パークビル11階1-2
      </>
    ),
  },
  {
    label: '連絡先',
    value: (
      <>
        TEL: 087-861-6601<br />
        FAX: 087-861-6602
      </>
    ),
  },
  { label: '設立', value: <>2007年05月</> },
  { label: '代表取締役', value: <>森 三希子</> },
];

export function Company() {
  return (
    <div className="w-full pt-32 pb-24">
      {/* Hero / Page Header */}
      <section className="px-6 py-12 md:py-24">
        <Reveal className="max-w-4xl mx-auto text-center space-y-4">
          <h1 className="text-5xl md:text-6xl tracking-tight font-light">会社概要</h1>
          <p className="text-gray-500 uppercase tracking-widest text-sm">Company Profile</p>
        </Reveal>
      </section>

      {/* Main Profile Table */}
      <section className="px-6 pb-32">
        <div className="max-w-4xl mx-auto">
          <Reveal className="bg-white p-8 md:p-14 rounded-3xl shadow-sm border border-black/5">
            <dl className="divide-y divide-black/5">
              {profile.map((row, i) => (
                <motion.div
                  key={row.label}
                  className="py-6 grid grid-cols-1 md:grid-cols-3 gap-4"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
                >
                  <dt className="text-gray-500 tracking-wider text-sm md:text-base mt-1">{row.label}</dt>
                  <dd className="md:col-span-2 text-lg leading-relaxed">{row.value}</dd>
                </motion.div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* Optional Brand Image or Quote */}
      <section className="px-6 pb-24">
        <Reveal y={40} className="max-w-6xl mx-auto h-[400px] md:h-[600px] rounded-3xl overflow-hidden relative">
          <motion.img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
            alt="コーポレートオフィス"
            className="w-full h-full object-cover"
            initial={{ scale: 1.15 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.4, ease: EASE }}
          />
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
            <h2 className="text-3xl md:text-5xl text-white font-light tracking-wide leading-tight">
              体験を、高める。<br />日常を、彩る。
            </h2>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
