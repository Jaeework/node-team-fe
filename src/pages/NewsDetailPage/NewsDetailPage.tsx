import { useParams } from "react-router-dom";
import Button from "../../components/ui/button/Button";
import NewsParagraph from "./components/NewsParagraph";
import { BookOpen, Info } from "lucide-react";

const newsJson = {
  title: "US Jobs Report and Oil Prices",
  content: [
    "A report shows that many people in the U.S. lost jobs. The unemployment rate is higher now. This news makes investors worried. The job market is not strong.",
    "In February, the U.S. lost 92,000 jobs. Many jobs in health care and transport were lost. This is not good for the economy. Investors think prices will go up.",
    "Because of the Middle East crisis, oil prices are rising. Gas prices are also going up. This makes it hard for people to buy things. Inflation might increase.",
    "In London, living costs are very high. Childcare and housing are expensive. Fewer children are living in London. This is affecting schools.",
    "The UK government is worried about energy costs. The CEO of the energy regulator is changing jobs. This person will help with new energy policies.",
    "A report shows that many people in the U.S. lost jobs. The unemployment rate is higher now. This news makes investors worried. The job market is not strong.",
    "In February, the U.S. lost 92,000 jobs. Many jobs in health care and transport were lost. This is not good for the economy. Investors think prices will go up.",
    "Because of the Middle East crisis, oil prices are rising. Gas prices are also going up. This makes it hard for people to buy things. Inflation might increase.",
    "In London, living costs are very high. Childcare and housing are expensive. Fewer children are living in London. This is affecting schools.",
    "The UK government is worried about energy costs. The CEO of the energy regulator is changing jobs. This person will help with new energy policies.",
  ],
  url: "https://www.theguardian.com/business/live/2026/mar/06/oil-biggest-weekly-gain-four-years-strait-of-hormuz-traffic-halt-stock-markets-dollar-imf-news-updates",
  image:
    "https://media.guim.co.uk/222b794638e51985519f314634464ee0fa469ef9/1237_0_5535_4428/500.jpg",
  published_at: {
    $date: "2026-03-06T13:51:03.000Z",
  },
  level: "A2",
  source: "The Guardian",
  translated_content: [
    "미국에서 많은 사람들이 일자리를 잃었다는 보고서가 나왔어요. 실업률이 지금 더 높아요. 이 소식에 투자자들이 걱정하고 있어요. 노동 시장이 강하지 않아요.",
    "2월에 미국에서 92,000개의 일자리가 사라졌어요. 의료와 교통 분야의 많은 일자리가 줄었어요. 이것은 경제에 좋지 않아요. 투자자들은 가격이 오를 것이라고 생각하고 있어요.",
    "중동 위기로 인해 기름값이 오르고 있어요. 가스 가격도 상승하고 있어요. 이로 인해 물건을 사는 것이 어려워질 수 있어요. 인플레이션이 증가할지도 몰라요.",
    "런던에서는 생활비가 매우 비쌉니다. 보육과 주택 비용이 많이 들어요. 런던에 사는 어린이 수가 줄어들고 있어요. 이로 인해 학교에 영향이 가고 있어요.",
    "영국 정부는 에너지 비용에 대해 걱정하고 있어요. 에너지 규제 기관의 CEO가 자리를 바꾸고 있어요. 이 사람이 새로운 에너지 정책을 도와줄 거예요.",
  ],
  __v: 0,
  createdAt: {
    $date: "2026-03-06T13:56:02.413Z",
  },
  updatedAt: {
    $date: "2026-03-06T13:56:02.413Z",
  },
};

const abbJson = [
  {
    text: "UK",
    meaning: "영국",
  },
  { text: "BLS", meaning: "미국 노동통계국" },
  { text: "CEO", meaning: "최고 경영자" },
  { text: "delivery", meaning: "배송, 배달" },
  { text: "S&P 500", meaning: "미국의 주식 시장 지수" },
];

