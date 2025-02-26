const JSONBIN_SECRET = process.env.JSONBIN_SECRET;

export default async (req, res) => {
  // 设置CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');

  try {
    // 验证请求方法
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method Not Allowed' });
    }

    // 获取并验证数据
    const data = req.body;

    // 手机号验证
    if (!/^1[3-9]\d{9}$/.test(data.phone)) {
      return res.status(400).json({ error: '无效的手机号码' });
    }

    console.log('Sending data to JSONBin:', data);
    // 存储到JSONBin.io
    const binResponse = await fetch('https://api.jsonbin.io/v3/b', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': JSONBIN_SECRET,
        'X-Collection-Id': '67bda62ce41b4d34e49bce3f' // 免费收集箱ID
      },
      body: JSON.stringify(data)
    });
    console.log('JSONBIN_SECRET:', process.env.JSONBIN_SECRET);
    console.log('JSONBin Response:', binResponse.status, binResponse.statusText);

    const binData = await binResponse.json();
    console.log('JSONBin Data:', binData);

    if (!binResponse.ok) {
      throw new Error('数据存储失败');
    }

    return res.status(200).json({
      success: true,
      recordId: binData.metadata.id
    });

  } catch (error) {
    return res.status(500).json({
      error: error.message || '服务器错误'
    });
  }
};