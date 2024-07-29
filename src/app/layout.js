import "./globals.css";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";

export const metadata = {
  generator: "Next.js",
  authors: [
    { name: "PARK JUNG HWAN" },
    { name: "PARK JUNG HWAN", url: "https://github.com/Junghwan-github/" },
  ],
  title: "오늘의 뽑기",
  description: "오늘의 뽑기는 추억의 뽑기판을 모티브로 개발되어, 친구들과 모임에서 즐겁게 사용할 수 있으며 커스텀이 가능합니다.",
  keywords: [
    "오늘의 뽑기",
    "추억의 뽑기",
    "뽑기",
    "뽑기판",
    "내기",
    "복불복",
    "가챠 뽑기",
    "사다리 타기",
    "사다리 게임",
    "복불복 게임",
  ],
  robots: "index, follow",
  openGraph: {
    title: "오늘의 뽑기",
    description:
      "오늘의 뽑기는 추억의 뽑기판을 모티브로 개발되어, 친구들과 모임에서 즐겁게 사용할 수 있으며 커스텀이 가능합니다.",
    url: "https://todayppopgi.vercel.app",
    images: [
      {
        url: "https://todayppopgi.vercel.app/og.png",
        width: 800,
        height: 600,
      },
      {
        url: "https://todayppopgi.vercel.app/og-alt.png",
        width: 1800,
        height: 1600,
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  verification: {
    google: "W6IEH3V3YUxR7LOSRk6AkvamhPPViElobta_aRKMgh4",
    other: {
      "naver-site-verification": "27d7050d868ef37a5af94a294cb84217fc22ae9f",
    },
  },
};

export default function RootLayout({ children }) {

  return (
    <html lang="ko">
      <body>
        <div id="ppopgi__">
          <Header  />
          <div className="ppopgi__container">
            <aside className="ad_area"></aside>
            {children}
            <aside className="ad_area"></aside>
          </div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
