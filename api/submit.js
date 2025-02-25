// 需要安装依赖包（部署时Vercel会自动安装）
// const airtable = require('airtable'); // 可选：如果需要保存到Airtable

module.exports = async (req, res) => {
  // 设置CORS头
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Content-Type', 'application/json');

  try {
    const { name, phone, occupation } = req.body;

    // 数据验证
    if (!name || !phone) {
      return res.status(400).json({ error: '姓名和电话为必填项' });
    }

    // 这里可以添加数据库保存逻辑
    console.log("姓名：" + name + ", 电话：" + phone + ", 职业：" + occupation);
    return res.status(200).json({
      status: 'success',
      message: '数据已接收'
    });

  } catch (error) {
    return res.status(500).json({
      error: '服务器内部错误'
    });
  }
};