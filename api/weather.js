// api/weather.js
export default async function handler(req, res) {
  // 사용자가 보낸 nx, ny 좌표를 가져옵니다. (기본값: 부산 98, 76)
  const { nx = '98', ny = '76' } = req.query;
  
  // Vercel에 등록한 환경변수 호출
  const SERVICE_KEY = process.env.weather_key; 
  
  // 현재 날짜와 시간 계산 (예시: 20260508, 0500)
  // 실제 앱에서는 moment.js나 Intl 등을 써서 실시간으로 계산하는 로직이 필요합니다.
  const baseDate = '20260508'; 
  const baseTime = '0500';

  const url = `https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=${encodeURIComponent(SERVICE_KEY)}&numOfRows=10&pageNo=1&dataType=JSON&base_date=${baseDate}&base_time=${baseTime}&nx=${nx}&ny=${ny}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    
    // 브라우저에 결과 전달
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: '데이터를 불러오지 못했습니다.' });
  }
}
