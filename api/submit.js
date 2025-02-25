// 需要安装依赖包（部署时Vercel会自动安装）
const airtable = require('airtable'); // 可选：如果需要保存到Airtable

export default async (req, res) => {
    // 处理CORS跨域问题
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST');

    if (req.method === 'POST') {
        const { name, phone, occupation } = req.body;

        // 基础验证
        if (!name || !phone) {
            return res.status(400).json({ error: '缺少必要字段' });
        }

        // 示例1：直接返回数据（测试用）
        console.log('收到提交数据:', { name, phone, occupation });

        // 示例2：保存到Airtable（需先配置）
        /*const base = new airtable({ apiKey: '你的API密钥' }).base('你的BaseID');
        await base('表名').create([{
          "fields": {
            "姓名": name,
            "电话": phone,
            "职业": occupation
          }
        }]);*/

        return res.status(200).json({
            status: 'success',
            message: '数据已接收',
            data: { name, phone, occupation }
        });
    }

    return res.status(405).json({ error: '仅支持POST请求' });
};