import { useParams } from "react-router-dom";
import Button from "../../components/ui/button/Button";
import NewsParagraph from "./components/NewsParagraph/NewsParagraph";
import { BookOpen, Info } from "lucide-react";
import WordCard from "../MyWordPage/components/WordCard/WordCard";

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

const wordList = [
  {
    text: "jobs",
    meaning: "일자리",
    example: "Many jobs were lost last month.",
    example_meaning: "지난 달 많은 일자리가 사라졌어요.",
    type: "word",
    createdAt: { $date: "2026-03-06T13:56:01.813Z" },
  },
  {
    text: "unemployment",
    meaning: "실업",
    example: "The unemployment rate is higher now.",
    example_meaning: "실업률이 지금 더 높아요.",
    type: "word",
    createdAt: { $date: "2026-03-06T13:56:02.113Z" },
  },
  {
    text: "investors",
    meaning: "투자자들",
    example: "This news makes investors worried.",
    example_meaning: "이 소식에 투자자들이 걱정하고 있어요.",
    type: "word",
    createdAt: { $date: "2026-03-06T13:56:02.313Z" },
  },
];

const NewsDetailPage = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 md:px-8">
      {/* 기사 */}
      <div className="bg-paper grid grid-cols-1 gap-8 md:grid-cols-12">
        <article className="border-border relative flex h-[calc(100vh-150px)] flex-col rounded-2xl bg-white p-7 shadow-sm md:col-span-8 md:p-10">
          {/* 기사 정보 섹션(타이틀 위에) */}
          <div className="shrink-0">
            <section className="mb-2 text-sm text-gray-500">
              {newsJson.level} / 발행 날짜:{" "}
              {new Date(newsJson.published_at.$date).toLocaleDateString()} /
              출처: {newsJson.source}
            </section>
            <div className="absolute top-7 right-7 z-10 md:top-10 md:right-10">
              <Button
                size="icon"
                variant="outline"
                radius="md"
                onClick={() => window.open(newsJson.url)}
              >
                <BookOpen size={15} />
              </Button>
            </div>
            {/* 기사 타이틀 섹션 */}
            <section>
              <h1 className="text-ink mb-6 text-3xl leading-tight font-bold md:text-4xl">
                {newsJson.title}
              </h1>
            </section>
          </div>

          {/* 기사 본문 섹션 */}
          <div className="hover:[&::-webkit-scrollbar-thumb]:bg-primary/30 flex-1 overflow-y-auto pr-2 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-200 [&::-webkit-scrollbar-track]:bg-transparent">
            <section className="mb-10">
              <div className="max-w-none space-y-1 leading-relaxed text-gray-700">
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
            <section className="border-border border-t pt-8 pb-4">
              <div className="flex items-center gap-1 pb-1 text-gray-500">
                <h3 className="mb-4 flex items-center text-xs font-bold tracking-widest text-gray-500 uppercase">
                  <Info size={15} className="mr-1" />
                  약어 및 축약어
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                {abbJson.map((text, i) => (
                  <div key={i} className="flex items-baseline gap-2">
                    <span className="text-primary block font-semibold whitespace-nowrap">
                      {text.text}
                    </span>
                    <span className="text-xs text-gray-500">
                      {text.meaning}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </article>
        {/* 단어장 부분 (하드코딩) */}
        <aside className="space-y-6 md:col-span-4">
          <section className="border-border flex h-[calc(100vh-150px)] flex-col overflow-hidden rounded-2xl border bg-white shadow-sm">
            {/* 단어장 헤더 */}
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

            {/* 단어 리스트*/}
            <div className="hover:[&::-webkit-scrollbar-thumb]:bg-primary/30 flex-1 space-y-4 overflow-y-auto bg-gray-50/50 p-4 pr-2 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-200 [&::-webkit-scrollbar-track]:bg-transparent">
              {wordList.map((word, index) => (
                <WordCard
                  key={index}
                  text={word.text}
                  meaning={word.meaning}
                  example={word.example}
                  example_meaning={word.example_meaning}
                  isSelected={false}
                  type={word.type as "word" | "abbreviation" | "idiom"}
                  onSelect={() => {}}
                  newsList={[]}
                  isDone={false}
                />
              ))}
            </div>
          </section>
        </aside>
      </div>
    </main>
  );
};

export default NewsDetailPage;
