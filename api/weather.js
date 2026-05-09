export default async function handler(req, res) {
    // 프론트엔드에서 전달받은 파라미터 추출
    const { nx, ny, baseDate, baseTime } = req.query;
    
    // Vercel Environment Variables에서 설정한 인증키 읽기
    const API_KEY = process.env.weather_key; 

    // 기상청 초단기실황 조회 엔드포인트
    const endpoint = 'https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst';
    const params = new URLSearchParams({
        serviceKey: API_KEY,
        pageNo: '1',
        numOfRows: '1000',
        dataType: 'JSON',
        base_date: baseDate,
        base_time: baseTime,
        nx: nx,
        ny: ny
    });

    try {
        const response = await fetch(`${endpoint}?${params.toString()}`);
        const data = await response.json();
        
        // 가져온 데이터를 그대로 브라우저에 반환
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: '기상청 데이터를 가져오는데 실패했습니다.' });
    }
}