const NewsDetailPage = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 md:px-8">
      {/* 기사 */}
      <div className="bg-paper grid grid-cols-1 gap-8 md:grid-cols-12">
        <article className="border-border overflow-hidden rounded-2xl bg-white p-7 shadow-sm md:col-span-8 md:p-10">
          {/* 기사 정보 섹션(타이틀 위에) */}
          <section>
            {newsJson.level} / 발행 날짜:{" "}
            {new Date(newsJson.published_at.$date).toLocaleDateString()} / 출처:{" "}
            {newsJson.source} / 파라미터 아이디 : {id}
          </section>
          <Button
            size="icon"
            variant="outline"
            radius="md"
            onClick={() => {
              window.open(newsJson.url);
            }}
          >
            <BookOpen size={15} />
          </Button>
          {/* 기사 타이틀 섹션 */}
          <section>
            <h1 className="text-ink mb-8 text-4xl leading-tight font-bold md:text-5xl">
              Title:{newsJson.title}
            </h1>
          </section>

          {/* 기사 본문 섹션 */}
          <section>
            <div className="max-w-none space-y-6 overflow-y-auto leading-relaxed text-gray-700 md:h-125">
              {/* translated_content 인수넘겨울때 좀더 생각해보기. */}
              {/* 1) 이대로 넘겨도 잘작동은하는데 보기에 안좋음. */}
              {/* 2) 위에서 객체로 content랑 translated_content랑 react-useMemo 이용해서 미리 합치기 */}
              {/* 3) 백엔드 바꾸기..? -> Paragraph : [{내용: ~ , 번역 : ~}] */}
              {newsJson.content.map((text, i) => (
                <NewsParagraph
                  key={i}
                  content={text}
                  index={i}
                  translated_content={newsJson.translated_content[i]}
                />
              ))}
            </div>
          </section>

          {/* 약어 및 축약어 섹션 (하드코딩) */}
          <section>
            <div className="border-border mt-16 border-t pt-8">
              <div className="flex items-center gap-1 pb-1 text-gray-500">
                <h3 className="mb-4 flex items-center text-xs font-bold tracking-widest text-gray-500 uppercase">
                  <Info size={15} />
                  약어 및 축약어
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
                {abbJson.map((text) => (
                  <div className="flex items-baseline gap-1">
                    <span className="text-primary block font-semibold whitespace-nowrap">
                      {text.text}
                    </span>
                    <span className="text-xs text-gray-500">
                      {text.meaning}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </article>
        {/* 단어장 부분 (하드코딩) */}
        <aside className="space-y-6 md:col-span-4">
          <section className="border-border flex h-full flex-col overflow-hidden rounded-2xl border bg-white shadow-sm">
            <div className="border-border flex items-center justify-between border-b p-6">
              <h2 className="text-md flex items-center font-bold">단어장</h2>
              <div className="flex rounded-md bg-gray-100 p-1 text-[10px] font-bold">
                <Button
                  size="default"
                  variant="ghost"
                  radius="md"
                  className="text-gray-500"
                  onClick={() => {}}
                >
                  숙어
                </Button>
                <Button
                  size="default"
                  variant="background"
                  radius="md"
                  className="shadow-sm"
                  onClick={() => {}}
                >
                  단어
                </Button>
              </div>
            </div>
            <div className="max-h-150 space-y-4 overflow-y-auto bg-gray-50/50 p-4">
              <div className="border-border relative rounded-xl border bg-white p-5 shadow-sm">
                <div className="mb-2 flex items-start justify-between">
                  <div className="flex items-center">
                    <span className="text-primary text-md font-bold">
                      extraordinary
                    </span>
                    <button className="hover:text-primary ml-2 text-gray-400 transition-colors"></button>
                  </div>
                  <button className="text-gray-300 hover:text-gray-500"></button>
                </div>
                <p className="text-ink mb-3 text-sm font-bold">
                  기이한, 놀라운
                </p>
                <div className="border-accent space-y-1 border-l-2 pl-3 text-[13px] text-gray-500 italic">
                  <p>"The team achieved an extraordinary result."</p>
                  <p className="text-gray-400 not-italic">
                    "팀은 놀라운 결과를 달성했습니다."
                  </p>
                </div>
              </div>
            </div>
          </section>
        </aside>
        {/* 단어장 부분끝. */}
      </div>
    </main>
  );
};

export default NewsDetailPage;
