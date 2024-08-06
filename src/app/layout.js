
import "./globals.css";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import KakaoAdfit from "./components/kakaoAdfit/kakao";

export const metadata = {
  generator: "Next.js",
  authors: [
    { name: "PARK JUNG HWAN" },
    { name: "PARK JUNG HWAN", url: "https://github.com/Junghwan-github/" },
  ],
  title: "오늘의 뽑기",
  description: "오늘의 뽑기는 추억의 뽑기, 종이 뽑기, 상품 뽑기 를 모티브로 개발되어, 누구나 쉽게 무료로 사용할 수 있으며 커스텀이 가능합니다.",
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
    "종이뽑기",
    "상품뽑기",
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
    google: "OhZfBv2KzFrdoCDuzvbaQknwgaV0M8cQJEp41-vbstA",
    other: {
      "naver-site-verification": "1b1df75b5842b94bc6787609b43087beb5f57de3",
    },
  },
};


export default function RootLayout({ children }) {


  return (
    <html lang="ko">
      <body>
        <div id="ppopgi__">
          <Header />
          <div className="ppopgi__container">
            <aside className="ad_area">
              <KakaoAdfit
                insId="root_left"
                className="kakao_adfit"
                unit="DAN-sMQ7bKKIXN6ogKWh"
                width="160"
                height="600" />
              <KakaoAdfit
                insId="root_left_mobile"
                className="kakao_adfit mobile"
                unit="DAN-nStT06J5ZrwnZ2de"
                width="320"
                height="50" />
            </aside>
            {children}
            <aside className="ad_area">
              <KakaoAdfit
                insId="root_right"
                className="kakao_adfit"
                unit="DAN-jZ7lPN4K4ywNDOvb"
                width="160"
                height="600" />
              <KakaoAdfit
                insId="root_right_mobile"
                className="kakao_adfit mobile"
                unit="DAN-b0u91WsfEiYjYTrM"
                width="320"
                height="50" />
            </aside>
          </div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
