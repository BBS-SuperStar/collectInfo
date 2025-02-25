export default async (req, res) => {
  // 设置CORS头
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');

  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method Not Allowed' });
    }

    // 获取提交数据
    const data = req.body;

    // 简单验证
    if (!data.name || !data.phone) {
      return res.status(400).json({ error: '请填写完整信息' });
    }

    // 这里可以添加简单处理逻辑
    console.log('收到提交：', data);

    return res.status(200).json({
      success: true,
      message: '提交成功'
    });

  } catch (error) {
    return res.status(500).json({
      error: '服务器错误'
    });
  }
};