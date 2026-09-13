import { ImageResponse } from "next/og";

// Default social share card for every page that doesn't set its own image
// (listing pages use the listing's first photo instead).
export const alt = "PropStake - Global Real Estate Investment";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "linear-gradient(135deg, #064e3b 0%, #047857 55%, #10b981 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 44, fontWeight: 700, letterSpacing: -1 }}>PropStake</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2 }}>
            Invest, rent or buy
          </div>
          <div style={{ fontSize: 76, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2 }}>
            real estate, globally.
          </div>
          <div style={{ marginTop: 28, fontSize: 32, opacity: 0.9 }}>
            Fractional ownership and verified listings across the UAE, Saudi Arabia and Nigeria.
          </div>
        </div>
        <div style={{ fontSize: 30, opacity: 0.85 }}>www.propstake.org</div>
      </div>
    ),
    size
  );
}
